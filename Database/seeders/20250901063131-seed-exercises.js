/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('exercises',
      [
        {
          exerciseName: 'Bench Press',
          reps: 10,
          sets:3,
          focusArea:'Chest',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Squats',
          reps: 10,
          sets:3,
          focusArea:'Legs',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Push Ups',
          reps: 15,
          sets: 3,
          focusArea: 'Chest',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Pull Ups',
          reps: 20,
          sets: 3,
          focusArea: 'Back',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: "Plank",
          reps: 1,
          sets: 3,
          focusArea: 'Core',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Shoulder Press',
          reps: 12,
          sets: 3,
          focusArea: 'Shoulders',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Bicep Curls',
          reps: 12,
          sets: 3,
          focusArea: 'Arms',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          exerciseName: 'Tricep Dips',
          reps: 12,
          sets: 3,
          focusArea: 'Arms',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('exercises', null, {});
  },
};
