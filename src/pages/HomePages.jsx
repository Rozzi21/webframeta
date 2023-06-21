import React from 'react';
import Navbar from '../components/Navbar';
import Logo from '../images/1.jpg';

const HomePages = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-cover bg-center h-screen" style={backgroundImageStyle}>
      
    </div>
  );
};

export default HomePages;