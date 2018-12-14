const get = function get (req, res, next) {

    if (req.path === "/bookings" && req.query.ids){
        req.query.reservation_id = req.query.ids;
    }
    next();
}

module.exports = [get,];