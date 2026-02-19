import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate,useParams } from 'react-router-dom'

const Doctorappointments = () => {
    const { id } = useParams(); // ✅ doctorId comes from URL
    const [data, setData] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const {doctorId} = useContext(AppContext)

    const navigate = useNavigate()
    
    useEffect( () => {
        fetch(`http://localhost:8081/doctorlogin/${id}`)
        .then(res => res.json())
        .then (data => {setData(data);setLoaded(true)})
        .catch(err => console.log(err))
    }, [id])

    const handlestatus = async (appointmentId, newStatus, newDate = null, newTime = null) => {
    try {
        const response = await fetch('http://localhost:8081/updateAppointmentStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appointmentId,
                status: newStatus,
                appointment_date: newDate,
                appointment_time: newTime
            })
        });
        const result = await response.json();
        console.log(result);

        // re-fetch appointments
        fetch(`http://localhost:8081/doctorlogin/${id}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }
};


    
    return loaded && (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>List of your Appointments</p>
            <div>
                {   
                    data.map((item, index) => (
                        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                            
                            <div className='flex-1 text-lg text-zinc-600'>
                                <p className='text-neutral-800 font-semibold'>Appointment ID: {item.appointment_id}</p>
                                <p>Patient ID: {item.patient_id}</p>
                                <p>Patient Name: {item.first_name + " "+ item.last_name}</p>
                                <p>Gender: {item.gender}</p>
                                <p>Phone Number: {item.phone_number}</p>
                                <p>Email : {item.email}</p>
                                <p>Existing Conditions : {item.existing_conditions}</p>
                                <p>Appointment Date: {item.appointment_date}</p>
                                <p>Appointment Time: {item.appointment_time}</p>
                                <p>Appointment Reason: {item.appointment_reason}</p>
                                <p className='text-zinc-700 font-medium mt-1'>Appointment Status: {item.status}</p>
                            </div>
                            <div className='flex flex-col gap-2 justify-end'>
                            {   
                                item.status !== 'pending'
                                ? (
                                        <div className='flex flex-col gap-2 justify-end'>
                                        <select
                                            className='border rounded p-2'
                                            value={item.status}
                                            onChange={(e) => handlestatus(item.appointment_id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Rescheduled">Rescheduled</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Completed">Completed</option>
                                        </select>

                                        {item.status === "Rescheduled" && (
                                            <div className='flex flex-col gap-2'>
                                                <input
                                                    type="date"
                                                    onChange={(e) => item.newDate = e.target.value}
                                                    className="border rounded p-2"
                                                />
                                                <input
                                                    type="time"
                                                    onChange={(e) => item.newTime = e.target.value}
                                                    className="border rounded p-2"
                                                />
                                                <button
                                                    onClick={() => handlestatus(item.appointment_id, "Rescheduled", item.newDate, item.newTime)}
                                                    className='text-sm text-stone-500 py-2 border rounded hover:bg-blue-600 hover:text-white'
                                                >
                                                    Save Reschedule
                                                </button>
                                            </div>
                                        )}
                                    </div>)
                                : (
                                    <div className='flex flex-col gap-2 justify-end'>
                                        <p>No appointment for you</p>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Doctorappointments;
