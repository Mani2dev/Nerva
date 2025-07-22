from fastapi import FastAPI
from routes import routers

app = FastAPI()

for r in routers:
    app.include_router(r)
