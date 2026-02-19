import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './pages/Manager'
import { Route, Routes } from 'react-router-dom'
import DoctorLogin from './pages/Doctorlogin'
import Doctorappointments from './pages/Doctorappointments'
import DiagnoseComponent from './pages/DiagnoseComponent'
import Privateroute from './components/Privateroute'
import ReviewForm from './pages/ReviewForm'
import Doctorprofile from './pages/Doctorprofile'
import Doctorprivateroute from './components/Doctorprivateroute'
import Doctorsignup from './pages/Doctorsignup'

import ProfileUpdate from './pages/ProfileUpdate'
import DoctorUpdate from './pages/DoctorUpdate'

const App = () => {
    const docval = localStorage.getItem("doctorId");
    return (
        <div className='mx-4 sm:mx-[10%]'>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/doctors' element={
                   <Privateroute> 
                    <Doctors/>
                    </Privateroute>} />
                <Route path='/doctors/:speciality' element={<Privateroute>
                    <Doctors/>
                    </Privateroute>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/my-profile' element={<Privateroute>
                    <MyProfile/>
                    </Privateroute>} />
                <Route path='/my-appointments' element={<Privateroute>
                    <MyAppointments/>
                    </Privateroute>} />
                <Route path='/appointment/:docId' element={<Privateroute>
                    <Appointment/>
                    </Privateroute>} />
                <Route path='/manager' element={<Manager/>} />

                <Route path='/doctorlogin' element={
                    <Doctorprivateroute>
                    <DoctorLogin/>
                    </Doctorprivateroute>

                    } />
                <Route path='/doctorsignup' element={
                <Doctorsignup/>
                } />

                <Route path='/doctorlogin/:id' element={
                    <Doctorappointments/>
                    } />
                <Route path='/diagnose' element={<Privateroute>
                    <DiagnoseComponent/>
                    </Privateroute>} />
            <Route path='/review' element={<Privateroute>
                    <ReviewForm appointmentId={1} patientId={1} doctorId={2} />

                    </Privateroute>} />
                    <Route path='/doctorprofile/:id' element={
                    <Doctorprofile/>
                    } />
                    <Route path='/ProfileUpdate/:id' element={ <Privateroute>
                    <ProfileUpdate/>
                    </Privateroute>
                    } />

                    <Route path='/DoctorUpdate/:id' element={ 
                    <DoctorUpdate/>
                  
                    } />
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
