import React from 'react';
import './Carousel.css';
import Card from './Card';
import { useEffect, useState } from 'react';

export default function Carousel({display, productCategory}) {
  return (
    <div className='d-flex justify-content-center carousel-container'>
      <div className='row row-cols-2 row-cols-md-3 w-100'>
        {productCategory &&
          productCategory.map((item, i)=>
            <Card 
            key={i+'kh'} 
            path={`images/${item.images[0]?item.images[0].path:'default-placeholder.png'}`} 
            title={item.name} 
            description={item.description} 
            price={item.price} 
            display={display} 
            id={item.id} 
            discount={item.discount} 
            />
          )
        }
      </div>
    </div>
  )
}
