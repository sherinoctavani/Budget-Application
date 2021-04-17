'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, {
        foreignKey: 'EUserId',
        targetKey:'id'
      })
    }
  };
  Expense.init({
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
    EUserId : {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};