'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey: "UserId"})
      Post.hasMany(models.Like, {foreignKey: "PostId"})
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty : {
          msg: "Title is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Url is required"
        },
        notEmpty : {
          msg: "Image Url is required"
        },
        isUrl: {
          args: true,
          msg: "Image must be Url"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required"
        },
        notEmpty : {
          msg: "Description is required"
        }
      }
    },
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
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};