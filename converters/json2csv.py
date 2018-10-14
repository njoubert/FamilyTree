'''
Copyright 2018, Niels Joubert
'''

import json

FILE = "../db/family.json"

class Person():
    def __init__(self, 
            known_name="",
            first_name="",
            middle_names="",
            last_name="",
            miaden_name="",
            mother_first_name="",
            mother_maiden_name="",
            father_first_name="",
            father_last_name="",
            dob="",
            dod="",
            pb="",
            pd=""):
        self.info = {
            "known_name": known_name,
            "first_name": first_name,
            "middle_names": middle_names,
            "last_name": last_name,
            "miaden_name": miaden_name,
            "mother_first_name": mother_first_name,
            "mother_maiden_name": mother_maiden_name,
            "father_first_name": father_first_name,
            "father_last_name": father_last_name,
            "dob": dob,
            "dod": dod,
            "pb": pb,
            "pd": pd,
        }
        self.order = [
            "known_name",
            "first_name",
            "middle_names",
            "last_name",
            "miaden_name",
            "mother_first_name",
            "mother_maiden_name",
            "father_first_name",
            "father_last_name",
            "dob",
            "dod",
            "pb",
            "pd",
        ]

    def cols(self):
        return ",".join(self.order) 

    def __str__(self):
        s = ""
        for k in self.order:
            s += self.info[k] + ","
        return s 


def main(filename):
    with open(filename, 'r') as f:
    	datastore = json.load(f)

    for e in datastore["nodes"]:
        # First we get the first name, all the middle names, and the last name.
        # If there's a "nee" then we pull out the maiden name
        # If there's a name in quotes, we pull out the nickname

        print e['name'].split(" ")

    niels = Person()
    print niels.cols()
    print niels

if __name__ == '__main__':
    main(FILE)