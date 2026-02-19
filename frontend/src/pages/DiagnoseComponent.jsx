import React, { useState } from "react";
import {Link} from 'react-router-dom'
const DiagnoseComponent = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  // Full symptom list (exactly as you provided, typos included)
  const symptomsList = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing",
    "shivering", "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue",
    "muscle_wasting", "vomiting", "burning_micturition", "spotting_ urination", "fatigue",
    "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss",
    "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough",
    "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration",
    "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite",
    "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
    "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
    "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation",
    "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs",
    "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
    "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising", "obesity", "swollen_legs",
    "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
    "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech",
    "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness",
    "spinning_movements", "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell",
    "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching",
    "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium",
    "red_spots_over_body", "belly_pain", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes",
    "increased_appetite", "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration",
    "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma",
    "stomach_bleeding", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload.1",
    "blood_in_sputum", "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples",
    "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails",
    "blister", "red_sore_around_nose", "yellow_crust_ooze"
  ];

  // Toggle symptom selection
  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Submit selected symptoms to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

// Check if no symptoms are selected
    if (selectedSymptoms.length === 0) { 
      setResult({ error: "Please select symptoms for prediction." });
      return;
     }

    try {
      const response = await fetch("http://localhost:8081/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setResult({ error: "Prediction failed. Please try again." });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial",position:"relative",alignItems:"center"}}>
        
      <h1 style={{
            fontSize:"30px",
            padding: "20px",
            backgroundColor: "teal",
            color: "white",
            fontWeight : "bold",
            textAlign : "center",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>Find Your Possible Disease and Specialist</h1>
          <br />
          <p style={{padding: " 10px", backgroundColor: "black",borderRadius:"20px",textAlign:"center",color:"white"}}
          >Select symptoms that you are Experiencing : </p>
          <br />
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {symptomsList.map((symptom) => (
            <label key={symptom} style={{ width: "250px",padding: " 10px", backgroundColor: selectedSymptoms.includes(symptom) ? "teal" : "white"}}>
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleCheckboxChange(symptom)}
              />
              {symptom}
            </label>
          ))}
        </div>
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Diagnose
        </button>
      </form>

      {result && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent overlay
      backdropFilter: "blur(5px)",        // blur background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,                       // ensure it’s on top
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px hsla(0, 0%, 0%, 0.30)",
        textAlign: "center",
        width: "400px",
      }}
    >
      <h3>🔍 Prediction Result</h3>
      {result.error ? (
        <p style={{ color: "red" }}>{result.error}</p>
      ) : (
        <>
        <p>------------------------</p>
                
          <p style={{ color: "white", backgroundColor:"black", borderRadius:"10px" }}>Disease: <strong>{result.predicted_disease}</strong></p>
          <br />
          <p style={{ color: "white", backgroundColor:"black", borderRadius:"10px" }}>Recommended Specialist: <strong>{result.specialist}</strong></p>
          <br />
          <p><strong>Test Accuracy:</strong> {(result.test_accuracy * 100).toFixed(2)}%</p>
          <p><strong>Validation Accuracy:</strong> {(result.validation_accuracy * 100).toFixed(2)}%</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          <p><strong>Model Used:</strong> {result.model_used}</p>

          <p>
            
            <Link to={`/doctors/${result.specialist}`}>
            <div style={{backgroundColor:"orange",
              padding:"20px",
              borderRadius:"20px",
              border:"3px solid red"
            }}>
              Book Appointment with 
              <br />
              <strong>Top {result.specialist}</strong>
            </div>

            
            </Link>
          </p>
        </>

      )}
      <button
        onClick={() => setResult(null)} // close modal
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "teal",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default DiagnoseComponent;
