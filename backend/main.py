from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class User(BaseModel):
    id: int
    image: str
    phone: str
    password: str
    email: str

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
items = []
@app.post("/login")
def login(user: User):
    items.append(user.model_dump())
    return {"message": "User added"}
@app.get("/users")
def getitems():
 return items
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    global items

    items = [user for user in items if user["id"] != user_id]

    return {"message": "User deleted"}