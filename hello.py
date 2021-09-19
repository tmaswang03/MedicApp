from flask import Flask,url_for
from flask import render_template
from flask import request, redirect
import pyodbc
# from decouple import config

# TOKEN = config('TOKEN')
# driverstr = "Driver={ODBC Driver 17 for SQL Server};Server=tcp:vibotserver.database.windows.net,1433;Database=ViBotDB;Uid=vibot2021;Pwd=BCx5D2fH9rmVx@a;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
TOKEN="ODM1Mjk5NTU2MDEwODg1MTMw.YINbVQ.LW-LA4oM-699hBrHs0ta6avUqlY"

def storeScore(data):
    # driverstr = config('driverstr')
    driverstr="Driver={ODBC Driver 17 for SQL Server};Server=tcp:vibotserver.database.windows.net,1433;Database=ViBotDB;Uid=vibot2021;Pwd=BCx5D2fH9rmVx@a;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    with pyodbc.connect(driverstr) as conn:
        with conn.cursor() as cursor:

            cursor.execute("insert into medicapp (name,email,password,phone,address,city,country,state,zipcode) Values ('{}','{}','{}','{}','{}','{}','{}','{}','{}')".format(data['full_name'],data['email'],data['password'],data['phone_number'],data['address'],data['city'],data['country'],data['state'],data['zipcode']))
            # cnt = cursor.execute("select count(*) as cnt from vibeScores where username = '" + str(name) + "'").fetchone().cnt
            # if cnt > 0:  # user exists, update
            #     cursor.execute("update vibeScores set recent = '" + str(score) + "' where username = '" + str(name) + "'")
            #     cursor.execute("update vibeScores set average = (average*vibeCount + '" + str(score) + "')/(vibecount+1) where username = '" + str(name) + "';")
            #     cursor.execute("update vibeScores set vibeCount = vibeCount + 1 where username = '" + str(name) + "'")
            # else:
            #     cursor.execute("insert into vibeScores (username, recent, average, vibeCount) Values ('" + str(name) + "', '" + str(score) + "', '" + str(score) + "', '1');")
            # print(cnt)
            cursor.commit()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/index.html")
def index():
    return render_template("index.html")

@app.route("/editProfile.html")
def editProfile():
    return render_template("editProfile.html")

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/faceRecognition.html")
def faceRecognition():
    return render_template("faceRecognition.html")

@app.route("/getstarted.html")
def getstarted():
    return render_template("getstarted.html")

@app.route("/login.html")
def login():
    return render_template("login.html")


# 127.0.0.1 - - [19/Sep/2021 08:13:56] "GET /models/face_recognition_model-weights_manifest.json HTTP/1.1" 404 -
# 127.0.0.1 - - [19/Sep/2021 08:13:56] "GET /models/face_landmark_68_model-weights_manifest.json HTTP/1.1" 404 -
# 127.0.0.1 - - [19/Sep/2021 08:13:56] "GET /models/ssd_mobilenetv1_model-weights_manifest.json HTTP/1.1" 404 -
# @app.route("/models/face_recognition_model-weights_manifest.json")
# def models_weights_manifest():
#     return "models"

@app.route("/submit_data", methods=['POST','GET'])
def submit():
    print(request.method)
    if request.method == 'POST':
        data = request.form
        storeScore(data)
        return redirect('/editProfile.html')