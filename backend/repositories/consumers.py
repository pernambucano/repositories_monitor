from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync
import json


class RepositoryConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print("CONNECTING")
        await self.accept()
        self.repos = set()

    async def disconnect(self, close_code):
        print("DISCONNECTING")
        for repo_id in list(self.repos):
            try:
                await self.remove_repo(repo_id)
            except Exception:
                pass

    # TODO test with commands and than test sending from inside the backend code
    # TODO test groups too
    async def receive_json(self, content):
        print("RECEIVING")
        command = content.get("command", None)
        print("COMMAND " + command)
        try:
            if command == "add":
                await self.add_repo(content.get("repo"))
            elif command == "remove":
                await self.remove_repo(content.get("repo"))
            elif command == "send":
                await self.send_message(content.get("repo"), content.get("message"))
        except Exception:  # TODO use more specific error
            await self.send_json({"error": "error"})

    async def add_repo(self, repo_id):
        print("ADDING REPO")
        print(repo_id)
        self.repos.add(repo_id)
        group_name = repo_id.replace("/", "_")
        await self.channel_layer.group_add(group_name, self.channel_name)
        print("SENDING JSON RESPONSE")
        await self.send_json(
            {"join": str(repo_id), "title": "repo added"}  # TODO use info from repo
        )

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
            {"msg_type": "0", "repo": event["repo_id"], "message": event["message"],}
        )

