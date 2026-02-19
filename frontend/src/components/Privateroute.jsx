import { Navigate } from 'react-router-dom';

const Privateroute = ({ children }) => {
  const patientid = localStorage.getItem('patientId');
  console.log(patientid)


  return patientid ? children : <Navigate to="/" replace />;
};
export default Privateroute;
