import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import git
import subprocess
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth
from langchain.agents import initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from langchain.tools import Tool
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
import json
import requests
import uvicorn

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DESIGNER_AGENT_URL = os.getenv("DESIGNER_AGENT_URL")
DEVELOPER_AGENT_URL = os.getenv("DEVELOPER_AGENT_URL")
PROJECT_MANAGER_KEY = os.getenv("PROJECT_MANAGER_KEY")
GIT_REPO_URL = os.getenv("GIT_REPO_URL")
LOCAL_REPO_PATH = os.getenv("LOCAL_REPO_PATH")
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")

llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GEMINI_API_KEY)
 
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()
app.include_router(auth.router, prefix="/auth")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def call_ai_agent(url, request_text): 
    headers = {"Content-Type": "application/json"}
    data = {"prompt_file": request_text}  # Replace with actual input
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def call_designer_agent(prompt):
    ui_json = call_ai_agent(DESIGNER_AGENT_URL, prompt)
    return ui_json

def call_ai_agent_for_developer(url, request_json, design_json):
    headers = {"Content-Type": "application/json"}
    data = {"prompt_file": request_json,"design_files":design_json}  # Replace with actual input
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def call_developer_agent(request_json, ui_json):
    response = call_ai_agent_for_developer(DEVELOPER_AGENT_URL, request_json, ui_json)
    return response

designer_tool = Tool(name="UI Designer", func=call_designer_agent, description="Generates UI/UX JSON")
developer_tool = Tool(name="Code Generator", func=call_developer_agent, description="Converts UI JSON to Code JSON")

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

from langchain.llms.base import LLM

llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GEMINI_API_KEY)

coordinator_agent = initialize_agent(
    tools=[designer_tool, developer_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    memory=memory
)
import re
def save_code_to_files(code_json, output_dir="generated_project"):
    try:
        os.makedirs(output_dir, exist_ok=True)  # Ensure directory exists

        # Extract the generated code from JSON
        files = code_json.get("response", {})

        if not files:
            print("No code files found in the provided JSON.")
            return

        for filename, code in files.items():
            file_path = os.path.join(output_dir, filename)

            if filename.endswith(".css"):
                # Fix misplaced comment slashes in CSS (optional)
                code = re.sub(r"/\s*([^*])", r"/* \1", code)  # Ensure CSS comments start correctly
                code = re.sub(r"([^/])\s*/", r"\1 */", code)  # Ensure CSS comments end correctly

            # Write to file
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(code)

            print(f"File '{file_path}' created successfully.")
    
    except Exception as e:
        print(f"Error in save_code_to_files: {str(e)}")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def push_to_github():
    if not os.path.exists(os.path.join(LOCAL_REPO_PATH, ".git")):
        repo = git.Repo.init(LOCAL_REPO_PATH)
        origin = repo.create_remote("origin", GIT_REPO_URL)
    else:
        repo = git.Repo(LOCAL_REPO_PATH)
        origin = repo.remotes.origin
    repo.git.add(all=True)
    repo.index.commit("Auto-generated project files from LLaMA 3")
    origin.push()

@app.get("/")
def read_root():
    return {"message": "API is working"}
class PromptRequest(BaseModel):
    user_prompt: str

@app.get("/download-file/{filename}")
async def download_file(filename: str):
    """Endpoint to download a specific file."""
    file_path = os.path.join(LOCAL_REPO_PATH, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path, filename=filename,  media_type="application/octet-stream")

@app.post("/generate-website/")
async def generate_website(request: PromptRequest):
    """Main API to generate a website using the multi-agent system."""
    try:
        request_text = request.user_prompt 
        ui_json = call_designer_agent(request_text)
        if "error" in ui_json:
            return {"error": "UI design generation failed"}

        code_json = call_developer_agent(request_text, ui_json)

        save_code_to_files(code_json, LOCAL_REPO_PATH)

        # Return the list of generated files
        files = os.listdir(LOCAL_REPO_PATH)
        return {"files": files}

    except Exception as e:
        return {"error": str(e)}
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


