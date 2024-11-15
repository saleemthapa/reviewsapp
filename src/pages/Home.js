import React from 'react';
import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
import FoodItemCard from '../components/FoodItemCard';

const Home = () => {
  // Sample data for food items
  const foodItems = [
    { id: 1, itemName: 'Pasta Primavera', tasteScore: 4.6, valueScore: 4.2, appearanceScore: 4.8 },
    { id: 2, itemName: 'BBQ Ribs', tasteScore: 4.7, valueScore: 4.5, appearanceScore: 4.3 },
    // Add more items as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Top Food Items</h2>
        {foodItems.map((item) => (
          <FoodItemCard
            key={item.id}
            itemName={item.itemName}
            tasteScore={item.tasteScore}
            valueScore={item.valueScore}
            appearanceScore={item.appearanceScore}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
