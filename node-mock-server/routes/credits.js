const  { Router } =  require('express');
const resp200 = require('./static/credits200.json');
const api = Router()

api.get('/', (req, res)=>{
    res.jsonp(resp200)
})

module.exports = api;