'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Income.belongsTo(models.User, {
        foreignKey: 'IUserId',
        targetKey:'id'
      })
    }
  };
  Income.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'Description is Required'
        }
      }
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'Nominal is Required'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty: {
          args: true,
          msg: 'Nominal is Required'
        }
      }
    },
    IUserId : {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};