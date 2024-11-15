import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import FoodItemCard from './components/FoodItemCard';
import { Search } from 'react-feather'; // Ensure you have a search icon component

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch top-rated restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/top-restaurants'); // Adjust the URL as needed
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  // Fetch top-rated food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/top-food-items'); // Adjust the URL as needed
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter food items based on search term
  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CircularBar = ({ score, size = 80, color = '#3e98c7' }) => {
    // Ensure score is a number
    const validScore = typeof score === 'number' ? score : 0; // Default to 0 if not a number
    const radius = (size / 2) - 10; // Adjust for stroke width
    const normalizedRadius = radius;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (validScore / 5) * circumference;

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
                {validScore.toFixed(1)} {/* Ensure validScore is used */}
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
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 ">
              <Search className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Restaurants</h2>
          <p className="text-gray-600 cursor-pointer hover:underline">View all Restaurants</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurant_id} // Use restaurant_id from the API response
              name={restaurant.name}
              averageRating={<CircularBar score={restaurant.average_rating} size={100} />} // Adjust size as needed
              address={restaurant.address} // Ensure your API returns this field
            />
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Rated Foods</h2>
          <p className="text-gray-600 cursor-pointer hover:underline">View all Food Items</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoodItems.map((item) => (
            <FoodItemCard
              key={item.item_id} // Use item_id from the API response
              itemName={item.name} // Ensure your API returns this field
              tasteScore={<CircularBar score={item.average_rating} size={80} color="#3e98c7" />} // Adjust as needed
              valueScore={<CircularBar score={item.valueScore} size={80} color="#ff7f32" />} // Adjust as needed
              appearanceScore={<CircularBar score={item.appearanceScore} size={80} color="#4caf50" />} // Adjust as needed
            />
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-xl font-bold text-white">Reviews by Menu</span>
            <div className="flex items-center space-x-4">
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