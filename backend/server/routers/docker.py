from fastapi import APIRouter, Header, HTTPException, status
from pydantic import BaseModel
import docker

router = APIRouter()
client = docker.from_env()

class AuthBody():
    username: str
    password: str

class ContainerBody(BaseModel):
    container_name: str

@router.post('/create/')
async def create_container(body: ContainerBody):
    try:
        # Try running the container
        client.login(username, password)
        container = client.containers.run(body.container_name, ['echo', 'running'], detach=True)
        return {"message": f"Container '{body.container_name}' created and running!"}
    except docker.errors.ImageNotFound:
        # Image not found locally, try pulling it then run
        try:
            client.images.pull(body.container_name)
            container = client.containers.run(body.container_name, ['echo', 'running'], detach=True)
            return {"message": f"Image '{body.container_name}' pulled, container started!"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to pull and run image: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error running container: {str(e)}")

@router.get('/delete/')
async def delete_container():
    try:
        container = client.containers.get('cowrie')
        container.remove(force=True)
        return {"message": "Container 'cowrie' deleted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting container: {str(e)}")
