import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Doctorsignup = () => {
    const [doctorIdData, setDoctorIdData] = useState(null); 
    const [loaded, setLoaded] = useState(false);
    const navi = useNavigate();

    
    useEffect(() => {
  fetch('http://localhost:8081/newDoctorIdda')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0 && data[0].id) {
        setDoctorIdData(data[0].id);
        setFormData(prev => ({
          ...prev,
          doctor: { ...prev.doctor, doctorId: data[0].id }
        }));
      } else {
        console.error("Invalid response:", data);
      }
      setLoaded(true);
    })
    .catch(err => console.error(err));
}, []);

console.log(doctorIdData);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctor: {
      doctorId: '',
      firstName: '',
      lastName: '',
      specialization: 'general-physician',
      phoneNumber: '',
      email: '',
      availableDays: 'Monday',
      availableFrom: '',
      availableTo: '',
      yearsOfExperience: '',
      salary: '',
      password: '' // new field for doctor login table
    }
  });

  // Handle form changes
  const handleChange = (e, category) => {
    setFormData({
      ...formData,
      [category]: { ...formData[category], [e.target.name]: e.target.value },
    });
  };

  // Add doctor (doctor + login)
 /* const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/doctorsignup', formData.doctor);
      alert("Doctor added successfully!");
      setFormData({
        ...formData,
        doctor: {
          firstName: '',
          lastName: '',
          specialization: 'general-physician',
          phoneNumber: '',
          email: '',
          availableDays: 'Monday',
          availableFrom: '',
          availableTo: '',
          yearsOfExperience: '',
          salary: '',
          password: ''
        }
      });
      navi('/doctorlogin');
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to signup");
    }
  }; */
  const addDoctor = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // Append normal fields
  data.append('doctorId', formData.doctor.doctorId);
  data.append('firstName', formData.doctor.firstName);
  data.append('lastName', formData.doctor.lastName);
  data.append('specialization', formData.doctor.specialization);
  data.append('phoneNumber', formData.doctor.phoneNumber);
  data.append('email', formData.doctor.email);
  data.append('availableDays', formData.doctor.availableDays);
  data.append('availableFrom', formData.doctor.availableFrom);
  data.append('availableTo', formData.doctor.availableTo);
  data.append('yearsOfExperience', formData.doctor.yearsOfExperience);
  data.append('salary', formData.doctor.salary);
  data.append('password', formData.doctor.password);

  // ✅ Append file separately
  if (formData.doctor.profilePhoto) {
    data.append('profilePhoto', formData.doctor.profilePhoto);
  }

  try {
    await axios.post(
      'http://localhost:8081/doctorsignup',
      data
    );
    alert("Doctor added successfully!");

setFormData({
  doctor: {
    doctorId: '',
    firstName: '',
    lastName: '',
    specialization: 'general-physician',
    phoneNumber: '',
    email: '',
    availableDays: 'Monday',
    availableFrom: '',
    availableTo: '',
    yearsOfExperience: '',
    salary: '',
    password: '',
    profilePhoto: null
  }
});


    navi('/doctorlogin');
  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
};


return loaded && (
        <div className="p-8 space-y-8">

        {/* Add Doctor */}
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Create Doctor</h2>
<p>Your Doctor ID: {doctorIdData || "Loading..."}</p>
      
          <form onSubmit={addDoctor} className="space-y-4">
             {/* Profile Photo */}
              <p>Profile Photo</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doctor: {
                      ...formData.doctor,
                      profilePhoto: e.target.files[0]
                    }
                  })
                }
                className="w-full p-2 border rounded"
              />
            
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password"
              value={formData.doctor.password} onChange={(e) => handleChange(e, 'doctor')}
              className="w-full p-2 border rounded" required />

        
        {/* -------------------------------------------------------------------------------------------------------*/}

            <p>First name</p>
            <input type="text" name="firstName" placeholder="Enter the First Name" value={formData.doctor.firstName} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Last name</p>
            <input type="text" name="lastName" placeholder="Enter the Last Name" value={formData.doctor.lastName} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Specialization</p>
            <select name="specialization" value={formData.doctor.specialization} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required>
                <option value="general-physician">General Physician</option>
                <option value="gynecologist">Gynecologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="pediatricians">Pediatrician</option>
                <option value="neurologist">Neurologist</option>
                <option value="gastroenterologist">Gastroenterologist</option>

                <option value="Allergist-(Immunologist)">Allergist-(Immunologist)</option>
                <option value="Hepatologist">Hepatologist</option>
                <option value="Infectious-Disease-Specialist">Infectious-Disease-Specialist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic-Surgeon">Orthopedic-Surgeon</option>
                <option value="Colorectal-Surgeon">Colorectal-Surgeon</option>
                <option value="Vascular-Surgeon">Vascular-Surgeon</option>
                <option value="Rheumatologist">Rheumatologist</option>
                <option value="Urologist">Urologist</option>


            </select>
            <p>Phone number</p>
            <input type="number" name="phoneNumber" placeholder="Enter the Phone Number" value={formData.doctor.phoneNumber} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Email ID</p>
            <input type="email" name="email" placeholder="Enter the Email" value={formData.doctor.email} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Available days</p>
            <select name="availableDays" value={formData.doctor.availableDays} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <p>Available from</p>
            <input type="time" name="availableFrom" value={formData.doctor.availableFrom} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Available till</p>
            <input type="time" name="availableTo" value={formData.doctor.availableTo} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Years of experience</p>
            <input type="number" name="yearsOfExperience" placeholder="Enter the Years of Experience" value={formData.doctor.yearsOfExperience} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <p>Salary</p>
            <input type="number" name="salary" placeholder="Enter the Salary" value={formData.doctor.salary} onChange={(e) => handleChange(e, 'doctor')} className="w-full p-2 border rounded" required/>
            <button type='submit' className="bg-primary text-white p-2 rounded">Signup</button>
            </form>
            
        </div>

        </div>
    );
}

    export default Doctorsignup;
