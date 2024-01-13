from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

users = []

def add_user(user_id, socket_id):
    if not any(user['userId'] == user_id for user in users):
        users.append({'userId': user_id, 'socketId': socket_id})

def remove_user(socket_id):
    users[:] = [user for user in users if user['socketId'] != socket_id]

def get_user(user_id):
    return next((user for user in users if user['userId'] == user_id), None)

@socketio.on('connect')
def handle_connect():
    print('A user connected.')

@socketio.on('addUser')
def handle_add_user(user_id):
    add_user(user_id, request.sid)
    emit('getUsers', users, broadcast=True)

@socketio.on('sendMessage')
def handle_send_message(data):
    receiver_id = data['receiverId']
    sender_id = data['senderId']
    text = data['text']

    user = get_user(receiver_id)
    if user:
        emit('getMessage', {'senderId': sender_id, 'text': text}, room=user['socketId'])
        print(user)

@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected!')
    remove_user(request.sid)
    emit('getUsers', users, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8900)
