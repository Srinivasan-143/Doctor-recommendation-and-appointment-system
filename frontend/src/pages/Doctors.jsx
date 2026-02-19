
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'

const Doctors = () => {
    const { speciality } = useParams()
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()

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
            <p className='text-gray-600'>Browse through the doctors specialist</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Sidebar for specializations */}
                <div className='flex flex-col gap-4 text-sm text-gray-600'>
                    <p onClick={() => navigate('/doctors/General-Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "general-physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
                    <p onClick={() => navigate('/doctors/gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
                    <p onClick={() => navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
                    <p onClick={() => navigate('/doctors/pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
                    <p onClick={() => navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
                    <p onClick={() => navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
                    
                    <p onClick={() => navigate('/doctors/Allergist-(Immunologist)')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Allergist-(Immunologist)</p>
                    <p onClick={() => navigate('/doctors/Hepatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Hepatologist</p>
                    <p onClick={() => navigate('/doctors/Infectious-Disease-Specialist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Infectious Disease Specialist</p>
                    <p onClick={() => navigate('/doctors/Endocrinologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Endocrinologist</p>
                    <p onClick={() => navigate('/doctors/Pulmonologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Pulmonologist</p>
                    <p onClick={() => navigate('/doctors/Cardiologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Cardiologist</p>
                    <p onClick={() => navigate('/doctors/Orthopedic-Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Orthopedic Surgeon</p>
                    <p onClick={() => navigate('/doctors/Colorectal-Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Colorectal Surgeon</p>
                    <p onClick={() => navigate('/doctors/Vascular-Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Vascular Surgeon</p>
                    <p onClick={() => navigate('/doctors/Rheumatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Rheumatologist</p>
                    <p onClick={() => navigate('/doctors/Urologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer ${speciality === "neurologist" ? "bg-indigo-100 text-black" : ""}`}>Urologist</p>

                </div>

                {/* Doctors list */}
                <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                    {doctors.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item.doctor_id}`)}
                            key={item.doctor_id}
                            className={`flex flex-col items-center border rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
                                index === 0 ? "border-yellow-500 bg-yellow-50" : "border-blue-200"
                            }`}
                        >
                            <br/>
                            <img
                                className='bg-blue-50 w-80 h-100 rounded-xl'
                                src={assets[`doc${(item.doctor_id % 15)}`]}
                                alt={`${item.first_name} ${item.last_name}`}                            />
                            <div className='p-4'>
                                <p>Doctor Id: {item.doctor_id}</p>
                                <p>
                                    Name: {item.first_name} {item.last_name}
                                    {index === 0 && (
                                        <span className="ml-2 text-sm text-yellow-700 font-bold">🏆 Top Doctor</span>
                                    )}
                                </p>
                                <p>Specialization: {item.specialization}</p>
                                <p>Days Available: {item.available_days}</p>
                                <p>Available Hours: {item.available_from} - {item.available_to}</p>
                                <p>Years of Experience: {item.years_of_experience}</p>
                                <p className="text-yellow-600">
                                    ⭐ {Number(item.avg_rating || 0).toFixed(1)} ({item.total_reviews || 0} reviews)
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
