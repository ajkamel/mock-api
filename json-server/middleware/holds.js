
/* Middleware that  inserts oauth_client_id, room_id, class_date
and studio_id into body of POST request
*/ 
const post = (req, res, next) => {
    const holdMockData = {
        oauth_client_id: 10,
          class_id: 922178,
          spot_id: 35,
          room_id: 2,
          ride_date: "2018-09-15T13:30:00.000Z",
          studio_id: 2,
          created_at: "2018-03-18T17:17:40.016Z"
    }
    if (req.method === 'POST' && req.path==="/holds") {
        req.body = {...req.body, ...holdMockData}
    }
    next()
  }


const del = function del (req, res, next) {
    if (req.method === 'DELETE' && req.path === "/holds") {
        const reservationID = req.body.reservation_id
        if (reservationID){
            req.url += `/${reservationID}`
        }
    }
    next();
}

  module.exports = [
      post,
      del,
  ]