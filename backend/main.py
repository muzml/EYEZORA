from fastapi import FastAPI
from api.routes.verify_person import router as verify_router

app = FastAPI()

app.include_router(verify_router)

@app.get("/")
def root():
    return {"message": "Backend running"}
