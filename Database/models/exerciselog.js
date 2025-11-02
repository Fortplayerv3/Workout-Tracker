import { DataTypes } from 'sequelize';
import sequelize from '../config/Database_connect.js';
import Workout from './workout.js';
import Exercises from './exercise.js';
const exerciseLog = sequelize.define('exerciseLogs',
 {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      workoutId: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      exerciseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      reps: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      sets: {
        type: DataTypes.INTEGER,                  
        allowNull:false,
      },
      focusArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      weight: {
        type: DataTypes.FLOAT,
        allowNull:true,
      },
      notes: {
        allowNull: true,
        type: DataTypes.TEXT
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
      tableName: 'exerciseLogs',
      paranoid: true,
      freezeTableName:true,
      timestamps: true,
    }
);

//Associations 
exerciseLog.belongsTo(Workout,{foreignKey:'workoutId'});
Workout.hasMany(exerciseLog,{foreignKey:'workoutId'});

exerciseLog.belongsTo(Exercises,{foreignKey:'exerciseId'});
Exercises.hasMany(exerciseLog,{foreignKey:'exerciseId'});

export default exerciseLog;
