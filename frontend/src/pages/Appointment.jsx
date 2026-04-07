import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Appointment = () => {
    
    const navigate = useNavigate()
  
    const {docId} = useParams()

    const [data, setData] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect( () => {
        fetch(`http://localhost:8081/doctors/${docId}`)
        .then(res => res.json())
        .then (data => setData(data))
        .then(loaded => setLoaded(true))
        .catch(err => console.log(err))
    }, [docId])

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [appointmentReason, setAppointmentReason] = useState('');

    const {patientId} = useContext(AppContext)

      const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        let h = parseInt(hours);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        h = h ? h : 12; // 0 becomes 12

        return `${h}:${minutes} ${ampm}`;
        };


const handleScheduleAppointment = async () => {

    if (isSubmitting) return;

    // ✅ First validate
    if (!appointmentDate || !appointmentTime || !appointmentReason) {
        alert("Please fill all fields!");
        return;
    }

    // ✅ THEN set loading
    setIsSubmitting(true);

    const submittedData = {
        patient_id: patientId,
        doctor_id: docId,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        appointment_reason: appointmentReason
    };

    try {
        const response = await fetch('http://localhost:8081/bookAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submittedData),
        });

        const data = await response.json();
        console.log(data);

        navigate('/my-appointments');

    } catch (err) {
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
};

    const availableTimes = (selectedDate) => {
        const times = [];
        const today = new Date();
        const selected = new Date(selectedDate);
    
         // Get doctor available time
const [fromHour, fromMin] = data[0].available_from.split(":").map(Number);
const [toHour, toMin] = data[0].available_to.split(":").map(Number);

// Default start time = doctor's start time
let startHour = fromHour;
let startMinute = fromMin;

if (selected.toDateString() === today.toDateString()) {
    const currentHour = today.getHours();
    const currentMin = today.getMinutes();

    // If current time is already past doctor's end → no slots
    if (
        currentHour > toHour ||
        (currentHour === toHour && currentMin >= toMin)
    ) {
        return [];
    }

    // Start from current time if it's later than doctor's start
    if (
        currentHour > startHour ||
        (currentHour === startHour && currentMin > startMinute)
    ) {
        startHour = currentHour;
        startMinute = currentMin > 30 ? 30 : 0;

        // Move to next slot properly
        if (startMinute === 30) {
            startHour++;
            startMinute = 0;
        }
    }
}
        const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        let h = parseInt(hours);
        const ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        h = h ? h : 12; // 0 becomes 12

        return `${h}:${minutes} ${ampm}`;
        };

        for (let hour = startHour; hour <= toHour; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : hour;

    // Add :00 slot only if within limit
    if (hour < toHour || (hour === toHour && 0 <= toMin)) {
        if (!(hour === startHour && startMinute === 30)) {
            times.push(`${formattedHour}:00`);
        }
    }

    // Add :30 slot only if within limit
    if (hour < toHour || (hour === toHour && 30 <= toMin)) {
        times.push(`${formattedHour}:30`);
    }
}
    
        return times;
    };
console.log(data);
    if(patientId !== 0){
        return loaded && (
            <div>
                {/* Doctor details */}
                <div className='flex flex-col sm:flex-row gap-4'style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                    <div>
                        <img className='bg-primary sm:max-w-72 rounded-lg h-80' src={
                data[0].profile_photo
                ? `http://localhost:8081/${data[0].profile_photo}`
                : '/default-doctor.png'
            } alt=""/>
                    </div>

                    <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                        {/* Doctor-information */}
                        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                            {data[0].first_name} {data[0].last_name}
                            <img className='w-6' src={assets.verified} alt=""/>
                        </p>
                        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                            <p>Speciality: {data[0].specialization}</p>
                            <button className='py-0.5 px-2 border text-xs rounded-full'>{data[0].years_of_experience} years</button>
                        </div>
                        <div>
                            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                                Availability <img className='w-4' src={assets.info} alt=""/>
                            </p>
                            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>Available days of the week: {data[0].available_days}</p>
                            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>Available from {formatTime(data[0].available_from)}to {formatTime(data[0].available_to)}</p>
                        </div>       

                        <div>
                            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                                About <img className='w-4' src={assets.info} alt=""/>
                            </p>
                            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>Dr. {data[0].first_name} {data[0].last_name} is a dedicated {data[0].specialization} with over {data[0].years_of_experience} years of experience. Dr. {data[0].first_name} {data[0].last_name} has {data[0].avg_rating} average rating, reviwed by patients</p>
                        </div>
                    </div>
                </div>
                
                {/* Schedule Appointment */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Schedule an Appointment</h3>
                    <div className="mt-4 flex flex-col">

                        <p>Select your appointment date</p>
                        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="border border-gray-300 rounded p-2" min={new Date().toISOString().split("T")[0]} required/>
                        <br/>

                        <p>Select your appointment time</p>
                        <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="border border-gray-300 rounded p-2" required>
                            <option value="">Select Time</option>
                            {availableTimes(appointmentDate).map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <p>
                        Selected time: {formatTime(appointmentTime)}
                        </p>
                        <br/>

                        <p>Appointment reason</p>
                        <input type='text' className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setAppointmentReason(e.target.value)} value={appointmentReason} placeholder='Enter the reason for your appointment' required/>
                        <br/>

                        {/*<button onClick={handleScheduleAppointment} className="bg-primary text-white py-2 px-4 ml-2 rounded-xl">
                            Book Appointment
                        </button>*/}
                        <button 
                        onClick={handleScheduleAppointment} 
                        disabled={isSubmitting}
                        className={`bg-primary text-white py-2 px-4 ml-2 rounded-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? "Booking..." : "Book Appointment"}
                    </button>
                    </div>
                </div>

                <br/>

            </div>
        )
    }
    else{
        return(
            <>
                <p className='font-bold text-center'>Please login to continue</p>
                <br/>
            </>
        )
    }
}

export default Appointment
