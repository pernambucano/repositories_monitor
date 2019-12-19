from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync
import json
from django.conf import settings


class RepositoryConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.repos = set()

    async def disconnect(self, close_code):
        for repo_id in list(self.repos):
            try:
                await self.remove_repo(repo_id)
            except Exception:
                pass

    async def receive_json(self, content):
        command = content.get("command", None)
        try:
            if command == "add":
                await self.add_repo(content.get("repo"))
            elif command == "remove":
                await self.remove_repo(content.get("repo"))
            elif command == "send":
                await self.send_message(content.get("repo"), content.get("message"))
        except Exception:
            await self.send_json({"error": "error"})

    async def add_repo(self, repo_id):
        self.repos.add(repo_id)
        group_name = repo_id.replace("/", "_")
        await self.channel_layer.group_add(group_name, self.channel_name)
        await self.send_json({"join": str(repo_id), "title": "repo added"})

    async def remove_repo(self, repo_id):
        self.repos.discard(repo_id)
        group_name = repo_id.replace("/", "_")
        await self.channel_layer.group_discard(group_name, self.channel_name)
        await self.send_json({"remove": str(repo_id)})

    async def send_message(self, repo_id, message):
        group_name = repo_id.replace("/", "_")
        await self.channel_layer.group_send(
            group_name,
            {"type": "repo.message", "repo_id": repo_id, "message": message,},
        )

    async def repo_message(self, event):
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_MESSAGE,
                "repo": event["repo_id"],
                "message": event["message"],
            }
        )

