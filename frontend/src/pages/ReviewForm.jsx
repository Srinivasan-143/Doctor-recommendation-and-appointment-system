import React, { useState } from "react";

const ReviewForm = ({ appointmentId, patientId, doctorId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          patient_id: patientId,
          doctor_id: doctorId,
          rating,
          review_text: reviewText,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setMessage({ type: "error", text: data.error });
      } else {
        setMessage({ type: "success", text: "Review submitted successfully!" });
        setRating(0);
        setReviewText("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to submit review." });
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div style={{ marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: rating >= star ? "gold" : "gray",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your feedback..."
          rows="4"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "10px", color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
