import React from 'react';

const RatingDistribution = () => {
  // Sample data for ratings
  const ratingsData = {
    '1.0': 5,
    '1.5': 10,
    '2.0': 15,
    '2.5': 20,
    '3.0': 25,
    '3.5': 10,
    '4.0': 10,
    '4.5': 3,
    '5.0': 2,
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Rating Distribution</h2>
      <div className="space-y-2">
        {Object.entries(ratingsData).map(([rating, count]) => (
          <div key={rating} className="flex items-center">
            <span className="w-10 text-center">{rating}</span>
            <div className="flex-grow bg-gray-200 rounded-full h-4 relative">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${(count / 100) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;