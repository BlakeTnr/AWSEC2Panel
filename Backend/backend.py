from flask import Flask

app = Flask(__name__)

@app.post("/start")
def start_server():
    
    return "<p>Welcome to the backend for AWSMCStart</p>"

@app.route("/")
def hello_world():
    return "<p>Welcome to the backend for AWSMCStart</p>"