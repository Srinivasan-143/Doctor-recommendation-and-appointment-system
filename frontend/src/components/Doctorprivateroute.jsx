import { Navigate } from 'react-router-dom';

const Doctorprivateroute = ({ children }) => {
  const docid = localStorage.getItem('doctorId');
  console.log(docid)


  return docid == null ? children : <Navigate to={`/doctorlogin/${docid}`} replace />;
};
export default Doctorprivateroute;;
