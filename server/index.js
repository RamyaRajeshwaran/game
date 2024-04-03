const mysql = require('mysql2/promise');

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'rootuser',
  password: 'ramya@1601',
  database: 'sps1',
};

// Function to connect to MySQL and execute queries
async function run() {
  try {
    // Create a MySQL connection pool
    const pool = await mysql.createPool(dbConfig);

    // Insert player details
    const insertPlayerQuery = 'INSERT INTO players (name, winning_status) VALUES (?, ?)';
    const playerData = [
      ['Player Name 1', 'Won'],
      ['Player Name 2', 'Lost'],
    ];
    await Promise.all(playerData.map(data => pool.execute(insertPlayerQuery, data)));

    console.log('Player details inserted successfully.');

    // Fetch inserted player details
    const fetchPlayersQuery = 'SELECT * FROM players';
    const [rows] = await pool.execute(fetchPlayersQuery);

    console.log('Fetched player details:', rows);

    // Close the connection pool
    await pool.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the run function to connect to MySQL and execute queries
run();