import React from 'react';
import Logo from '../images/1.jpg';
import Navbar from '../components/Navbar';

const HomePages = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-cover bg-center h-screen" style={backgroundImageStyle}>
      <Navbar/>
    </div>
  );
};

export default HomePages;