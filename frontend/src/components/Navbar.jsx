import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./navbar.css";

const Navbar = () => {
      const navigate = useNavigate();
      const { patientId, doctorId, token, setToken, setPatientId, setDoctorId } = useContext(AppContext);
      //desktop view
      const [showMenu, setShowMenu] = useState(false);
      //mobile view
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
      {/* Logo 
      <img
        onClick={() => navigate("/")}
        className="logo-img"
        src={assets.fullLogo}
        alt="logo"
        style={{height:'50px', width:"auto"}}
      />
     */}
      <p style={{color:"black", padding:'5px', borderRadius:'10px', fontWeight:'bold',textDecoration:"none",border:'1px solid black'}}>SymptoDoc</p>
      {/* Desktop Nav */}
      <ul className="nav-links"> 
        <NavLink to="/"><li>Home</li></NavLink> 

        {!doctorId && (
                <NavLink to={patientId && !doctorId ?"/diagnose" : "/login"}><li>Find Disease & Specialist</li></NavLink>
        )}

        {!doctorId && (
                  <NavLink to={patientId ? "/doctors" : "/login"}><li>All Doctors</li></NavLink>
        )}

        <NavLink to="/about"><li>About</li></NavLink>
        <NavLink to="/manager"><li>Admin</li></NavLink>      
   
      {!doctorId && <NavLink to="/doctorlogin"><li>Doctor Login</li></NavLink>} 
      </ul>

      {/* Profile / Login */}
      <div className="profile-section">
        {token && patientId ? (
          <div className="profile-dropdown">
            <img className="profile-img" src={assets.userImage1} alt="" onClick={() => setShowMenu(!showMenu)}/>
            <img className="dropdown-icon" src={assets.dropdown} alt="" onClick={() => setShowMenu(!showMenu)}/>
             {showMenu && (
              <div className="dropdown-menu">
              <p onClick={() => {navigate("/my-profile");setShowMenu(!showMenu);}}>My Profile</p>
              <p onClick={() => {navigate("/my-appointments");setShowMenu(!showMenu);}}>My Appointment</p>
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
                  setShowMenu(!showMenu);
                }}
              >
                Logout
              </p>
              <p style={{display:'flex',justifyContent:'center'}}>
            <img src={assets.crossicon} className="close-btn" onClick={() => setShowMenu(!showMenu)} style={{backgroundColor:'black',borderRadius:'20px'}}/>
</p>
            </div>
            )}
          </div>
        ) : !doctorId ? (
  <button
    onClick={() => navigate("/login")}
    className="create-account-btn"
  >
    LOGIN
  </button>
) : null}
      </div>

      
      {/* Profile / doctor */}
      <div className="profile-section">
        {token && doctorId && (
          <div className="profile-dropdown">
            <img className="profile-img" src={assets.userImage1} alt="" onClick={() => setShowMenu(!showMenu)}/>
            <img className="dropdown-icon" src={assets.dropdown} alt="" onClick={() => setShowMenu(!showMenu)}/>
             {showMenu && (
              <div className="dropdown-menu">
              <p onClick={() => {navigate(`/doctorprofile/${doctorId}`);setShowMenu(!showMenu);}}>My Profile</p>
              <p onClick={() => {navigate(`/doctorlogin/${doctorId}`);setShowMenu(!showMenu);}}>My Appointment</p>
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
                  setShowMenu(!showMenu);
                }}
              >
                Logout
              </p>
              <p style={{display:'flex',justifyContent:'center'}}>
            <img src={assets.crossicon} className="close-btn" onClick={() => setShowMenu(!showMenu)} style={{backgroundColor:'black',borderRadius:'20px'}}/>
             </p>
            </div>
            )}
          </div>
        )}
      </div>

        {/* Menu Icon (mobile view) */}
      <div className="menu-icon" onClick={handleMenu} style={{paddingLeft:"10px" ,backgroundColor:''}}>
        <img src={assets.menuicon} alt="Menu_icon" className="menu-img" style={{backgroundColor:'', height:'20px'}} />
      </div>

        {/* Mobile Nav */}
        <div className={`mobile-nav-links ${isMenuOpen ? "open" : ""}`}>
          <div className="cross-icon" style={{backgroundColor:"black", borderRadius:"20px"}}>
            <img src={assets.crossicon} alt="Close" className="close-btn" onClick={handleMenu} />
          </div>

          <NavLink to="/" onClick={handleMenu}>Home</NavLink> 

        {!doctorId && (
                <NavLink to={patientId && !doctorId ?"/diagnose" : "/login"} onClick={handleMenu}>Find Disease & Specialist</NavLink>
        )}

        {!doctorId && (
                  <NavLink to={patientId ? "/doctors" : "/login"} onClick={handleMenu}>All Doctors</NavLink>
        )}

        <NavLink to="/about" onClick={handleMenu}>About</NavLink>
        <NavLink to="/manager" onClick={handleMenu}>Admin</NavLink>      
   
      {!doctorId && <NavLink to="/doctorlogin" onClick={handleMenu}>Doctor Login</NavLink>}
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
