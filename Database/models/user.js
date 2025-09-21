import { DataTypes } from "sequelize";
import sequelize  from "../config/Database_connect.js";

const User = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {  
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
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
    tableName: "users",
    timestamps: true,
  }
);

export default User;
