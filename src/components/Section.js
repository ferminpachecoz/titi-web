import React from 'react';
import './Section.css';
import CategoryBanner from './CategoryBanner';
import Carousel from './Carousel';
import SpecialDesign from './SpecialDesign';

export default function Section({display, productCategory, categoryTitle}) {
  return (
    <div>
      <CategoryBanner />
      <br/>
      <br/>
      <br/>
      <div>
        <h2 className='text-center text-uppercase mt-3'>{categoryTitle}</h2>
        <Carousel display={display} productCategory={productCategory} />
        <br/>
        <br/>
        <br/>
        <br/>
        <SpecialDesign />
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  )
}
