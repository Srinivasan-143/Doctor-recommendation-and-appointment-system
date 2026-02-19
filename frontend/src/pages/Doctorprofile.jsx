import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Doctorprofile = () => {

    const [data, setData] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const {doctorId} = useContext(AppContext)
    /*useEffect( () => {
        fetch(`http://localhost:8081/doctorProfile/${doctorId}`)
        .then(res => res.json())
        .then (data => setData(data[0]))
        .then(loaded => setLoaded(true))
        .catch(err => console.log(err))
    }, []) */

    useEffect(() => {
        fetch(`http://localhost:8081/doctorProfile/${doctorId}`)
          .then(res => res.json())
          .then(result => {
            if (result.length > 0) {
              setData(result[0]);
              setLoaded(true);
            }
          })
          .catch(err => console.log(err));
      }, [doctorId]);
    
      if (!loaded || !data) {
        return <p>Loading profile...</p>;
      }
    

    return loaded && (
        <div>
            <div style={{display:"flex", flexDirection:"row-reverse"}}>
            <Link to={`/DoctorUpdate/${data.doctor_id}`} style={{backgroundColor:"teal", borderRadius:"20px", color:"white", padding:"10px"}} >Edit Profile</Link>
            </div>
        <div className='max-w-lg flex flex-col gap-2 text-xl'>
            
            {/*<img className='w-64 rounded-md' src={assets[`doc${doctorId}`]}
                                            alt="doctorimage" /> */}
            <img
            className="w-64 rounded-md"
            src={
                data.profile_photo
                ? `http://localhost:8081/${data.profile_photo}`
                : '/default-doctor.png'
            }
            alt="Doctor"
            />
            {/*<img
            src={`http://localhost:8081/uploads/doctors/${data.profile_photo}`}
            alt="Doctor"
            /> */}


            <div>
                <p className='text-neutral-500 underline mt-3'>Doctor INFORMATION</p>
                <div className='grid grid-cols-2 gap-x-4 mt-3 text-neutral-700'>
                    <p className='font-medium'>Doctor ID:</p>
                    <p>{data.doctor_id}</p>

                    <p className='font-medium'>Full Name:</p>
                    <p>{data.first_name} {data.last_name}</p>

                    <p className='font-medium'>specialization :</p>
                    <p>{data.specialization }</p>

                    <p className='font-medium'>Available days :</p>
                    <p>{data.available_days}</p>

                    <p className='font-medium'>Available from :</p>
                    <p>{data.available_from}</p>

                    <p className='font-medium'>Available to :</p>
                    <p>{data.available_to}</p>

                    <p className='font-medium'>Phone number:</p>
                    <p className='text-blue-500'>{data.phone_number}</p>

                    <p className='font-medium'>Email ID:</p>
                    <p className='text-blue-500'>{data.email}</p>

                    <p className='font-medium'>Experience :</p>
                    <p>{data.years_of_experience }</p>
                </div>
            </div>
             </div>
        </div>
    )
}

export default Doctorprofile;
