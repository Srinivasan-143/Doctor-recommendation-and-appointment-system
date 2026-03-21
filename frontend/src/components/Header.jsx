import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'

const Header = () => {
      const patientid = localStorage.getItem('patientId');
      
    return (
        <div>
<div 
  className="relative flex justify-center w-full"
  style={{ height: "auto" }}
>
  {/* Background Image */}
  <img 
    className="rounded-xl h-auto w-full md:h-[500px]" 
    src={assets.banner4} 
    alt=""
  />

  {/* Text Overlay */}
<div className="absolute bottom-0 left-0 text-white flex flex-col" style={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%", padding: "5px", borderRadius: "0px 20px 0px 20px" }} >   
     <h3 className="text-white text-l md:text-4xl font-bold" >
      <p>Symptoms-Based Doctor Recommendation & Appointment System </p>
    </h3>
    {/*<p>"Smart symptom analysis, your disease insights, our guidance, the right specialist."</p>*/}
    <p>"Your symptoms, our guidance, the right specialist."</p>  
    </div>
</div>


            <br></br>
{/*-----------------Symptoms-confusion-----------------*/}
            <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20' style={{alignItems:'center', justifyContent:'center'}}>
                {/*-----------------Left side-----------------*/}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                    <p className='text-2xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight ld-leading-tight'>
                        "Confused to Choose Right Specialist for your symptoms ??...."
                    </p>
                    <div className='flex flex-col md:flex-row item-center gap-3 text-white text-sm font-light'>
                        <img className='w-10' src={assets.docProfile}/>
                        <p>Find the right specialist by providing your symptoms.<br className='hidden sm:block'/></p>
                    </div>
                    
                    <Link to={ patientid ? '/diagnose' : '/login'}>
                    <p href='#speciality' className='flex items-center gap-2 bg-white px-8 py-4 rounded-full text-gray-600 text-sm Im-auto md:m-0 hover:scale-105 transition-all duration-300'>
                        Find possible disease <img className='w-3' src={assets.arrow}/>
                    </p>
                    </Link>
                </div>

                
                {/*-----------------Right side-----------------*/}
                <div className='md:w-1/2 ' style={{display:'flex', justifyContent:"center", alignItems:'end'}}>
                    <img className='w-full bottom-0 h-auto rounded-lg' src={assets.symptomps}/>
                </div>
            </div>


            <br></br>
            
            <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
                {/*-----------------Left side-----------------*/}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                    <p className='text-2xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight ld-leading-tight'>
                        {/* "Healing is a matter of time, but   it is sometimes also a matter of opportunity"*/}
                        "Consult Highly Recommended Doctor...!!"
                    </p>
                    <div className='flex flex-col md:flex-row item-center gap-3 text-white text-sm font-light'>
                        <img className='w-10' src={assets.docProfile}/>
                        {/*<p>We are dedicated to providing you with the best care through our team of<br className='hidden sm:block'/> highly skilled and compassionate doctors</p>*/}
                        <p>Our mission is to deliver the best care through a team of experienced, skilled, and compassionate doctors.</p>
                    </div>
                    <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-4 rounded-full text-gray-600 text-sm Im-auto md:m-0 hover:scale-105 transition-all duration-300'>
                        Book Appointment <img className='w-3' src={assets.arrow}/>
                    </a>
                </div>

                
                {/*-----------------Right side-----------------*/}
                <div className='md:w-1/2 relative'>
                    <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.doctors}/>
                </div>
            </div>
        </div>
    )
}

export default Header
