const userService = require('../services/userService');

class UserController {
    async populate(req, res) {
        try {
            const result = await userService.populateUsers();
            res.send(result.message);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async search(req, res) {
        try {
            // Expecting { name: "something" } or raw body if original app did that, 
            // but let's standardize on JSON body: { query: "name" }
            const { query } = req.body;
            const results = await userService.searchUsers(query);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UserController();
