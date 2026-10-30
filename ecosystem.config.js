module.exports = {
    apps: [{
        name: 'crushianempiresite',
        script: './bin/www',
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};