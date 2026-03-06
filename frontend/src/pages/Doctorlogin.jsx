
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
      body: JSON.stringify({ email : doctorIdInput, password })
    });
    const data = await res.json();

    if (data.success) {
  alert("Login successful!");
  setDoctorId(data.doctorId); // update context 
  setToken(true); // update context
  setPatientId(null);
  {/*localStorage.setItem("doctorId", doctorId);
  localStorage.setItem("token", "true");
  localStorage.removeItem("patientId"); */}
  // clear patient if doctor logs in
  navigate(`/doctorlogin/${data.doctorId}`);
} else {
  alert("Invalid credentials");
}

  };
  const handlesignup = ()=>{
    navigate('/doctorsignup');
  }

  return (
    <div className="p-8 space-y-8">
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <h2 className="text-xl font-bold mb-4">Doctor Login</h2>
            <button onClick={handlesignup} className="bg-primary text-white p-2 rounded" >Signup as Doctor</button>
            </div>
      <div  className="space-y-4">
        <p>Doctor Email ID :</p>
      <input
        type="email"
        placeholder="Enter your Email ID"
        value={doctorIdInput}
        onChange={(e) => setDoctorIdInput(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <p>Password :</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button onClick={handleLogin} className="bg-primary text-white p-2 rounded" >Login</button>
      <p>{message}</p>
</div>
    </div>
  );
}

export default DoctorLogin;
