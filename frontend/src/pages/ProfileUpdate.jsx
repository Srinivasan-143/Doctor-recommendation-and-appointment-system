import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const { id } = useParams();   // 👈 patient_id comes from URL
  const [formData, setFormData] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(true); 
  const [newPassword, setNewPassword] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/patientProfile/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setFormData(data[0]);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/updatePatientDetails/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
const handlePasswordSubmit = async (e) => { 
  e.preventDefault(); 
  try { 
    const response = await fetch(`http://localhost:8081/updatePassword/${id}`, 
      { method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ password: newPassword }), });
        const result = await response.json();
         console.log(result);
          setShowPasswordForm(false); // hide after success 
          setNewPassword(''); 
          alert('Password updated successfully!'); }
           catch (err) { console.error(err); } };
  if (!formData.patient_id) return <p>Loading profile...</p>;

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <input type="text" value={formData.patient_id} disabled />
      <input type="email" value={formData.email} disabled />
  {/* Editable fields */}
  <div className="mt-3">
    <p>First Name:</p>
    <input
      type="text"
      name="first_name"
      value={formData.first_name || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Last Name:</p>
    <input
      type="text"
      name="last_name"
      value={formData.last_name || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Date of Birth:</p>
    <input
      type="date"
      name="date_of_birth"
      value={formData.date_of_birth ? formData.date_of_birth.split('T')[0] : ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Gender:</p>
    <select
      name="gender"
      value={formData.gender || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div className="mt-3">
    <p>Address:</p>
    <input
      type="text"
      name="address"
      value={formData.address || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Phone Number:</p>
    <input
      type="tel"
      name="phone_number"
      value={formData.phone_number || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Blood Type:</p>
    <select
      name="blood_type"
      value={formData.blood_type || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    >
      <option value="A+">A+ Ve</option>
      <option value="A-">A- Ve</option>
      <option value="B+">B+ Ve</option>
      <option value="B-">B- Ve</option>
      <option value="AB+">AB+ Ve</option>
      <option value="AB-">AB- Ve</option>
      <option value="O+">O+ Ve</option>
      <option value="O-">O- Ve</option>
    </select>
  </div>

  <div className="mt-3">
    <p>Emergency Contact:</p>
    <input
      type="tel"
      name="emergency_contact"
      value={formData.emergency_contact || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Allergies:</p>
    <input
      type="text"
      name="allergies"
      value={formData.allergies || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <div className="mt-3">
    <p>Existing Conditions:</p>
    <input
      type="text"
      name="existing_conditions"
      value={formData.existing_conditions || ''}
      onChange={handleChange}
      className="border rounded w-full p-2"
    />
  </div>

  <button
    type="submit"
    className="bg-primary text-white w-full py-2 rounded-md mt-4"
  >
    Save Changes
  </button>
</form>
{/* Password form */}
 
   <form onSubmit={handlePasswordSubmit} className="mt-3"> 
   <p>New Password:</p> 
   <input type="password" value={newPassword} onChange={
    (e) => setNewPassword(e.target.value)} className="border rounded w-full p-2" required /> 
    <button type="submit" className="bg-red-600 text-white w-full py-2 rounded-md mt-2"> Update Password </button>
     <button type="button" onClick={() => setShowPasswordForm(true)} className="bg-gray-400 text-white w-full py-2 rounded-md mt-2" > Cancel </button>
      </form>
 
</div>
  );
};

export default ProfileUpdate;
