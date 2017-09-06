const pjson = require('./package.json');

module.exports = function configure(app) {

    return new Promise(

        function(resolve) {

            app.disable('trust proxy');

            app.set('version', pjson.version);

            if (process.env.NODE_ENV === 'production') {
                app.enable('view cache');
            }

            if (process.env.NODE_ENV === 'development') {
                app.disable('view cache');
            }

            resolve();
        }
    );
};
