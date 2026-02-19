import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
const { patientId, doctorId, token, setToken, setPatientId, setDoctorId } = useContext(AppContext);
const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <div className="navbar">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="logo-img"
        src={assets.fullLogo}
        alt="logo"
      />

      {/* Desktop Nav */}
      <ul className="nav-links"> 
        <NavLink to="/"><li>HOME</li></NavLink> 

        {!doctorId && (
                <NavLink to={patientId && !doctorId ?"/diagnose" : "/login"}><li>FIND DISEASE</li></NavLink>
        )}

        {!doctorId && (
                  <NavLink to={patientId ? "/doctors" : "/login"}><li>ALL DOCTORS</li></NavLink>
        )}

        
        {/*<NavLink to={patientId && !doctorId ? "/doctors" : "/login"}><li>ALL DOCTORS</li></NavLink>*/}
        <NavLink to="/about"><li>ABOUT</li></NavLink>
        <NavLink to="/manager"><li>ADMIN</li></NavLink>      
   
      {!doctorId && <NavLink to="/doctorlogin"><li>DOCTOR LOGIN</li></NavLink>} 
      </ul>

      {/* Profile / Login */}
      <div className="profile-section">
        {token && patientId ? (
          <div className="profile-dropdown">
            <img className="profile-img" src={assets.profile} alt="" />
            <img className="dropdown-icon" src={assets.dropdown} alt="" />
            <div className="dropdown-menu">
              <p onClick={() => navigate("/my-profile")}>My Profile</p>
              <p onClick={() => navigate("/my-appointments")}>My Appointment</p>
              <p
                onClick={() => {
                  setPatientId(null); 
                  setDoctorId(null);
                  setToken(false); 

                  localStorage.removeItem("patientId"); 
                  localStorage.removeItem("doctorId");
                  localStorage.removeItem("token");
                  localStorage.removeItem("admin");

                  navigate("/");
                }}
              >
                Logout
              </p>

            </div>
            
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="create-account-btn"
          >
            LOGIN
          </button>
        )}
      </div>

      
      {/* Profile / doctor */}
      <div className="profile-section">
        {token && doctorId && (
          <div className="profile-dropdown">
            <img className="profile-img" src={assets.profile} alt="" />
            <img className="dropdown-icon" src={assets.dropdown} alt="" />
            <div className="dropdown-menu">
              <p onClick={() => navigate(`/doctorprofile/${doctorId}`)}>My Profile</p>
              <p onClick={() => navigate(`/doctorlogin/${doctorId}`)}>My Appointment</p>
              <p
                onClick={() => {
                  setPatientId(null); 
                  setDoctorId(null);
                  setToken(false); 

                  localStorage.removeItem("patientId"); 
                  localStorage.removeItem("doctorId");
                  localStorage.removeItem("token");
                  localStorage.removeItem("admin");
                  navigate("/");
                }}
              >
                Logout
              </p>

            </div>
            
          </div>
        )}
      </div>




        {/* Hamburger Menu Icon (mobile only) */}
      <div className="menu-icon" onClick={handleMenu} style={{paddingLeft:"10px"}}>
        <img src={assets.menuicon} alt="Menu_icon" className="menu-img" />
      </div>

        {/* Mobile Nav */}
        <div className={`mobile-nav-links ${isMenuOpen ? "open" : ""}`}>
          <div className="cross-icon" style={{backgroundColor:"black", borderRadius:"20px"}}>
            <img src={assets.crossicon} alt="Close" className="close-btn" onClick={handleMenu} />
          </div>

          <NavLink to="/" onClick={handleMenu}>HOME</NavLink> 

        {!doctorId && (
                <NavLink to={patientId && !doctorId ?"/diagnose" : "/login"} onClick={handleMenu}>FIND DISEASE</NavLink>
        )}

        {!doctorId && (
                  <NavLink to={patientId ? "/doctors" : "/login"} onClick={handleMenu}>ALL DOCTORS</NavLink>
        )}

        
        {/*<NavLink to={patientId && !doctorId ? "/doctors" : "/login"}><li>ALL DOCTORS</li></NavLink>*/}
        <NavLink to="/about" onClick={handleMenu}>ABOUT</NavLink>
        <NavLink to="/manager" onClick={handleMenu}>ADMIN</NavLink>      
   
      {!doctorId && <NavLink to="/doctorlogin" onClick={handleMenu}>DOCTOR LOGIN</NavLink>}
          {/* 🔹 Add Logout here */}
          {token && (
            <p
              onClick={() => {
                setPatientId(null);
                setDoctorId(null);
                setToken(false);

                localStorage.removeItem("patientId");
                localStorage.removeItem("doctorId");
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                handleMenu(); // close menu
                navigate("/");
              }}
              style={{cursor: "pointer", color: "red", marginTop: "10px"}}
            >
              Logout
            </p>
          )}
        </div>

    </div>
  );
};

export default Navbar;
