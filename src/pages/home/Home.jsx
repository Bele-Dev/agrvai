import React, { useState } from 'react';
import './home.css';
import Gato from './cats.png';

// import banner from './banner.jpeg'
import { Link } from 'react-router-dom';

function Home() {


  return (
  <>
  <br />
      <div className='container_home'>

        <div className="texto">
          <br />
          <br />
          <br />
          <h1 id='desktop' className='pulsing'>Cuidando da saúde do seu pet com carinho!</h1>
          <h1 id='mobile'  className='pulsing'>Cuidando da saúde do seu pet com carinho!</h1>

      </div>
      <div id=''>
        <img src={Gato} id='imgdesktop' />
        <img src={Gato} id='imgmobile' />

      </div>

 </div>

  
  </>
  );
}

export default Home;
