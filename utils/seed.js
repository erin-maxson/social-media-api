const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(20);

    const name = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Users.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
