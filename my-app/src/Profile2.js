import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gradeLevel: '',
    profilePicUrl: 'https://placehold.co/100x100/9BD3DD/00283C?text=AJ&font=roboto',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/login', {
        withCredentials: true
        });

        console.log('LOGIN RESPONSE:', res.data);

        // Adjust this block to match your real response:
        if (res.data.boolean === true) {
          const u = res.data.user;
          setUser(u);
          setStudent(prev => ({
            ...prev,
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            email: u.email || '',
            gradeLevel: u.gradeLevel || '',
          }));
        } else {
          alert('Invalid email or password. Please try again.');
          setRedirect(true);
        }
      } catch (err) {
        console.error('LOGIN ERROR:', err);
        setRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStudent(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving changes:', student);
    if (oldPassword && newPassword) console.log('Changing password...');
    alert('Changes saved successfully!');
  };

  if (loading) return <div>Loading...</div>;
  if (redirect) return <Navigate to="/LoginSignUp" />;

  return (
    <div className="account-page-container">
      {/* your existing JSX here, using student, oldPassword, newPassword, handleChange, handleSubmit */}
    </div>
  );
};

export default Profile;