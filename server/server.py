from flask import Flask
from flask_restful import Resource, Api

from api.swen_344_db_utils import *
from api.food_api import *
from db import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(FoodApi,'/food')

if __name__ == '__main__':
    print("Loading db");
    populate_db();
    print("Starting flask");
    app.run(debug=True), #starts Flask



    