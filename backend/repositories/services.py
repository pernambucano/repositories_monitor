from github import Github
from users.models import User

def get_repo_info(token):
    git = Github(token)
    user = git.get_user()
    repository = git.get_repo('pernambucano/catinabox')
    return user, repository

