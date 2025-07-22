# routes/__init__.py

import os
import importlib

routers = []

for filename in os.listdir(os.path.dirname(__file__)):
    if filename.endswith(".py") and not filename.startswith("__"):
        mod_name = f"{__name__}.{filename[:-3]}"
        mod = importlib.import_module(mod_name)

        if hasattr(mod, "router"):
            routers.append(mod.router)
