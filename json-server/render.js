/*
Override JsonServer Router to return "Data: {...} JSON.Spec format"
*/

const errorHandler = function errorHandler(req, res){
    if (res.statusCode >= 400) {
        data = {
            "meta": {
              "code": res.statusCode
            },
            "errors": [
              {
                "status": res.statusCode,
                "message": "Error"
              }
            ]
          }
        res.jsonp(data)
        return true;
      }
}
const render = function render (req, res) {
    if (errorHandler(req, res)) return;
    const mockMeta = {meta: {}}
    const resData = res.locals.data;
    if (req.path === '/credits' && resData[0]){
        res.jsonp({data:resData[0].data});
    }
    else if (resData) {
        res.jsonp({...mockMeta, data:resData});
    }else {
        res.jsonp({...mockMeta, ...resData});
    }
}

module.exports = render;
