import os
import json
from psycopg2.extras import execute_values
from api.swen_344_db_utils import *



def populate_db():
    """
    Populates the database from food_db.json
    """
    exec_sql_file('food.sql')

    with open('server/food_db.json') as json_file:
        data = json.load(json_file)

    for foods in data:
        list_of_tuples = []
        list_of_tuples.append((
            foods['name'],
            foods['category'],
            foods['calories'],
            foods['total_fat'],
            foods['sat_fat'],
            foods['trans_fat'],
            foods['protein'],
            foods['total_carbs']))
        conn = connect()
        cur = conn.cursor()
        sql = "INSERT INTO food(name, category, calories, total_fat, sat_fat, trans_fat, protein, total_carbs) VALUES %s"
        execute_values(cur, sql, list_of_tuples)
        conn.commit()
        conn.close()


def get_food_by_category(category):
    """
    Gets foods by category
    Params:
        - category: A string containing the name of the category
    Returns:
        - A dictionary of all foods within a given category
    """
    sql = """SELECT * FROM food WHERE category = '%s' ORDER BY id ASC""" % (category)
    result = exec_get_all(sql)
    cat = []
    count = 0
    for food in result:
        cat.append({
            'food' : food[1], 
            'calories' : float(food[3]), 
            'total_fat' : float(food[4]), 
            'saturated_fat' : float(food[5]), 
            'trans_fat' : float(food[6]), 
            'protein' : float(food[7]), 
            'total_carbohydrates' : float(food[8])
        })
        count = count + 1
    return cat

def update_food(food, data, typeData):
    """
    Updates a food with new data
    Params:
        - food: A string with the type of food to be updated
        - data: data to be uploaded to the food
        - typeData: type of data that will be replaced 
    Returns:
        True or false depending on success 
    """
    if(typeData in ['calories', 'total_fat', 'sat_fat', 'trans_fat', 'protein', 'total_carbs']):
        data = float(data)

    
    sql = """UPDATE food SET %s = '%s' WHERE name = '%s'""" % (typeData, data, food)
    exec_commit(sql)
    return True
    #except:
    #    return False