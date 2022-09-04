import React from 'react';
import './CategoryBanner.css'

export default function CategoryBanner() {
  return (
    <div>
      <div className='category-banner-container'>
        <div className='category-banner-logo' style={{backgroundImage: "url('category-background.jpg')"}}></div>
        <div className='banner-accessibility'>
          <p>FASHION</p>
          <h3>LE MARCHÊ</h3>
        </div>
      </div>
    </div>
  )
}
