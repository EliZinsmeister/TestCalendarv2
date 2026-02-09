import { Routes, Route } from 'react-router-dom';
import LoginSignUp from './LoginSignUp';
import Profile from './Profile2';

function App() {
  const session = require('express-session');

  app.use(session({
    secret: 'supersecretkey123',   // put in .env later
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,               // true only if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24  // 1 day
    }
  }));
  return (
    <Routes>
      <Route path="/" element={<LoginSignUp />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default App;