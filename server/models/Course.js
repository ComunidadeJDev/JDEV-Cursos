const Sequelize = require("sequelize");
const connection = require("../db/connection");
const Category = require("./Category");

const Course = connection.define('courses', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    creator: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assessments: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    releaseYear: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amountHours: {
        type: Sequelize.STRING,
        allowNull: false
    },
    downloadableResouces: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amountExercises: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    certificate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    lifetimeAccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    language: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Course.belongsTo(Category);
Category.hasMany(Course);

Course.sync({force: false});

module.exports = Course;
