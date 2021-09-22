import pyodbc
from decouple import config

TOKEN = config('TOKEN')



def storeScore(name, score):
    driverstr = config('driverstr')
    with pyodbc.connect(driverstr) as conn:
        with conn.cursor() as cursor:
            cnt = cursor.execute("select count(*) as cnt from vibeScores where username = '" + str(name) + "'").fetchone().cnt
            print(cnt)
            cursor.commit()

storeScore("sophii.asun#6432", "1")

