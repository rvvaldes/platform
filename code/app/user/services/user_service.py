from user.data.database import db_session
from user.models.user import User

def create_user(data):
    new_user = User(name=data['name'], email=data['email'])
    db_session.add(new_user)
    db_session.commit()
    return new_user

def get_users():
    return User.query.all()

def update_user(user_id, data):
    user = User.query.get(user_id)
    if user:
        user.name = data['name']
        user.email = data['email']
        db_session.commit()
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db_session.delete(user)
        db_session.commit()
        return True
    return False

def find_user_by_email_and_name(email, name):
    return User.query.filter_by(email=email, name=name).first()