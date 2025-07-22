from fastapi import FastAPI, HTTPException
import docker


router = APIRouter()
client = docker.from_env()

@router.get("/containers")
def list_containers():
    try:
        containers = client.containers.list(all=True)
        return [
            {
                "id": c.id,
                "name": c.name,
                "status": c.status,
                "image": c.image.tags,
                "created": c.attrs['Created'],
                "ports": c.attrs['NetworkSettings']['Ports'],
            }
            for c in containers
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))