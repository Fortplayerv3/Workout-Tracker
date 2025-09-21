import sequelize from '../config/Database_connect.js';
import { DataTypes } from 'sequelize';
import user from './user.js';

const Workout= sequelize.define('workouts',
  {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      date: {
        allowNull:false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      workoutType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true,          
      freezeTableName: true,   
      tableName: 'workouts',
      timestamps: true,
    });

    user.hasMany(Workout,{foreignkey:'userId'});
    Workout.belongsTo(user,{foreignkey:'userId'});
    
    export default Workout;
