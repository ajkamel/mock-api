const http =  require('http');
const express = require('express');
const bodyParser = require('body-parser');

const credits = require('./routes/credits');
const holds = require('./routes/holds');

let app = express();
app.server = http.createServer(app);

app.use(bodyParser(bodyParser.json({ limit: '10mb', extended: false }),
bodyParser.urlencoded({ extended: false })));

app.use('/credits',credits);
app.use('/holds', holds);

app.get('/', (req, res)=>{
    res.jsonp({
        hello:"hello"
    })
})

app.server.listen(process.env.PORT || 3001, () => {
    console.log(`Started on port ${app.server.address().port}`);
});