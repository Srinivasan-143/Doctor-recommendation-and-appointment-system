import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div>
            
            <div className='text-center text-2xl pt-10 text-gray-500 '>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>

            <div className='flex flex-col my-10 md:flex-row gap-12'>
                <img className='w-full md:max-w-[360-px]' src={assets.about} alt=''/>
                <div className='flex flex-col justify-center gap-6 md:w-3/4 text-sm text-gray-600'>
                    <p>The Symptoms-Based Doctor Recommendation and Appointment System is an innovative centralized platform that leverages machine learning to recommend doctors by finding the possible disease based on patient-provided symptoms and streamline appointment scheduling with specialists. It is designed with a special focus on recommending top doctors by rating and review by the patients, Overall it reduces time complexity of finding the right specialist and appointments flow</p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p><b>Symptom-Driven Recommendations: </b>Patients input their symptoms, and the system intelligently detects possible disease and suggests suitable specialists.
                    <br />
<b>Seamless Appointment Booking:</b> Integrated scheduling with suggested specialists.
<br />
<b>Role-based access control :</b>provides Role based control for patients,doctors and admin.
<br />
<b>Inclusive Design:</b> Simple, user-friendly interface tailored for first-time digital healthcare users.
<br />
<b>Scalable Architecture:</b> Built to expand across regions and handle growing patient-doctor networks efficiently.</p>
                </div>
            </div>

        </div>
    )
}

export default About
