import React from 'react';
import '../style/JumbotronStyle.css';
import jumbotronImage from '../assets/jumbotron.jpg';

const Jumbotron = () => {
  return (
    <div className="jumbotron-container">
      <img
        src={jumbotronImage}
        alt="Jumbotron promozionale"
        className="jumbotron-image"
      />
      <div className="jumbotron-text">
        <h1>Benvenuto nello store di LaSbustiamo!</h1>
        <p>Scopri le ultime novità e collezioni Pokémon esclusive!</p>
      </div>
    </div>
  );
};

export default Jumbotron;

