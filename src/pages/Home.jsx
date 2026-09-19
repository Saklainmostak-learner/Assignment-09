import React from 'react';

const Home = () => {
    const projectName= "PlayGrid"
    return (
         <main className="welcome-screen">
      <span className="webbrow"> MERN STACK PROJECT</span>

      <h1>{projectName}</h1>
      <p className="welcome-text">Sports Facility Booking Management System</p>
      <button className="primary-button">Explore Facilities</button>
    </main>
    );
};

export default Home;