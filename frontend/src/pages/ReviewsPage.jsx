import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewsPage = () => {
    const { doctorId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/reviews/${doctorId}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.log(err));
    }, [doctorId]);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold">
                Doctor Reviews
            </h2>

            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review.review_id}
                        style={{
                            border: "1px solid #d1d5db",
                            padding: "16px",
                            borderRadius: "8px",
                            marginBottom: "16px"
                        }}                        
                    >
                        <p className="text-yellow-600">
                           Ratings: {review.rating} &#9733;
                        </p>

                        <p>{review.review_text}</p>

                        <p className="text-gray-500 text-xm mt-2">
                            {review.first_name} {review.last_name}
                        </p>
                        <p className="text-gray-400 text-xm">
                        {new Date(review.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewsPage;