# Setting up Postgres Database

1. Install postgres
2. Create new postgres USER `todo_admin`
```
 CREATE USER todo_admin WITH CREATEDB PASSWORD 'todo123'
```
3. Create database todo_db
```
 CREATE DATABASE todo_db WITH OWNER = todo_admin
```
4. Connect to db using psql
```
psql -U todo_admin -d todo_db
```
