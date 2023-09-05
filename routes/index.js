const session = require('./session');
const user = require('./user');
const message = require('./message');

const routes = [
    session,
    user,
    message
];

module.exports = routes;