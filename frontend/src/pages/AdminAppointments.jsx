import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAppointments = () => {

const [appointments, setAppointments] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    fetch('http://localhost:8081/allAppointments')
        .then(res => res.json())
        .then(data => setAppointments(data))
        .catch(err => console.error(err));
}, []);

return (
    <div className="p-8">

        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
                All Appointments
            </h2>

            <button
                onClick={() => navigate('/manager')}
                style={{
                    backgroundColor: "teal",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "20px"
                }}
            >
                Back
            </button>
        </div>

        <div className="space-y-4">

            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (

                appointments.map((appointment) => (

                    <div
                        key={appointment.appointment_id}
                        className="border p-4 rounded shadow"
                    >

                        <p>
                            <strong>Appointment ID:</strong>{" "}
                            {appointment.appointment_id}
                        </p>

                        <p>
                            <strong>Patient:</strong>{" "}
                            {appointment.patient_first_name}{" "}
                            {appointment.patient_last_name}
                        </p>

                        <p>
                            <strong>Doctor:</strong>{" "}
                            {appointment.doctor_first_name}{" "}
                            {appointment.doctor_last_name}
                            ({appointment.specialization})
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(appointment.appointment_date).toLocaleDateString("en-IN")}
                        </p>

                        <p>
                            <strong>Time:</strong>{" "}
                            {new Date(`1970-01-01T${appointment.appointment_time}`).toLocaleTimeString("en-IN", {hour: "numeric",minute: "2-digit"})}
                            
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {appointment.status}
                        </p>

                    </div>

                ))

            )}

        </div>

    </div>
);

};

export default AdminAppointments;