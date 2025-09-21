import { DataTypes } from 'sequelize';
import sequelize from '../config/Database_connect.js';

const Exercises = sequelize.define(
  'exercises',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    exerciseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    focusArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
     
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,          
    freezeTableName: true,   
    tableName: 'exercises',
    timestamps:true,
  }
);

export default Exercises;
