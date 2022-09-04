import React from 'react';
import './ModalPurchase.css';

export default function ModalPurchase({display, product}) {
  
  const handleClick = () =>{
    let sess = sessionStorage.getItem("products");
    let x;
    let z;
    
    if(sess){
      let y = JSON.parse(sess)
      let repeat = y.find(item =>{
        return item.title === product.title
      })
      if(!repeat){
        x = [...y];
        x.push({...product, units: 1});
        z = JSON.stringify(x);
        sessionStorage.setItem("products", z);
      }
    }else{
      x = [];
      x.push({...product, units: 1})
      z = JSON.stringify(x);
      sessionStorage.setItem("products", z);
    }
  }
  
  return (
    <div className='modal-shadow'>
      <div className='d-flex justify-content-end'>
        <div className='col-9 col-sm-7 col-md-6 col-lg-5 modal-container'>
          <div className='d-flex justify-content-center'>
            <div className='col-8'>
              <h3 className='mt-4 modal-title'>{product.title}</h3>
              <a href="#" className='close-icon font-xl' onClick={display} >X</a>
              <p className='mt-3'>{product.description}</p>
              <div className='d-flex justify-content-between'>
                <p className='product-price'>${product.price}</p>
                <i className='bi bi-star'></i>
              </div>
              <hr/>
              <p className='mt-3 font-sm fw-600'>3 SIZES AVAILABLE</p>
              <p className='font-sm'>3.4 FL. OZ.</p>
              <div className='modal-button-container d-flex flex-column'>
                <a href="/cart" className='button-buy mb-3 font-xs fw-600' onClick={handleClick} >ADD TO BAG</a>
                <a href="#" className='button-detail font-xs fw-600'>VIEW DETAILS</a>
              </div>
              <img className='modal-img mt-4' src={product.path} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
