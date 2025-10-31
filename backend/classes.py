from flask import Flask, request, jsonify
from flask_login import LoginManager, current_user

from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

from register import register_bp

import os
import boto3
from abc import ABC, abstractmethod

app = Flask(__name__)
app.register_blueprint(register_bp)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
# We'll need a proper login route at some point

def user_load(user_id):
    return User.query.get(int(user_id))

app.config['S3_BUCKET_NAME'] = os.getenv('S3_BUCKET_NAME', 's3-bucket-name')
app.config['LOCAL_UPLOAD_PATH'] = os.getenv('LOCAL_UPLOAD_PATH', '/tmp/uploads')
app.config['STORAGE_TYPE'] = os.getenv('STORAGE_TYPE', 'local')

@app.route('/upload', methods = ['POST'])
def upload_file():
    file = request.files.get('file')
    if not file:
        return jsonify({"ERROR": "No file"}), 400
    
    uploaded_file = UploadedFile(name = secure_filename(file.filename), type = file.content_type, uploader = current_user)
    try:
        file_path = uploaded_file.upload(file)
        # FOR USE ONCE WE HAVE THE DATABASE ESTABLISHED AND CONNECTED, currently db is undefined and thus the entire file upload system cannot function as it lacks its intended destination
        db.session.add(uploaded_file)
        db.session.commit()
        return jsonify({"MESSAGE": "File upload successful", "PATH": file_path})
    except Exception as exc:
        return jsonify({"ERROR": str(exc)}), 500


# An association table. Could definitely be replaced by db.Table for simplicity's sake later on
class FriendTable(declarative_base()):
    __tablename__ = 'friend_table'

    id = Column(Integer, primary_key = True)
    first_friend_id = Column(Integer, ForeignKey('users.id'), nullable = False)
    second_friend_id = Column(Integer, ForeignKey('users.id'), nullable = False)

    first_friend = relationship("User", foreign_keys = [first_friend_id])
    second_friend = relationship("User", foreign_keys = [second_friend_id])

    def __init__(self, first_friend_id, second_friend_id):
        self.first_friend_id = first_friend_id
        self.second_friend_it = second_friend_id

class User(declarative_base()):
    __tablename__ = 'users'

    id = Column(Integer, primary_key = True)
    username = Column(String(50), unique = True, nullable = False)
    email = Column(String(50), unique = True, nullable = False)
    password = Column(String(50), nullable = False)     # Ideally, the password will be hashed before being stored here for security purposes, but this can be changed if it seems unneeded

    teams = relationship("Team", back_populates = "members")
    notifications = relationship("Notification", back_populates = "user")
    roles = relationship("UserRole", secondary = "user_role", back_populates = "user")
    created_files = relationship("CreatedFile", back_populates = "creator")
    uploaded_files = relationship("UploadedFile", back_populates = "uploader")
    events = relationship("Event", back_populates = "creator")
    friends = relationship('User', secondary = 'friend_table', primaryjoin = id == FriendTable.first_friend_id, secondaryjoin = id == FriendTable.second_friend_id, backref = 'users_friends')
    tasks = relationship("Task", back_populates = "creator")
    assigned_tasks = relationship("Task", back_populates = "assignee")
    settings = relationship("Settings", back_populates = "user")

    def __init__(self, username, email, password, session):
        self.username = username
        self.email = email
        self.set_password(password)
        session.commit()

    def add_friend(self, friend):
        if friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)
    
    def remove_friend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)
            friend.friends.remove(self)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def change_password(self, new_password, session):
        self.set_password(new_password)
        session.commit()

class Team(declarative_base()):
    __tablename__ = 'teams'

    id = Column(Integer, primary_key = True)
    name = Column(String(100), unique = True, default = "My Team")

    members = relationship("User", back_populates = "teams")
    projects = relationship("Project", back_populates = "team")

    def __init__(self, name):
        self.name = name

    def add_member(self, user):
        if user not in self.members:
            self.members.append(user)

    def remove_member(self, user):
        if user in self.members:
            self.members.remove(user)

# An association table. Could definitely be replaced by db.Table for simplicity's sake later on
class UserTeamTable(declarative_base()):
    __tablename__ = 'user_team_table'

    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'), primary_key = True)
    team_id = Column(Integer, ForeignKey('teams.id'), primary_key = True)

    def __init__(self, user_id, team_id):
        self.user_id = user_id
        self.team_id = team_id

class Project(declarative_base()):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key = True)
    name = Column(String(100), unique = True, nullable = False)
    creator_id = Column(Integer, ForeignKey('users.id'), nullable = False)

    team = relationship("Team", back_populates = "projects")
    tasks = relationship("Task", back_populates = "projects")
    roles = relationship("UserRoleProjectTable", back_populates = "project")
    creator = relationship("User", back_populates = "project")

    def __init__(self, name):
        self.name = name

    def add_task(self,task):
        self.tasks.append(task)

    def remove_task(self, task):
        self.tasks.remove(task)

