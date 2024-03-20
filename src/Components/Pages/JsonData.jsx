import React, { useState, useEffect } from 'react';
import './JsonData.css';
import { FcSearch } from "react-icons/fc";
import Sidebar from '../Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import config from '../Login/config';

const JsonData = () => {
  const [data, setData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryCounts, setCategoryCounts] = useState({});
  
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.Api);
        const result = await response.json();
        setData(result.entries);
        updateCategoryCounts(result.entries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Update category counts
  const updateCategoryCounts = (entries) => {
    const counts = entries.reduce((acc, entry) => {
      acc[entry.Category] = (acc[entry.Category] || 0) + 1;
      return acc;
    }, {});
    setCategoryCounts(counts);
  };

  // Update filtered categories based on search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = [...new Set(data.map(entry => entry.Category))].filter(category =>
      category.toLowerCase().startsWith(query)
    );
    setFilteredCategories(filtered);
  };

  // Update selected category and navigate to CategoryPage
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      history.push('/DisplayCategory'); 
    }, 1500);
    localStorage.setItem('selectedCategory', category);
  };

  return (
    <Sidebar>
      <div>
        <section>
          <div className='displaydata'>
            <h1>Total Records: {data.length}</h1>
            <div className='search-box'>
              <input
                type="text"
                placeholder="Search Category"
                onChange={handleSearch}
                className="search-input"
              />
              <div className="search-icon">
                <span><FcSearch/></span> {/* Search icon */}
              </div>
            </div>
            <div className='displayj'>
              {filteredCategories.map(category => (
                <h2 key={category} onClick={() => handleCategoryClick(category)}>
                  {category} ({categoryCounts[category]})
                </h2>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Sidebar>
  );
}

export default JsonData;

