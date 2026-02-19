import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const SpecialityMenu = () => {

    const navigate = useNavigate();
    const patientid = localStorage.getItem('patientId');

    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
            <h1 className='text-3xl font-medium'>Find by Speciality </h1>
            <p className='w-1/3 text-center text-sm'>Browse throught our extensive list of trusted doctors and<br/>book your appointment hassle-free</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={0} to={patientid ? '/doctors/general-physician' : '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.general_physician} alt=""/>
                    <p>General Physician</p>
                </Link>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={1} to={ patientid ? '/doctors/gynecologist' : '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.gynecologist} alt=""/>
                    <p>Gynecologist</p>
                </Link>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={2} to={  patientid ?'/doctors/dermatologist': '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.dermatologist} alt=""/>
                    <p>Dermatologist</p>
                </Link>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={3} to={  patientid ?'/doctors/neurologist': '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.neurologist} alt=""/>
                    <p>Neurologist</p>
                </Link>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={4} to={ patientid ?'/doctors/gastroenterologist': '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.gastroenterologist} alt=""/>
                    <p>Gastroenterologist</p>
                </Link>
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={5} to={ patientid ?'/doctors/pediatricians': '/login'}>
                    <img className='w-25 h-30 sm:w-24 mb-2' src={assets.pediatrician} alt=""/>
                    <p>Pediatrician</p>
                </Link>
            </div>
            <button onClick={()=>{
                 navigate( patientid ? '/doctors' : '/login');
                 scrollTo(0, 0)}} 
                 className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>or, check all doctors</button>
            <br/>
            <img className='rounded-2xl' src={assets.home2} alt=''/>
        </div>
    )
}

export default SpecialityMenu
