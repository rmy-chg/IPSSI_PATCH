const axios = require('axios');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');

class UserService {
    async populateUsers() {
        try {
            const urls = [1, 2, 3].map(() => axios.get('https://randomuser.me/api/'));
            const results = await Promise.all(urls);

            const promises = results.map(async r => {
                const u = r.data.results[0];
                const fullName = `${u.name.first} ${u.name.last}`;
                // Securely hash the password
                const passwordHash = await bcrypt.hash(u.login.password, 10);

                return User.create({ name: fullName, password: passwordHash });
            });

            await Promise.all(promises);
            return { message: 'Inserted 3 users into database.' };
        } catch (err) {
            throw new Error('Error inserting users: ' + err.message);
        }
    }

    async getAllUsers() {
        return await User.findAll({
            attributes: ['id', 'name'] // Never return passwords
        });
    }

    async searchUsers(query) {
        if (!query || typeof query !== 'string') {
            throw new Error('Invalid query');
        }
        return await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            },
            attributes: ['id', 'name']
        });
    }
}

module.exports = new UserService();
