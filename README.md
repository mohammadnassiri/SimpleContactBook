# Contacts Book Based on React and Djago
This is a simple contacts book based on django's restframework and React. It uses CRUD to make connection between backend and frontend.

![sample image](https://github.com/mohammadnassiri/SimpleContactBook/blob/master/sample_image.png)

## Installation
For backed:
```
cd contact_book
pip install -r requirements.txt
```

For frontend:
```
cd contact_book_ui
npm install
```


## Setup
You can simply run the project with docker:
```
docker-compose -d up
```
Then create superuser and database:
```
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

To insert some data in your database you can use the below script.  
It requires a parameter and will generates as many contacts you have entered in the superuser's book with faker library.
```
docker-compose exec backend python manage.py generate_contacts 10
```
## Manual Setup
If you don't like docker, please use below commands to run the project. Please be sure to run django under 8000 and react under 3000 ports.
```
cd contact_book
python manage.py migrate
python manage.py createsuperuser
python manage.py generate_contacts 10
python manage.py runserver
```
```
cd contact_book_ui
npm install
npm start
```