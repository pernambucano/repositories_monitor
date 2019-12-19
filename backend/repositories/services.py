from github import Github
from github.GithubException import GithubException
from users.models import User
from .models import Commit, Repository

ENDPOINT = "webhook"


def get_repo_info(repository_path, token):
    git = Github(token)
    return git.get_repo(repository_path)


def get_user_info(token):
    git = Github(token)
    return git.get_user().login


def save_repo(repo_request):
    Repository.objects.filter(full_name=repo_request.full_name).delete()

    repo = Repository()
    repo.full_name = repo_request.full_name
    repo.name = repo_request.name

    repo.save()

    return repo


def get_commits(repository_path, token):
    git = Github(token)
    repository = git.get_repo(repository_path)
    return repository.get_commits()


def save_commits(commits_request, repo):
    for commit_r in commits_request:
        commit = Commit()
        commit.sha = commit_r.sha
        commit.date = commit_r.commit.author.date
        commit.message = commit_r.commit.message
        commit.repository = repo
        commit.save()


def add_webhook(repository_path, token):
    git = Github(token)
    EVENTS = ["push", "pull_request"]
    HOST = "https://repomonitor.herokuapp.com/"  # TODO use config
    try:
        config = {
            "url": "https://{host}/api/{endpoint}".format(host=HOST, endpoint=ENDPOINT),
            "content_type": "json",
        }

        repo = git.get_repo(f"{repository_path}")
        response = repo.create_hook("web", config, EVENTS, active=True)
    except GithubException:
        pass

