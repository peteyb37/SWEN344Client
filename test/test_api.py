import unittest
import json
from rest_utils import *

class TestExample(unittest.TestCase):
    def test_api(self):
        result = get_rest_call(self, 'http://localhost:5000/food?category=grains')
        self.assertEqual(5, len(result),"Should have returned a length of '5'")
        print("API test successfully returned a list of '5' ")


    def test_update(self):
        resultsBefore = get_rest_call(self, 'http://localhost:5000/food?category=proteins')
        #print(resultsBefore)
        #put_rest_call(self,f'http://localhost:5000/food', params={"food" : "banana", "data" : "1", "change" : "trans_fat"})
        results = get_rest_call(self, 'http://localhost:5000/food?category=proteins')
        #print(results)



