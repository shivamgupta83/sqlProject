

# FIRST npm i 

AFTER THAT 

GO TO ROUTES SEE API`S`


# HEAR LOCAL HOST API IS WRITTEN

----FOR CREATE USERS------

POST 
localhost:3000/creatUser




PAYLODE -- >  {

      "userId": 5, 
      "Contacts": [
          {"name": "rahil",
           "number": "1234567890"
           },
           {
            "name": "sahil",
             "number": "2234567777"
             },
             {
             "name": "sahil",
             "number": "2234567777"
             }
             ]
             
 }


 RESPONSE -->

 {
    "success": true,
    "message": "data saved successfully"
}


----FOR GET COMMON USER -----
GET
localhost:3000/getCommonUsers?searchNumber=1234567890

RESPONSE 

{
    "Name": "rahil",
    "CommonUser": [
        3,
        5
    ]
}



----FOR PGINATION OR SEARCH BY NAME --------
GET
localhost:3000/pagination?userId=3&PageSize=1&page=1


RESPONCE --> {
    "totalCount": 2,
    "rows": [
        {
            "name": "rahil",
            "decryptedNumber": "1234567890"
        },
        {
            "name": "sahil",
            "decryptedNumber": "1234567890"
        }
    ]
}

GET
localhost:3000/pagination?userId=3&PageSize=2&page=1&searchText=sahi

RESPONCE -->{
    "totalCount": 1,
    "rows": [
        {
            "name": "sahil",
            "decryptedNumber": "2234567777"
        }
    ]
}



---------------------------------------------------------------------


ALSO GET ALL USER from USER TABLE

GET
localhost:3000/getUsers

RESPONCE -->{
    "users": [
        {
            "userId": 3
        },
        {
            "userId": 5
        }
    ]
}

                             PLESE GIVE FEEDBACK 
------------------------------------THANKS-------------------------------------------

CODER -- shivam gupta

github -- github.com/shivamgupta83

