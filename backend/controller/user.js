const UserService = require('../service/user');

const UserController = {
    createUser : async (req ,res, next) => {
        try {
            let result = await UserService.createUser(req);
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    },
    loginUser : async (req ,res, next) => {
        try {
            const username = req.query.username;
            const password = req.query.password;
            let result = await UserService.loginUser(username, password);
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }
};

module.exports = UserController;