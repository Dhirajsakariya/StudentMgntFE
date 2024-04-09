import 'react-slideshow-image/dist/styles.css';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import SS1 from '../Assets/SS1.jpg';
import SS2 from '../Assets/SS2.jpeg';
import SS3 from '../Assets/SS3.jpg';
import Navigationbar from './Navigationbar';
import Footer from './Footer';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '600px'
}
const slideImages = [
  {
    url: SS1
  },
  {
    url: SS2
  },
  {
    url: SS3
  },
];

const Home = () => {
    return (
    <> <Navigationbar/>
      <div id="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
      <Footer/>
      </>
    )
}

export default Home;