import importlib
import pkgutil
from fastapi import FastAPI, Depends, Request, Response, HTTPException, status, Form


app = FastAPI()

from routers import __path__ as routers_path

for _, module_name, _ in pkgutil.iter_modules(routers_path):
    module = importlib.import_module(f"routers.{module_name}")
    if hasattr(module, "router"):
        app.include_router(module.router, prefix=f"/{module_name}")
        print(f"✅ Loaded router: {module_name} with prefix /{module_name}")
    else:
        print(f"⚠️ No router in: {module_name}")
