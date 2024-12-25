from flask import Flask
from flask_cors import CORS
from routes import routes

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(routes)

@app.route('/')
def home():
    return "Welcome to the Task Management API!"

if __name__ == '__main__':
    app.run(debug=True)