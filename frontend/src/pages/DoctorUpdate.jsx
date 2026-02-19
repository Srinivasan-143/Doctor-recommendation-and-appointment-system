import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorUpdate = () => {
  const { id } = useParams(); // doctor_id from URL
  const [formData, setFormData] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/doctorProfile/${id}`)
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
      const response = await fetch(`http://localhost:8081/updateDoctorDetails/${id}`, {
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
      const response = await fetch(`http://localhost:8081/updateDoctorPassword/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const result = await response.json();
      console.log(result);
      setShowPasswordForm(false);
      setNewPassword('');
      alert('Password updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  if (!formData.doctor_id) return <p>Loading doctor profile...</p>;

  return (
    <div>
    <form onSubmit={handleSubmit} className="p-8 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold">Update Doctor Profile</h2>

      <div className="mt-3">
        <p>Doctor ID (constant):</p>
        <input type="text" value={formData.doctor_id} disabled className="border rounded w-full p-2" />
      </div>

      <div className="mt-3">
        <p>Email (constant):</p>
        <input type="email" value={formData.email} disabled className="border rounded w-full p-2" />
      </div>

      <div className="mt-3">
        <p>First Name:</p>
        <input type="text" name="first_name" value={formData.first_name || ''} onChange={handleChange} className="border rounded w-full p-2" />
      </div>

      {/* Repeat for last_name, specialization, phone_number, available_days, available_from, available_to, years_of_experience, salary */}
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
        <p>Specialization:</p>
        <select
            name="specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
        >
            <option value="general-physician">General Physician</option>
            <option value="gynecologist">Gynecologist</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="pediatricians">Pediatrician</option>
            <option value="neurologist">Neurologist</option>
            <option value="gastroenterologist">Gastroenterologist</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="pulmonologist">Pulmonologist</option>
            <option value="endocrinologist">Endocrinologist</option>
            <option value="hepatologist">Hepatologist</option>
            <option value="rheumatologist">Rheumatologist</option>
            <option value="orthopedic-surgeon">Orthopedic Surgeon</option>
            <option value="urologist">Urologist</option>
            <option value="vascular-surgeon">Vascular Surgeon</option>
            <option value="colorectal-surgeon">Colorectal Surgeon</option>
            <option value="allergist">Allergist</option>
            <option value="infectious-disease-specialist">Infectious Disease Specialist</option>
        </select>
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
        <p>Available Days:</p>
        <input
            type="text"
            name="available_days"
            value={formData.available_days || ''}
            onChange={handleChange}
            placeholder="e.g. Mon, Wed, Fri"
            className="border rounded w-full p-2"
        />
        </div>

        <div className="mt-3">
        <p>Available From:</p>
        <input
            type="time"
            name="available_from"
            value={formData.available_from || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
        />
        </div>

        <div className="mt-3">
        <p>Available To:</p>
        <input
            type="time"
            name="available_to"
            value={formData.available_to || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
        />
        </div>

        <div className="mt-3">
        <p>Years of Experience:</p>
        <input
            type="number"
            name="years_of_experience"
            value={formData.years_of_experience || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
        />
        </div>

        <div className="mt-3">
        <p>Salary:</p>
        <input
            type="number"
            name="salary"
            value={formData.salary || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
        />
        </div>

      <button type="submit" className="bg-primary text-white w-full py-2 rounded-md mt-4">
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

export default DoctorUpdate;
