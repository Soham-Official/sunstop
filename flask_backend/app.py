from flask import Flask,request,jsonify
from urllib.request import urlopen
from PIL import Image
from flask_cors import CORS,cross_origin
import os
import  io 
import base64
import numpy as np
import cv2 as cv
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
load_dotenv()
app=Flask(__name__)
CORS(app)
@app.route('/')
def hello():
   return "Hello World"

@app.route('/tryon1', methods=['POST'])
@cross_origin()
def run1():
    file = request.files['image'].read()
    npimg = np.fromstring(file, np.uint8)
    img = cv.imdecode(npimg,-1)
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
    glasses=cv.imread("glass1.png",-1)
    final_img=tryon(img,glasses)
    if(final_img=='ERROR'):
        error="ERROR"
        return jsonify(error)
    _, img_encoded = cv.imencode('.jpg', final_img)
    data=img_encoded.tostring()
    upload_result = cloudinary.uploader.upload(data)
    return jsonify(upload_result)   

@app.route('/tryon2', methods=['POST'])
@cross_origin()
def run2():
    file = request.files['image'].read()
    npimg = np.fromstring(file, np.uint8)
    img = cv.imdecode(npimg,-1)
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
    glasses=cv.imread("glass2.png",-1)
    final_img=tryon(img,glasses)
    if(final_img=='ERROR'):
        error="ERROR"
        return jsonify(error)
    _, img_encoded = cv.imencode('.jpg', final_img)
    data=img_encoded.tostring()
    upload_result = cloudinary.uploader.upload(data)
    return jsonify(upload_result)   

@app.route('/tryon3', methods=['POST'])
@cross_origin()
def run3():
    file = request.files['image'].read()
    npimg = np.fromstring(file, np.uint8)
    img = cv.imdecode(npimg,-1)
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
    glasses=cv.imread("glass3.png",-1)
    final_img=tryon(img,glasses)
    if(final_img=='ERROR'):
        error="ERROR"
        return jsonify(error)
    _, img_encoded = cv.imencode('.jpg', final_img)
    data=img_encoded.tostring()
    upload_result = cloudinary.uploader.upload(data)
    return jsonify(upload_result)   
 



def tryon(img,glasses):
    gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    face_cascade=cv.CascadeClassifier('front_face.xml')
    eye_cascade=cv.CascadeClassifier('eye.xml')

    faces=face_cascade.detectMultiScale(gray,1.3,5)
    img=cv.cvtColor(img,cv.COLOR_BGR2BGRA)
    glasses=cv.cvtColor(glasses,cv.COLOR_BGR2BGRA)
    if(len(faces)!=1):
        return "ERROR"
    for (x,y,w,h) in faces:
        roi_gray=gray[y:y+h,x:x+w]
        # cv.rectangle(img,(x,y),(x+w,y+h),(0,255,0),3)
        eyes=eye_cascade.detectMultiScale(roi_gray,1.3,15)
        if(len(eyes)!=2):
            return "ERROR"
        if(eyes[1][0]<eyes[0][0]):
            pt1=(x+eyes[1][0],y+eyes[1][1])
            pt2=(x+eyes[0][0]+eyes[0][2],y+eyes[0][1]+eyes[0][3])
            glasses2=image_resize(glasses.copy(),width=int(eyes[0][0]+eyes[0][2]*1.5))
        else:
            pt1=(x+eyes[0][0],y+eyes[0][1])
            pt2=(x+eyes[1][0]+eyes[1][2],y+eyes[1][1]+eyes[1][3])
            glasses2=image_resize(glasses.copy(),int(eyes[1][0]+eyes[1][2]*1.5))  
   
        gw,gh,gc=glasses2.shape
        for i in range (0,gw):
            for j in range (0,gh):
                if glasses2[i,j][3]!=0:
                    img[pt1[1]+i,pt1[0]+j-int((pt1[0]-x)//1.3)]=glasses2[i,j];
    
    img=cv.cvtColor(img,cv.COLOR_BGRA2BGR)
    return img
    


def image_resize(image, width = None, height = None, inter = cv.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))
    resized = cv.resize(image, dim, interpolation = inter)
    return resized

if __name__ == "__main__":
    app.run(port=18000,debug=True)












 # data=request.json;
    # url=data['url']
    # url_response = urlopen(url)
    # img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
    # img = cv.imdecode(img_array, -1)