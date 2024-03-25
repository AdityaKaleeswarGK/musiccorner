const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  user: 'your_postgresql_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_postgresql_password',
  port: 5432,
});
app.use(express.json());
app.post('/api/songs/like', async (req, res) => {
  const { songTitle, album, artist } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO liked_songs (song_title, album, artist) VALUES ($1, $2, $3) RETURNING *',
      [songTitle, album, artist]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving liked song:', error);
    res.status(500).json({ success: false, error: 'Unable to save liked song' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
