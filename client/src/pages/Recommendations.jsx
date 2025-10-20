import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Recommendations() {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/recommendations/${id}`)
      .then((res) => res.json())
      .then(setRecommendations);
  }, [id]);

  return (
    <div>
      <h3>AI Sustainability Recommendations</h3>
      <ul>
        {recommendations.map((r, index) => (
          <li key={index}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
