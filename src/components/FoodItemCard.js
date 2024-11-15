// FoodItemCard.js
import React from 'react';

const FoodItemCard = ({ itemName, tasteScore, valueScore, appearanceScore }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{itemName}</h3>
      <div className="flex justify-center items-center mt-4">
        <div className="mx-2">{tasteScore}</div>
        <div className="mx-2">{valueScore}</div>
        <div className="mx-2">{appearanceScore}</div>
      </div>
      {/* Legend Section */}
      <div className="mt-4">
        <div className="flex mt-1">
          <div className="flex items-center mr-4">
            <span className="w-4 h-4 bg-[#3e98c7] rounded-full mr-1"></span> {/* Blue for taste score */}
            <span>Taste Score</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="w-4 h-4 bg-[#ff7f32] rounded-full mr-1"></span> {/* Orange for value score */}
            <span>Value Score</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-[#4caf50] rounded-full mr-1"></span> {/* Green for appearance score */}
            <span>Appearance Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;