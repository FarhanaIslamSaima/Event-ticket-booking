import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

conn = psycopg2.connect(
    dbname="postgres",  # default system DB
    user="myuser",
    password="mysecretpassword",
    host="localhost",
    port="5434"
)

conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = conn.cursor()

cur.execute("DROP DATABASE IF EXISTS dockerdc;")
print("Database 'dockerdc' dropped successfully.")

cur.close()
conn.close()
