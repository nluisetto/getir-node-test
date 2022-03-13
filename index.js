require('dotenv').config();

const app = require('./src/app');
const webserverConfig = require('./src/configs/web-server.config');

app.listen(webserverConfig.port,() => {
    console.log(`App listening on port ${webserverConfig.port}`)
});