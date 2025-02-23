# Autonomous Application Builder

### Command to run code:

We used react.js for backend and Python for frontend. To run code:
```
$ pwd
>./AutonomousApplicationBuilder/Backend/
$ uvicorn app.main:app --reload
```

### Repository Structure
```
├── Backend 
│   └── app 
│       ├── core
│       ├── routs
│       ├── auth.py
│       ├── services
│       ├── utils
│       ├── database.py
│       ├── main.py
│       └── schemas.py
├── Frontend 
│   ├── public 
│   │   └── vite.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── requirements.txt 
└── dockerfile 
```

### Code Summary
PIXELFORGE WEBSITE - 

1. Frontend-
  <ul>
        <li>Users can enter a prompt to generate a website.</li>
        <li>Data is sent to the FastAPI backend using a <code>fetch</code> POST request.</li>
        <li>Uses React.js.</li>
        <li>Includes a <strong>modern UI</strong> with Tailwind CSS for styling.</li>
        <li>Login and Signup modals for user authentication.</li>
    </ul>
2. Backend-
    <ul>
       <li> Uses MongoDB to store users password and username.
       <li>The FastAPI backend receives user input at <code>/generate-website/</code> and processes it accordingly.</li>
       <li><strong>FastAPI Server:</strong> Handles API requests from the frontend.</li>
        <li><strong>CORS Middleware:</strong> Allows cross-origin requests from the React frontend.</li>
        <li><strong>Data Handling:</strong> Uses Pydantic models to validate incoming data.</li>
        <li><strong>Multi-Agent System:</strong> Calls AI agents for UI design and code generation.</li>
        <li><strong>File Saving:</strong> Saves generated code files to a specified directory.</li>
        <li><strong>Error Handling:</strong> Uses FastAPI’s HTTPException to handle errors.</li>
    </ul>
3. How it works -
    <ol>
        <li>User sends a request to <code>/generate-website/</code> with a prompt.</li>
        <li>The backend calls the **UI Designer Agent** to generate UI JSON.</li>
        <li>The response is passed to the **Developer Agent** to generate website code.</li>
        <li>Generated code files are saved in the specified directory.</li>
        <li>A response with the generated code is sent back to the frontend.</li>
    </ol>

### TeamXSprouts
* Ojasvi Jain
* Tvisha Jaiswal
* Anshika Goel
* Suhanee Gupta
