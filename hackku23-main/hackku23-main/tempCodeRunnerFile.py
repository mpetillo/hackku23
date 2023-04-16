import json
with open("test.txt", "r") as thefile:
    blah = thefile.readlines()
    temp = []
    for i in blah:
        temp.append(i.replace("\n", ""))
    print (json.dumps(temp))