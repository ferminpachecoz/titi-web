import React from 'react';
import './Banner.css';

export default function Banner({title, description, path, id}) {
  return (
    <div className='banner-container' style={{backgroundImage: `url(${path})`}}>
      <div className='mask'>
        <div className='banner-info'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <p className='banner-title text-center'>{title}</p>
            <h3 className='banner-description'>{description}</h3>
            <a href={`/category?id=${id}`}>
              <button className='mt-4 banner-button'>SHOP NOW</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
