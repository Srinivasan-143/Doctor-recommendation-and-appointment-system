
import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../components/navbar.css';
const Doctors = () => {
    const { speciality } = useParams()
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()

    const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        let h = parseInt(hours);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        h = h ? h : 12; // 0 becomes 12

        return `${h}:${minutes} ${ampm}`;
        };

    useEffect(() => {
        if (speciality) {
            fetch(`http://localhost:8081/doctors/specialization/${speciality}`)
                .then(res => res.json())
                .then(data => setDoctors(data))
                .catch(err => console.log(err))
        } else {
            // fallback: fetch all doctors if no specialization selected
            fetch('http://localhost:8081/doctors')
                .then(res => res.json())
                .then(data => setDoctors(data))
                .catch(err => console.log(err))
        }
    }, [speciality])

    return (
        <div>
            {/*<div>
            <p className='text-gray-600' >Browse through the doctors specialist </p>
            </div>*/}
            <div className='flex flex-row items-start gap-3 mt-5'> {/* Sidebar for specializations */}
                <div className='flex flex-col gap-4 text-sm text-gray-600 w-1/3 sm:w-1/4'>
                    <p onClick={() => navigate('/doctors/general-physician')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "general-physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
                    <p onClick={() => navigate('/doctors/gynecologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
                    <p onClick={() => navigate('/doctors/dermatologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
                    <p onClick={() => navigate('/doctors/pediatricians')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
                    <p onClick={() => navigate('/doctors/neurologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
                    <p onClick={() => navigate('/doctors/gastroenterologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
                    <p onClick={() => navigate('/doctors/allergist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "allergist" ? "bg-indigo-100 text-black" : ""}`}>Allergist</p>
                    <p onClick={() => navigate('/doctors/hepatologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "hepatologist" ? "bg-indigo-100 text-black" : ""}`}>Hepatologist</p>
                    <p onClick={() => navigate('/doctors/infectious-disease-specialist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "infectious-disease-specialist" ? "bg-indigo-100 text-black" : ""}`}>Infectious Disease Specialist</p>
                    <p onClick={() => navigate('/doctors/endocrinologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "endocrinologist" ? "bg-indigo-100 text-black" : ""}`}>Endocrinologist</p>
                    <p onClick={() => navigate('/doctors/pulmonologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "pulmonologist" ? "bg-indigo-100 text-black" : ""}`}>Pulmonologist</p>
                    <p onClick={() => navigate('/doctors/cardiologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "cardiologist" ? "bg-indigo-100 text-black" : ""}`}>Cardiologist</p>
                    <p onClick={() => navigate('/doctors/orthopedic-surgeon')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "orthopedic-surgeon" ? "bg-indigo-100 text-black" : ""}`}>Orthopedic Surgeon</p>
                    <p onClick={() => navigate('/doctors/colorectal-surgeon')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "colorectal-surgeon" ? "bg-indigo-100 text-black" : ""}`}>Colorectal Surgeon</p>
                    <p onClick={() => navigate('/doctors/vascular-surgeon')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "vascular-surgeon" ? "bg-indigo-100 text-black" : ""}`}>Vascular Surgeon</p>
                    <p onClick={() => navigate('/doctors/rheumatologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "rheumatologist" ? "bg-indigo-100 text-black" : ""}`}>Rheumatologist</p>
                    <p onClick={() => navigate('/doctors/urologist')} className={` sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "urologist" ? "bg-indigo-100 text-black" : ""}`}>Urologist</p>

                </div>

                {/* Doctors list */}
<div className='w-2/3 sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-5 px-2'>{doctors.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item.doctor_id}`)}
                            key={item.doctor_id}
                            className={`flex flex-col items-center border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
                                index === 0 ? "border-green-500 bg-green-50" : "border-blue-200"
                            }`}
                        >
                            <br/>
                            <img
                                className='bg-blue-50 w-50 h-60 rounded-xl'
                                src={
                item.profile_photo
                ? `http://localhost:8081/${item.profile_photo}`
                : '/default-doctor.png'
            }
                                alt={`${item.first_name} ${item.last_name}`}                            />
                            <div className='p-4'>
                                <p>
                                    {index === 0 && (
                                    <p className="ml-2 text-sm text-white bg-black font-bold" style={{borderRadius:'10px', padding:'8px', width:'100%', textAlign:'center'}}>Top Doctor</p>
                                 )}
                                </p>
                                <p>
                                    Name: <b> {item.first_name} {item.last_name} </b>
                                    {/*index === 0 && (
                                        <span className="ml-2 text-sm text-white bg-black font-bold" style={{borderRadius:'10px', padding:'8px'}}>Top Doctor</span>
                                    )*/}
                                </p>
                                <p>Specialization: <b>{item.specialization.toUpperCase()}</b> </p>
                                <p>Days Available: {item.available_days}</p>
                                <p>Available Hours: {formatTime(item.available_from)} - {formatTime(item.available_to)}</p>
                                <p>Years of Experience: {item.years_of_experience}</p>
                                <p>Doctor Id: {item.doctor_id}</p>
                                <p className="text-yellow-600">
                                    &#9733; {Number(item.avg_rating || 0).toFixed(1)} ({item.total_reviews || 0} reviews)
                                    
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Doctors
