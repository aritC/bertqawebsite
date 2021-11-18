import flask
import json
from QAModel.predictor import QAModel
from dotenv import load_dotenv
load_dotenv() 
import torch
from QAModel.predictor import QAModel 
from flask_cors import CORS


app = flask.Flask(__name__)
CORS(app)
model = QAModel()

def get_answer(question, context):
    return "sample answer"

def parse_request(request):
    error = []
    valid = True
    question = ''
    context = ''
    try:
        data = request
    except ValueError as err:
        error.append(err)
        valid = False
    
    if not isinstance(data, dict):
        error.append('Request Should be a valid JSON object!')
        valid = False
    
    try:
        question = data['question']
    except KeyError as err:
        error.append('A Question is required!')
        valid = False

    try:
        context = data['context']
    except KeyError as err:
        error.append('A Context is required!')
        valid = False
    
    if not isinstance(question, str):
        error.append('Question should be a string.')
        valid = False

    if not isinstance(context, str):
        error.append('Context should be a string.')
        valid = False
    
    if question == '':
        error.append('Question should not be Empty.')
        valid = False
    
    if context == '':
        error.append('Context should not be Empty.')
        valid = False
        
    return valid, error

    

@app.route("/question",methods = ['POST'])
def question():
    if flask.request.method == 'POST':
        # try:
            request = flask.request.json
            valid, error = parse_request(request)
            if valid:
                return flask.jsonify({
                        "error": not valid,
                        "message": model.get_answer(request['question'],
                        request['context'])
                        }), 200
            else:
                return flask.jsonify({
                    "error": not valid, 
                    "message": error
                    }), 400
        # except:
        #      return flask.jsonify({
        #             "error": True, 
        #             "message": 'Please check your request format!'
        #             }), 400
