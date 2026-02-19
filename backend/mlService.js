const axios = require("axios");

async function getPrediction(symptoms) {
  try {
    const res = await axios.post("http://localhost:1000/predict", symptoms);
    return res.data; // { predicted_disease, specialist }
  } catch (err) {
    console.error("Error calling ML API:", err.message);
    throw err;
  }
}

module.exports = { getPrediction };
