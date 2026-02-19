
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [patientId, setPatientId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [token, setToken] = useState(false);

  // 🔹 Load values from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedPatientId = localStorage.getItem("patientId");
    const storedDoctorId = localStorage.getItem("doctorId");

    if (storedToken === "true") {
      setToken(true);
    }
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
    }
  }, []);

  // Keep localStorage in sync when state changes
  useEffect(() => {
  if (token) {
    localStorage.setItem("token", "true");
  } else {
    localStorage.removeItem("token");
  }

  if (patientId) {
    localStorage.setItem("patientId", patientId);
    localStorage.removeItem("doctorId"); // clear doctor if patient logs in
  } else {
    localStorage.removeItem("patientId");
  }

  if (doctorId) {
    localStorage.setItem("doctorId", doctorId);
    localStorage.removeItem("patientId"); // clear patient if doctor logs in
  } else {
    localStorage.removeItem("doctorId");
  }
}, [token, patientId, doctorId]);


  const value = {
    patientId,
    setPatientId,
    token,
    setToken,
    doctorId,
    setDoctorId,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
