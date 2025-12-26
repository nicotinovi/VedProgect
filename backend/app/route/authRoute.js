module.exports = (app) => {
    const authController = require("../controller/authController.js");
    
    app.post('/api/auth/register', authController.register);
    app.post('/api/auth/login', authController.login);
};