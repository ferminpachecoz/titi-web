import React from 'react';
import './LeftSideBar.css'

export default function LeftSideBar({allCategory, func}) {
  return (
    <div className='side-bar-container col-9 col-sm-6 col-md-5'>
      <div className='close-icon' onClick={func}>
        <span>X</span>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-start'>
        <p className='mb-1 font-lg fw-600'>Todas las Categorias</p>
        {allCategory &&
          allCategory.map((item, i)=>
            <a href={`/category?id=${item.id}`} key={i}>{item.title}</a>
          )
        }
      </div>
      <div className='d-flex flex-column justify-content-center align-items-start mt-4'>
        <p className='mb-1 font-lg fw-600'>Informacion</p>
        <a href="/about">nosotras</a>
        <a href="#">como comprar</a>
        <a href="#">showroom</a>
        <a href="#">formas de pago</a>
        <a href="#">politica de cambio</a>
        <a href="/contact">contacto</a>
      </div>
    </div>
  )
}
