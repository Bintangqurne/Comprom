'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {foreignKey: "UserId"})
      Like.belongsTo(models.Post, {foreignKey: "PostId"})
    }
  }
  Like.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User Id is required"
        },
        notEmpty : {
          msg: "User Id is required"
        }
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Post Id is required"
        },
        notEmpty : {
          msg: "Post Id is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};