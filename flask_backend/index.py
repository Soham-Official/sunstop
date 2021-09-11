import cv2 as cv
import numpy as np
# img=cv.imread("mypic.jpg")
# img=cv.imread("my-pic.jpg")
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

img=cv.imread("scanned photo.jpeg")
# img=cv.imread("demo2.jpg")

gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
glasses=cv.imread("glass3.png",-1)

face_cascade=cv.CascadeClassifier('front_face.xml')
eye_cascade=cv.CascadeClassifier('eye.xml')

faces=face_cascade.detectMultiScale(gray,1.3,5)
img=cv.cvtColor(img,cv.COLOR_BGR2BGRA)
glasses=cv.cvtColor(glasses,cv.COLOR_BGR2BGRA)

for (x,y,w,h) in faces:
    roi_gray=gray[y:y+h,x:x+w]
    roi_color=img[y:y+h,x:x+w]
    # cv.rectangle(img,(x,y),(x+w,y+h),(0,255,0),3)
    eyes=eye_cascade.detectMultiScale(roi_gray,1.3,15)
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
                img[pt1[1]+i,pt1[0]+j-int((pt1[0]-x)//1.5)]=glasses2[i,j];
                 
   

    
    
   
img=cv.cvtColor(img,cv.COLOR_BGRA2BGR)



cv.imshow('my pic',img)
# cv.imshow('glasses',glasses2)


cv.waitKey(0)