class Role(declarative_base()):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key = True)
    name = Column(String(50), unique = True, nullable = False)
    description = Column(Text, nullable = True)

    permissions = relationship("Permission", back_populates = "role")
    tasks = relationship("Task", secondary = "task_role_access", back_populates = "roles")
    users = relationship("User", secondary = "user_role", back_populates = "roles")

    def __init__(self, name, description):
        self.name = name
        self.decsription = description

class Permission(declarative_base()):
    # Could do away with this table and connect the permissions to the Role class a different way or just incorporate more directly, this is pretty messy so I wouldn't blame you
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key = True)
    role_id = Column(String(50), ForeignKey('roles.id'))

    # Permissions
    # "edit" permissions apply to objects that were not created by the current user, they are able to edit their own creations so long as they posses permission to create
    # All permissions are granted by default (subject to change if needed)

    add_tasks = Column(Boolean, default = True, nullable = False)
    edit_tasks = Column(Boolean, default = True, nullable = False)
    add_events = Column(Boolean, default = True, nullable = False)
    edit_events = Column(Boolean, default = True, nullable = False)
    add_roles = Column(Boolean, default = True, nullable = False)
    edit_roles = Column(Boolean, default = True, nullable = False)
    assign_tasks = Column(Boolean, default = True, nullable = False)
    assign_roles = Column(Boolean, default = True, nullable = False)

    role = relationship("Role", back_populates = "permissions")

    def __init__(self, role_id, add_tasks, edit_tasks, add_events, edit_events, add_roles, edit_roles, assign_tasks, assign_roles):
        self.role_id = role_id
        self.add_tasks = add_tasks
        self.edit_tasks = edit_tasks
        self. add_events = add_events
        self.edit_events = edit_events
        self.add_roles = add_roles
        self.edit_roles = edit_roles
        self.assign_tasks = assign_tasks
        self.assign_roles = assign_roles

# An association table. Could definitely be replaced by db.Table for simplicity's sake later on
class UserRoleProjectTable(declarative_base()):
    __tablename__ = 'user_role_project_table'

    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable = False)
    role_id = Column(Integer, ForeignKey('roles.id'), nullable = False)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable = False)

    user = relationship("User", back_populates = "roles")
    role = relationship("Role")
    project = relationship("Project", back_populates = "user_role_project_table")

    def __init__(self, user_id, role_id, project_id):
        self.user_id = user_id
        self.role_id = role_id
        self.project_id = project_id

class TaskState(ABC):
    @abstractmethod
    def move_on(self, task):
        pass

    def move_back(self, task):
        pass

class ToDoState(TaskState):
    def move_on(self, task):
        task.state = InProgressState()

    def move_back(self, task):
        pass

class InProgressState(TaskState):
    def move_on(self, task):
        task.state = FinishedState()

    def move_back(self, task):
        task.state = ToDoState()

class FinishedState(TaskState):
    def move_on(self, task):
        pass

    def move_back(self, task):
        task.state = InProgressState()

class Task(declarative_base()):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key = True)
    name = Column(String(100), unique = True, nullable = False)
    instructions = Column(Text, nullable = True)
    deadline = Column(DateTime, nullable = True)
    state = Column(String(50), default = "to-do")
    project_id = Column(Integer, ForeignKey('projects.id'), nullable = False)
    assignee_id = Column(Integer, ForeignKey('users.id'), nullable = False)
    creator_id = Column(Integer, ForeignKey('users.id'), nullable = False)

    project = relationship("Project", back_populates = "tasks")
    assignee = relationship("User")
    creator = relationship("User", back_populates = "tasks")
    roles = relationship("User", secondary = "task_role_access", back_populates = "tasks")

    def __init__(self, name):
        self.name = name
        self.state = ToDoState()

    def set_state(self, state: TaskState):
        self.state = state

    def move_forward(self):
        self.state.move_on(self)

    def move_backward(self):
        self.state.move_back(self)

    def schedule_deadline(self):
        if self.deadline:
            event = Event(
                name = f"Deadline for {self.name}",
                description = f"Task: {self.name}",
                start = self.deadline,
                end = self.deadline,
                creator = self.creator
            )
            return event
        return None
    
    def change_state(self, new_state):
        self.state = new_state

class TaskRoleAccess(declarative_base()):
    __tablename__ = 'task_role_access'

    id = Column(Integer, primary_key = True)
    task_id = Column(Integer, ForeignKey('tasks.id'), nullable = False)
    role_id = Column(Integer, ForeignKey('tasks.id'), nullable = False)

    task = relationship("Task", back_populates = "roles")
    role = relationship("Role", back_populates = "tasks")

    def __init__(self, task_id, role_id):
        self.task_id = task_id
        self.role_id = role_id

