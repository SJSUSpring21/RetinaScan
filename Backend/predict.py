import sys
from PIL import Image
import requests
import io
import numpy as np
import tensorflow as tf
from flask import Flask, request, redirect, url_for, flash, jsonify
import json

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def makecalc():
    req_data = request.get_json()
    link = req_data["data"]
    print("********* Stating Predict for link ************")
    print("********* " + link + " ************")
    r=getResult(link)
    print("********* Ending Predict ************")
    return str(r)

@app.route('/ping', methods=['GET'])
def ping():
     return "pong"


def preprocess_image(image_path, desired_size=224):
     response = requests.get(image_path)
     image_bytes = io.BytesIO(response.content)
     im = Image.open(image_bytes)
     im = im.resize((desired_size, )*2, resample=Image.LANCZOS)
     return im

def getResult(link):
     model_path = './model.h5'
     model = tf.keras.models.load_model(model_path)

     # link = 'https://i.imgur.com/jFSkR3S.png'
     x_test = np.empty((1, 224, 224, 3), dtype=np.uint8)
     x_test[0, :, :, :] = preprocess_image(link)

     y_test = model.predict(x_test) > 0.5
     y_test = y_test.astype(int).sum(axis=1) - 1
     #print(y_test[0])
     return y_test[0]


if __name__ == '__main__':
    app.run(debug=True, host='localhost')
