import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [student, setStudent] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@villageschool.edu',
    gradeLevel: '10th Grade',
    profilePicUrl: 'https://placehold.co/100x100/9BD3DD/00283C?text=AJ&font=roboto',
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const classes = [
    { id: 1, name: 'Algebra II', teacher: 'Ms. Jenkins', day: 'A', subject: 'math' },
    { id: 2, name: 'English II', teacher: 'Mr. Smith', day: 'A', subject: 'english' },
    { id: 3, name: 'Chemistry', teacher: 'Dr. Lee', day: 'B', subject: 'science' },
    { id: 4, name: 'World History', teacher: 'Ms. Ortiz', day: 'B', subject: 'history' },
  ];

  const upcomingTests = [
    { id: 1, name: 'Chapter 5 Test', class: 'Algebra II', date: 'Nov 10', type: 'test' },
    { id: 2, name: 'Vocab Quiz', class: 'English II', date: 'Nov 12', type: 'quiz' },
    { id: 3, name: 'Lab Report', class: 'Chemistry', date: 'Nov 15', type: 'project' },
    { id: 4, name: 'Multiple Tests Alert', class: 'English II', date: 'Nov 10', type: 'alert' },
  ];

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

  return (
    <div className="account-page-container">
      <div className="account-card">
        <header className="account-header">
          <h1>Student Profile & Settings</h1>
        </header>

        <div className="account-content">
          <form onSubmit={handleSubmit}>
            <h2 className="section-title">Basic Information</h2>
            <section className="profile-pic-section">
              <img
                src={student.profilePicUrl}
                alt="Profile"
                className="profile-pic-preview"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/AAA9AA/FFFFFF?text=Error'; }}
              />
              <div className="profile-pic-actions">
                <button type="button" className="upload-button">Upload New Picture</button>
              </div>
            </section>

            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" className="form-input" value={student.firstName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" className="form-input" value={student.lastName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" value={student.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="gradeLevel">Grade Level</label>
              <input type="text" id="gradeLevel" className="form-input" value={student.gradeLevel} disabled />
            </div>

            <h2 className="section-title">Change Password</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="oldPassword">Old Password</label>
              <input type="password" id="oldPassword" className="form-input" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" className="form-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="submit" className="save-button">Save Changes</button>
            </div>
          </form>

          <h2 className="section-title">Classes & Schedule</h2>
          <ul className="info-list">
            {classes.map(cls => (
              <li key={cls.id} className="info-list-item">
                <div className="info-list-item-content">
                  <span className={`subject-dot dot-${cls.subject}`}></span>
                  <strong>{cls.name}</strong>
                  Teacher: {cls.teacher}
                </div>
                <div className="info-list-item-action">
                  <span className={`class-schedule-day ${cls.day === 'A' ? 'day-a' : 'day-b'}`}>{cls.day} Day</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="section-title">Upcoming Tests</h2>
          <ul className="info-list">
            {upcomingTests.map(test => (
              <li key={test.id} className="info-list-item">
                <div className="info-list-item-content">
                  <span className={`test-type-dot ${test.type === 'test' ? 'dot-test' : test.type === 'quiz' ? 'dot-quiz' : test.type === 'project' ? 'dot-project' : 'dot-alert'}`}></span>
                  <strong>{test.name}</strong>
                  {test.class} - {test.date}
                  {test.type === 'alert' && <div style={{color: '#e63946', fontSize: '0.9rem', paddingTop: '4px'}}>Alert: 2+ tests this day</div>}
                </div>
              </li>
            ))}
          </ul>

          <h2 className="section-title">Notification Settings</h2>
          <div className="notification-setting">
            <span className="notification-label">Email me for new tests</span>
            <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="slider"></span></label>
          </div>
          <div className="notification-setting">
            <span className="notification-label">Email me 1 day before a test</span>
            <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="slider"></span></label>
          </div>
          <div className="notification-setting">
            <span className="notification-label">Alert me for 3+ tests in one day</span>
            <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="slider"></span></label>
          </div>

          <h2 className="section-title">Permissions</h2>
          <div className="info-box">
            <p style={{margin: 0}}><strong>You have Student permissions.</strong> You can view your schedule and upcoming tests, but cannot edit or add new ones. Please contact a teacher or admin for help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;