class UserRole(declarative_base()):
    __tablename__ = 'user_role'

    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable = False)
    role_id = Column(Integer, ForeignKey('roles_id'), nullable = False)

    user = relationship("User", back_populates = "roles")
    role = relationship("Role", back_populates = "users")

    def __init__(self, user_id, role_id):
        self.user_id = user_id
        self.role_id = role_id
    
class Notification(declarative_base()):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key = True)
    source = Column(String(50), nullable = False)
    contents = Column(Text, nullable = False)
    automated = Column(Boolean, nullable = False)
    send_time = Column(DateTime, default = datetime.now())
    receive_time = Column(DateTime, nullable = True)
    received = Column(Boolean, default = False)

    recipient = relationship("User", back_populates = "notifications")

    def __init__(self, source, contents, automated, send_time, receive_time, received):
        self.source = source
        self.contents = contents
        self.automated = automated
        self.send_time = send_time
        self.receive_time = receive_time
        self.received = received

class CreatedFile(declarative_base()):
    __tablename__ = 'created_files'

    id = Column(Integer, primary_key = True)
    name = Column(String(50), unique = True, nullable = False)
    type = Column(String(50), nullable = False) # File type
    contents = Column(Text, nullable = False)
    update_time = Column(DateTime, default = datetime.now(), onupdate = datetime.now())
    creator_id = Column(Integer, ForeignKey('user.id'), nullable = False)

    creator = relationship("User", back_populates = "edited_text_files")

    def __init__(self, name, type, contents, update_time, creator):
        self.name = name
        self.type = type
        self.contents = contents
        self.update_time = update_time
        self.creator = creator

class UploadedFile(declarative_base()):
    __tablename__ = 'uploaded_files'

    id = Column(Integer, primary_key = True)
    name = Column(String(50), unique = True, nullable = False)
    type = Column(String(50), nullable = False)
    upload_time = Column(DateTime, default=datetime.now())
    path = Column(String(100), nullable = False)
    uploader_id = Column(Integer, ForeignKey('users.id'), nullable = False)

    uploader = relationship("User", back_populates = "uploaded_files")

    def __init__(self, name, type, upload_time, path, uploader):
        self.name = name
        self.type = type
        self.upload_time = upload_time
        self.path = path
        self.uploader = uploader
        self.storage_strategy = self.choose_storage_strategy()

    def choose_storage_strategy(self):
        storage_type = os.getenv('STORAGE_TYPE', 'local').lower()
        if storage_type == 's3':
            return S3Strategy()
        return LocalStrategy()
    
    def upload(self, file):
        file_path = self.storage_strategy.upload(file)
        self.path = file_path
        return file_path

class StorageStrategy:
    @abstractmethod
    def upload(self, file): 
        pass

class S3Strategy(StorageStrategy):
    def __init__(self):
        self.s3_client = boto3.client('s3')
        self.bucket_name = os.getenv('S3_BUCKET_NAME')

    def upload(self, file):
        try:
            self.s3_client.upload_file(file.stream, self.bucket_name, secure_filename(file.filename))
            return f"https://{self.bucket_name}.s3.amazonaws.com/{secure_filename(file.filename)}"
        except Exception as exc:
            raise Exception(f"ERROR: Unable to upload to S3: {exc}")

class LocalStrategy(StorageStrategy):
    def __init__(self):
        self.local_path = os.getenv('LOCAL_UPLOAD_PATH', '/tmp/uploads')

    def upload(self, file):
        try:
            local_file_path = os.path.join(self.local_path, secure_filename(file.filename))
            with open(local_file_path, 'wb') as x:
                x.write(file.read())
            return local_file_path
        except Exception as exc:
            raise Exception(f"ERROR: Unable to save to application storage: {exc}")
        
class Event(declarative_base()):
    __tablename__ = 'events'

    id = Column(Integer, primary_key = True)
    name = Column(String(50), nullable = False)
    description = Column(Text, nullable = True)
    start = Column(DateTime, nullable = False)
    end = Column(DateTime, nullable = False)
    creation_time = Column(DateTime, default = datetime.now())
    creator_id = Column(Integer, ForeignKey('users.id'), nullable = False)

    creator = relationship("User", back_populates = "events")

    def __init__(self, name, description, start, end, creation_time, creator):
        self.name = name
        self.description = description
        self.start = start
        self.end = end
        self.creation_time = creation_time
        self.creator = creator

class Settings(declarative_base()):
    __tablename__ = 'settings'

    id = Column(Integer, primary_key = True)
    language = Column(String(20), default = 'english')
    timezone = Column(String(20), default = 'UTC')
    event_creation_notif = Column(Boolean, default = True)
    task_creation_notif = Column(Boolean, default = True)
    deadline_notif = Column(Boolean, default = True)

    user = relationship("User", back_populates = "settings")

    def __init__(self, language, timezone, event_creation_notif, task_creation_notif, deadline_notif):
        self.language = language
        self.timezone = timezone
        self.event_creation_notif = event_creation_notif
        self.task_creation_notif = task_creation_notif
        self.deadline_notif = deadline_notif

# Working on the Notes addition 