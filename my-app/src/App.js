import { Routes, Route } from 'react-router-dom';
import LoginSignUp from './LoginSignUp';
import Profile from './Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignUp />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default App;