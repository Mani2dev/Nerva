from fastapi import APIRouter, Header, HTTPException, status, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from typing import Annotated

router = APIRouter()
security = HTTPBasic()

router.get('/login')
async def GetLoginData(creds: Annotated[HTTPBasicCredentials, Depends(security)]):
    print()