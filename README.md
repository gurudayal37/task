# Simple Project

This project consist of two APIs

1. Apply Json Patch (http://localhost:3000/secure-api/jsonpatch)
  - Request body should contain a JSON object and a JSON patch object
  ( http://jsonpatch.com/ ).
  ```json
  {
	"document" :  {
      "biscuits": [
              { "name": "Digestive" },
              { "name": "Choco Leibniz" }
            ],
      "best_biscuit":[],
      "cookies":[]
  },
    "patch" :[
        { "op": "add", "path": "/biscuits/1", "value": { "name": "Ginger Nut" } },
        { "op": "remove", "path": "/biscuits/0" },
        { "op": "replace", "path": "/biscuits/0/name", "value": "Chocolate Digestive" },
        { "op": "copy", "from": "/biscuits/0", "path": "/best_biscuit" },
        { "op": "move", "from": "/biscuits", "path": "/cookies" },
        { "op": "test", "path": "/best_biscuit/name", "value": "Chocolate Digestive" }
      ]
  }
  ```
  - This api will return the resulting json object in responce.
  ```json
  {
    "document": {
        "best_biscuit": {
            "name": "Chocolate Digestive"
        },
        "cookies": [
            {
                "name": "Chocolate Digestive"
            },
            {
                "name": "Choco Leibniz"
            }
        ]
    }
}
```

2. Create Thumbnail (http://localhost:3000/secure-api/thumbnail)
  - Request should contain a public image URL.
  ```json
  {
	  "imageUrl":"https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
  }
  ```
  - This api will return the thumbnail of size 50x50 pixels object in responce.  
  ![alt text](https://github.com/gurudayal37/task/blob/master/controllers/images/photo1.jpg)
  
 3. The User needs to login for using these apis(http://localhost:3000/login)
   ```json
   {
      "username":"gurudayal",
      "password":"tlpl1234"
   }
   
   {
    "user": {
		"username": "gurudayal",
		"password": "tlpl1234"
    	   },
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3VydWRheWFsIiwicGFzc3dvcmQiOiJ0bHBsMTIzNCJ9LCJpYXQiOjE1MjAwMDc0NTN9.KEwj4r9oqWUC4guF5mvs5jEwlfVRjrOkikZsUV6gbu4"
}
   ```
   Use the generated token in the headers as token to use the above APIs
### Installattion

Install dependicies

```
$npm install
```

Start server

```
$npm start
```

