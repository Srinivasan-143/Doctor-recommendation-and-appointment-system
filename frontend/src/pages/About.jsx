import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500 '>
                <p style={{color:'black'}}>ABOUT</p>
            </div>
            <div className='flex flex-col my-10 gap-12 text-justify'>
<div className='flex flex-col justify-center gap-6 w-full text-gray-600'>
                      <p>
                        The Symptoms-Based Doctor Recommendation and Appointment System is a web-based platform that helps patients to find suitable medical specialists based on their symptoms.
                         The system provides personalized doctor recommendations and enables easy appointment booking. 
                         The platform connects patients and doctors, simplifying the process of identifying the right specialist and managing appointments efficiently, thereby reducing the time and effort required to find and consult the suitable doctors.
                        </p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p><b>Symptom-Driven Doctor Recommendations: </b>Help patients to find the most suitable medical specialists based on their symptoms.
                    <br />
                    <b>Convenient Appointment Booking:</b> Simplify the process of scheduling appointments with recommended doctors.
                    <br />
                    <b>Make Healthcare Decisions Easier:</b>Enable patients in choosing doctors through ratings and reviews shared by others.
                    <br />
                    <b>Connect Patients and Doctors Efficiently:</b> A centralized platform that enables smooth interaction between patients and doctors.
                    <br />
                    </p>
                </div>
                
            </div>

            <div className='mt-10 border-t'>
    <h2 className='text-2xl text-center mb-6'>
        Contact
    </h2>

    <div className='text-center text-gray-600 space-y-2'>
        <p>
            <strong>Email:</strong> symptodoc@gmail.com
        </p>

        <p>
            <strong>Phone:</strong> +91 6369680825
        </p>

        <p>
            <strong>Address:</strong> Vellore, Tamil Nadu, India
        </p>
    </div>
</div>
        </div>
    )
}

export default About
