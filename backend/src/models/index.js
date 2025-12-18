const sequelize = require('../config/database');
const User = require('./user');
const Comment = require('./comment');

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Sync models - using alter: true for dev to update tables
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Comment,
    initDb
};
