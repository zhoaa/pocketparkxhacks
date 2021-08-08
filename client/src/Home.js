import React from 'react';
import {
  Link
} from "react-router-dom";

const Home = () => {
  return (
    <div className="background">
      <div>
          <h1 className="title">POCKET PARK</h1>
          <button type="button" className="startButton">
            <Link to="/onboarding1">START</Link>
          </button>
      </div>
    </div>

  );
};

export default Home;
