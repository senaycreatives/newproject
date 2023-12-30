// routes/auth.js
const express = require('express');
const router = express.Router();


const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];
  
// Sign-in route
router.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check if user credentials match
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    req.session.authenticated = true;
    req.session.username = user.username;
    res.json({ message: 'Sign-in successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Sign-out route
router.post('/signout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Sign-out successful' });
});

module.exports = router;