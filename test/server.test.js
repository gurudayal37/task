const expect = require('expect');
const request = require('supertest');
const sizeOf = require('image-size');

const {app} = require('./../server.js');

describe('POST /jsonpatch',()=>{
  it('should apply json patch to a json object',(done)=>{

    const jsonTestObject = {    // a sample json patch for testing '/jsonpatch' api
      document :{
        biscuits: [
            { name: "Digestive" },
            { name: "Choco Leibniz" }
          ]
      },
      patch :[
        { op: "add", path: "/biscuits/1", value: { name: "Ginger Nut" } },
        { op: "remove", path: "/biscuits/0" },
        { op: "replace", path: "/biscuits/0/name", value: "Chocolate Digestive" },
        { op: "copy", from: "/biscuits/0", path: "/best_biscuit" },
        { op: "move", from: "/biscuits", path: "/cookies" },
        { op: "test", path: "/best_biscuit/name", value: "Chocolate Digestive" }
      ]
    }
    const result = {
       document:{cookies:[
           { name: "Chocolate Digestive" },
           { name: "Choco Leibniz" }
         ],
         best_biscuit: { name: "Chocolate Digestive" }
       }
     }

    request(app)
    .post('/secure-api/jsonpatch')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3VydWRheWFsIiwicGFzc3dvcmQiOiJ0bHBsMTIzNCJ9LCJpYXQiOjE1MTk3NTU5NTh9.cWEK0ZeBTcnvQFWR112EzeO9TtZ40oM_Seb8ZeGHK1I')
    .send(jsonTestObject)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res)=>{
      expect(res.body.document).toEqual(result.document);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      done();
    });

  });
});

describe('POST /thumbnail',()=>{

  it('should return a thumbnail of size 50*50',(done)=>{

    const jsonTestObject = {  //a json for test '/thumbnail' route
	     "imageUrl":"https://homepages.cae.wisc.edu/~ece533/images/tulips.png"
    }

    request(app)
    .post('/secure-api/thumbnail')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3VydWRheWFsIiwicGFzc3dvcmQiOiJ0bHBsMTIzNCJ9LCJpYXQiOjE1MTk3NTU5NTh9.cWEK0ZeBTcnvQFWR112EzeO9TtZ40oM_Seb8ZeGHK1I')
    .send(jsonTestObject)
    .expect('Content-Type', /image/)
    .expect(200)
    .expect((res)=>{
      var dimensions = sizeOf('./controllers/images/photo1.jpg');
      expect(dimensions.height).toEqual(50);
      expect(dimensions.width).toEqual(50);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      done();
    });
    
  });
});
