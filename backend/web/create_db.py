import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Connection to the default system 'postgres' database
conn = psycopg2.connect(
    dbname="postgres",
    user="myuser",
    password="mysecretpassword",
    host="localhost",
    port="5434"
)

conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = conn.cursor()

# Replace 'dockerdc' with your desired DB name
cur.execute("CREATE DATABASE dockerdc;")
print("Database 'dockerdc' created successfully.")

cur.close()
conn.close()
