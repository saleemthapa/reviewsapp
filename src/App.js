import React from 'react';
import './App.css';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import FoodItemCard from './components/FoodItemCard';


import { Search } from 'react-feather'; // Ensure you have a search icon component


function App() {
  const restaurants = [
    { id: 1, name: 'The Food Place', averageRating: 4.5, address: 'Kathmandu, Nepal'},
    { id: 2, name: 'Dine Divine', averageRating: 4.7, address: 'Lalitpur, Nepal' },
    { id: 3, name: 'The Gardens', averageRating: 4.2, address: 'Lalitpur, Nepal' },
  ];

  const foodItems = [
    { id: 1, itemName: 'Pasta Primavera', tasteScore: 4.6, valueScore: 4.2, appearanceScore: 4.8 },
    { id: 2, itemName: 'BBQ Ribs', tasteScore: 4.7, valueScore: 4.5, appearanceScore: 4.3 },
    { id: 3, itemName: 'Spicy Wings', tasteScore: 4.2, valueScore: 4.5, appearanceScore: 4.9 },
    

  ];

  const CircularBar = ({ score, size = 80, color = '#3e98c7' }) => {
    const radius = (size / 2) - 10; // Adjust for stroke width
    const normalizedRadius = radius;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (score / 5) * circumference;

    return (
      <svg height={size} width={size}>
        <circle
          stroke="#d6d6d6"
          fill="transparent"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth="10"
        />
        <circle
          className="CircularProgressbar-path"
          stroke={color}
          fill="transparent"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth="5"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease 0s',
          }}
        />
        <text x="50%" y="50%" textAnchor="middle" fill="#4a4a4a" fontSize="16" dy=".3em">
          {score.toFixed(1)}
        </text>
      </svg>
    );
  };

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-6 pt-20 pb-24 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12">
        What are you craving for?
      </h1>
      <div className="max-w-3xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for restaurants or dishes..."
          className="w-full px-6 py-4 rounded-full bg-white shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 ">
          <Search className="h-6 w-6 text-gray-400" />
        </button>
      </div>
    </div>

    <div className="flex justify-between items-center mb-4"> <h2 className="text-2xl font-bold">Top Restaurants</h2>
  <p className="text-gray-600 cursor-pointer hover:underline">View all Restaurants</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                averageRating={<CircularBar score={restaurant.averageRating} size={100} />} // Adjust size as needed
                address={restaurant.address}
              />
            ))}
          </div>
      <div className="flex justify-between items-center mb-4"> 
        <h2 className="text-2xl font-bold">Top Rated Foods</h2>
        <p className="text-gray-600 cursor-pointer hover:underline">View all FoodItems</p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems.map((item) => (
            <FoodItemCard
              key={item.id}
              itemName={item.itemName}
              tasteScore={<CircularBar score={item.tasteScore} size={80} color="#3e98c7" />} // Blue for tasteScore
              valueScore={<CircularBar score={item.valueScore} size={80} color="#ff7f32" />} // Orange for valueScore
              appearanceScore={<CircularBar score={item.appearanceScore} size={80} color="#4caf50" />} // Green for appearanceScore
            />
          ))}
          
        </div>
        
      </div>
      <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl font-bold text-white">Reviews by Menu</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" className="hover:text-white transition-colors">
            </a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} Reviews by Menu. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
    
  );
}

export default App;