/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('exerciseLogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workouts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exercises',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    notes: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('exerciseLogs');
}
