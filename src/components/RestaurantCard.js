// RestaurantCard.js
import React from 'react';

const RestaurantCard = ({ name, averageRating,address }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h1 className="text-xl font-bold ">{name}</h1>
      <div className="flex justify-center items-center mt-4"> {/* Flex container for centering */}
        {averageRating} {/* This will be the CircularBar component */}
      </div>
      <h2 className="text-xl font-semibold">{address}</h2>
    </div>
  );
};

export default RestaurantCard;