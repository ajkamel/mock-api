const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const render = require('./render')
const holdsMiddleware = require('./middleware/holds');
const bookingMiddleware = require('./middleware/booking');
const paramTransform = require('./middleware/param-transform');

router.render = render;

server.use(middlewares)
server.use(jsonServer.bodyParser)

//Route Specific Middleware

server.use(holdsMiddleware)
server.use(bookingMiddleware);

//Convert "?{param}=val1, val2" to "?{param}={val1}&{param}={val2}"
server.use(paramTransform)


//Echo
server.put('/bookings/claims', (req, res) => {
    res.jsonp({reservation_id:req.body.reservation_id})
  })



server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})