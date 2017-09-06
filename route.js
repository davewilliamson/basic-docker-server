module.exports = function route(app) {

    return new Promise(

        function(resolve) {
            
            app.get('/', function(req, res, next){
                console.log('Request');
                res.send('Looking Good');
            });

            resolve();
        }
    );
};
