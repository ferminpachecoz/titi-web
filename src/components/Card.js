import React from 'react';
import './Card.css';
import ModalPurchase from './ModalPurchase';

export default function Card({path, display, title, description, price, id, discount}) {
  return (
    <div className='col pb-3 mt-3 card-container text-center'>
      <a href={`/product?id=${id}`}>
        <div className='product-image' style={{backgroundImage: `url(${path})`}} ></div>
      </a>
        <p className='product-title'>{title}</p>
        <p className='product-description'>{description}</p>
        <div className='d-flex justify-content-center'>
          <p className='product-price'>${price}</p>
          {discount &&
            <p className='ms-3 product-discount'>%{discount} Off</p>
          }
        </div>
        <button type='button' className='product-buy' onClick={()=>display({title, description, price, path, id, discount})} >ADD TO BAG</button>
    </div>
  )
}
