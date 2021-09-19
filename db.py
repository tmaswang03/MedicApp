import pyodbc
from decouple import config

TOKEN = config('TOKEN')



def storeScore(name, score):
    driverstr = config('driverstr')
    with pyodbc.connect(driverstr) as conn:
        with conn.cursor() as cursor:
            cnt = cursor.execute("select count(*) as cnt from vibeScores where username = '" + str(name) + "'").fetchone().cnt
            # if cnt > 0:  # user exists, update
            #     cursor.execute("update vibeScores set recent = '" + str(score) + "' where username = '" + str(name) + "'")
            #     cursor.execute("update vibeScores set average = (average*vibeCount + '" + str(score) + "')/(vibecount+1) where username = '" + str(name) + "';")
            #     cursor.execute("update vibeScores set vibeCount = vibeCount + 1 where username = '" + str(name) + "'")
            # else:
            #     cursor.execute("insert into vibeScores (username, recent, average, vibeCount) Values ('" + str(name) + "', '" + str(score) + "', '" + str(score) + "', '1');")
            print(cnt)
            cursor.commit()

storeScore("sophii.asun#6432", "1")

