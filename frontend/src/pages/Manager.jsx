import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Manager = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const st = localStorage.getItem("admin");
    const [doctorIdData, setDoctorIdData] = useState(null); 
    const [loaded, setLoaded] = useState(false);
    const [patients, setPatients] = useState([]);
    const navi = useNavigate();
    const addoctor = useRef(null); 
    const alldoctor = useRef(null); 
    const allpatient = useRef(null); 

    const scrollToDoctor = (para) => { 
        para.current?.scrollIntoView({ behavior: "smooth" });
     };

    useEffect(() => { fetch('http://localhost:8081/allPatients')
         .then(res => res.json()) 
         .then(data => setPatients(data)) 
         .catch(err => console.error(err)); 
        }, []);

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
       
    
    
    const authenticate = () => {
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          setIsAuthenticated(true);
          localStorage.setItem("admin","admin");
          localStorage.removeItem("patientId");
          localStorage.removeItem("doctorId");
        } else {
          alert('Invalid username or password');
        }
    };
    
    const [doctors, setDoctors] = useState([]);

    {/*const [formData, setFormData] = useState({
        doctor: { firstName: '', lastName: '', specialization: 'general-physician', phoneNumber: '', email: '', availableDays: 'Monday', availableFrom: '', availableTo: '', yearsOfExperience: '', salary: '' }
    }); */}
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
    

    // Fetching doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await axios.get('http://localhost:8081/doctors');
            setDoctors(response.data);
        };
        
        fetchDoctors();
        
    }, []);

    // Handling form changes
    const handleChange = (e, category) => {
        setFormData({
        ...formData,
        [category]: { ...formData[category], [e.target.name]: e.target.value },
        });
    };

    // Function to add a doctor
    const addDoctor = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8081/doctorsignup', formData.doctor);
        setFormData({
            ...formData,
            doctor: {doctorId: '', firstName: '', lastName: '', specialization: 'general-physician', phoneNumber: '', email: '', availableDays: 'Monday', availableFrom: '', availableTo: '', yearsOfExperience: '', salary: '' }
        });
    }

    // Function to delete a doctor
    const deleteDoctor = async (doctorId) => {
        await axios.delete(`http://localhost:8081/deleteDoctor/${doctorId}`);
    };

    //Delete patient
    const handleDelete = async (id) => { 
        if (!window.confirm('Are you sure you want to remove this patient?')) 
            return; 
        try { 
            const response = await fetch(`http://localhost:8081/deletePatient/${id}`,
                 { method: 'DELETE', }); 
                 const result = await response.json(); 
                 console.log(result); // Refresh list after deletion 
                 setPatients(patients.filter(p => p.patient_id !== id)); } 
                 catch (err) { console.error(err); } };



    if (st == null) {
        return (
        <div className="p-8 space-y-8">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); authenticate(); }}>
            <p>Username</p>
            <input type="text" name="username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} className="w-full p-2 border rounded" required />
            <p>Password</p>
            <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="w-full p-2 border rounded" required />
            <button type='submit' className="bg-primary text-white p-2 rounded">Login</button>
            </form>
        </div>
        );
    }
    else{

    return (
        <div className="p-8 space-y-8">
            {/*logout*/}
            <div style={{display:"flex", flexDirection:"row-reverse"}}>
            {<button onClick={()=>{
                localStorage.removeItem("admin");
                setIsAuthenticated(false);
                navi('/');
            }} style={{backgroundColor:"teal", padding:"10px", color:"white", borderRadius:'20px'}}>logout</button>}
            </div>

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            {<button onClick={()=>scrollToDoctor(addoctor)} style={{backgroundColor:"orange", padding:"10px", color:"black", borderRadius:'20px'}}>Add Doctor</button>}
            {<button onClick={()=>scrollToDoctor(alldoctor)} style={{backgroundColor:"orange", padding:"10px", color:"black", borderRadius:'20px'}}>View / Edit Doctors</button>}
            {<button onClick={()=>scrollToDoctor(allpatient)} style={{backgroundColor:"orange", padding:"10px", color:"black", borderRadius:'20px'}}>View / Edit Patients</button>}
             
            </div>
        {/* Add Doctor */}
        <div ref={addoctor} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
            <p>Doctor ID: {doctorIdData || "Loading..."}</p>

            <form onSubmit={addDoctor} className="space-y-4">
                <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password"
              value={formData.doctor.password} onChange={(e) => handleChange(e, 'doctor')}
              className="w-full p-2 border rounded" required />
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
            <button type='submit' className="bg-primary text-white p-2 rounded">Add Doctor</button>
            </form>
            <br/>
            {/* Doctor List */}
            <h2 ref={alldoctor} className="text-xl font-bold mb-4">Delete Doctor</h2>
            <div className="mt-4 space-y-2">
            {doctors.map((doctor) => (
                <div key={doctor.doctor_id} className="flex justify-between items-center">
                <span>{doctor.first_name} {doctor.last_name}</span>
                <div>
                <button className="bg-red-500 text-white p-1 rounded" onClick={() => deleteDoctor(doctor.doctor_id)} style={{border:"5px solid white", borderRadius:"10px"}}>Delete</button>
                
                <Link to={`/DoctorUpdate/${doctor.doctor_id}`} style={{backgroundColor:"teal", borderRadius:"20px", color:"white", padding:"10px"}} >Edit Profile</Link>
                </div>
                </div>
            ))}
            </div>
             {/* patient List */}
            <h2 ref={allpatient} className="text-xl font-bold mb-4">Delete Patients</h2>
            <div className="mt-4 space-y-2">
            {patients.map((doctor) => (
                <div key={doctor.patient_id} className="flex justify-between items-center">
                <span>{doctor.first_name} {doctor.last_name}</span>
                <div>
                <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDelete(doctor.patient_id)} style={{border:"5px solid white", borderRadius:"10px"}}>Delete</button>
                                </div>
                </div>
            ))}
            </div>
        </div>
        
        </div>
    );
}
    };

    export default Manager;
