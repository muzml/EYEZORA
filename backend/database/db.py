from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["eyezora"]

questions_collection = db["questions"]
violations_collection = db["violations"]
exams_collection = db["exams"]
