const env = process.env;

const mongoConfig = {
    url: env.MONGODB_URL
};

module.exports = mongoConfig;