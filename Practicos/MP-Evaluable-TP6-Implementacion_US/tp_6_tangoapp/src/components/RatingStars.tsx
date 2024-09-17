import React from "react";

interface IRatingStars {
  rating: number;
}

const RatingStars = ({ rating }: IRatingStars) => {
  const stars = [];
  const filled = Math.floor(rating);
  const fraction = rating - filled;

  for (let i = 0; i < filled; i++) {
    stars.push(
      <span key={i} className="text-yellow-400 text-2xl md:text-4xl">
        ★
      </span>
    );
  }

  if (fraction > 0 && filled < 5) {
    stars.push(
      <span
        key={filled}
        style={{ position: "relative", display: "inline-block" }}
      >
        <span className="text-gray-400 text-2xl md:text-4xl">★</span>
        <span
          className="text-yellow-400 text-2xl md:text-4xl"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${fraction * 100}%`,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          ★
        </span>
      </span>
    );
  }

  while (stars.length < 5) {
    stars.push(
      <span key={stars.length} className="text-gray-400 text-2xl md:text-4xl">
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default RatingStars;
