'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {foreignKey: "UserId"})
      User.hasMany(models.Like, {foreignKey: "UserId"})
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "fullname is required"
        },
        notEmpty : {
          msg: "fullname is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty : {
          msg: "Email is required"
        },
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty : {
          msg: "Password is required"
        },
        len: [5, 30]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://wallpapercave.com/wp/wp13386397.jpg"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Status is required"
        },
        notEmpty : {
          msg: "Status is required"
        },
      },
      defaultValue: "Free"
    },
    address: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((el) => {
    el.password = hashPassword(el.password)
  })

  return User;
};