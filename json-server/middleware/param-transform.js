/*
Convert "?{param}=val1, val2" to "?{param}={val1}&{param}={val2}"
*/

const transformParams = function transformParams (req, res, next) {
    const params = Object.keys(req.query)
    console.log(params)
    const newQuery = params.reduce((prev, param)=> {
        if ( typeof(req.query[param]) === 'string' && req.query[param].includes(',')) {
            return {...prev, [param]: req.query[param].split(',')}
        }
        return {...prev, [param]: req.query[param]}
    }, {})
    req.query = newQuery;
    next()
}

module.exports = transformParams;