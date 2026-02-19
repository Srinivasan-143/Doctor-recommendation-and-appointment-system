
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../context/AppContext";


function DoctorLogin() {
const [doctorIdInput, setDoctorIdInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  //const patienid = localStorage.getItem('patientId');
  const { setDoctorId, setToken, setPatientId } = useContext(AppContext);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8081/loginDoctor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId : doctorIdInput, password })
    });
    const data = await res.json();

    if (data.success) {
  alert("Login successful!");
  setDoctorId(doctorIdInput); // update context 
  setToken(true); // update context
  setPatientId(null);
  {/*localStorage.setItem("doctorId", doctorId);
  localStorage.setItem("token", "true");
  localStorage.removeItem("patientId"); */}
  // clear patient if doctor logs in
  navigate(`/doctorlogin/${doctorIdInput}`);
} else {
  alert("Invalid credentials");
}

  };
  const handlesignup = ()=>{
    navigate('/doctorsignup');
  }

  return (
    <div>
      <h2>Doctor Login</h2>
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorIdInput}
        onChange={(e) => setDoctorIdInput(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <button onClick={handlesignup}>Signup as Doctor</button>

    </div>
  );
}

export default DoctorLogin;
