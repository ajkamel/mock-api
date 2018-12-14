const  { Router } =  require('express');

const api = Router()

api.post('/', (req, res)=>{
    const {class_id, spot_id} = req.body;
    if (class_id && spot_id) { 
    res.status(201);
    res.jsonp({
        "meta": {},
        "data": [
          {
            "id": 1001,
            "oauth_client_id": 10,
            "class_id": class_id,
            "spot_id": spot_id,
            "room_id": 2,
            "ride_date": "2018-09-15T13:30:00.000Z",
            "studio_id": 2,
            "created_at": "2018-03-18T17:17:40.016Z"
          }
        ]
      })
    } else {
        res.status(400)
        res.jsonp({
            "meta": {
              "code": 400
            },
            "errors": [
              {
                "status": 400,
                "message": "A required field is missing or invalid from the request body."
              }
            ]
          })
    }

})

module.exports = api;