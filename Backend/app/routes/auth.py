from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from app.services.auth_service import create_user, authenticate_user
from app.schemas import UserCreate, UserDB
from app.utils.token import create_access_token

router = APIRouter()

@router.options("/signup")
async def handle_signup_options():
    return Response(status_code=200)

@router.post("/signup", response_model=UserDB)
async def signup(user: UserCreate):
    new_user = await create_user(user)
    if new_user is None:
        raise HTTPException(status_code=400, detail="Username or Email already registered")
    
    return new_user

@router.options("/login")
async def handle_login_options():
    return Response(status_code=200)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
