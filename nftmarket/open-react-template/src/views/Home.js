import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import sections
import Hero from '../components/sections/Hero';
import PicTiles from '../components/sections/PicTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {

    return (
        <>
            <Hero className="illustration-section-01" />
            <PicTiles />
            {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
            <Testimonial topDivider /> */}
            {/* <Cta split /> */}
        </>
    );
}

export default Home;