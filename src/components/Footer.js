import React from 'react';
import './Footer.css';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [category, setCategory] = useState([])
  useEffect(()=>{
    fetch('/category')
      .then(res => res.json())
      .then(a => setCategory(a))
      .catch(err => console.error(err))
  },[])

  return (
    <div className='footer-container mt-5'>
      <div className='d-flex justify-content-center footer-logo mt-3'>
        <div className='logo' style={{backgroundImage: 'url("le-marche-logo.png")'}}></div>
      </div>
      <div className='footer-nav mt-3 row row-cols-2 row-cols-md-4 g-4 justify-content-evenly px-3' >
        <div className='d-flex flex-column text-center'>
          <p className='footer-nav-title'>NAVIGATION</p>
          <a href="#">HOME</a>
          <a href="#">CONTACTO</a>
          <a href="#">NOSOTRAS</a>
          <a href="#">OFERTAS</a>
          <a href="#">TEMPORADA DE INIVIERNO</a>
          <a href="#">TEMPORADA DE VERANO</a>
        </div>
        <div className='d-flex flex-column text-center'>
          <p className='footer-nav-title'>ONLINE SERVICES</p>
          <a href="#">POLITICAS DE CAMBIO</a>
          <a href="#">FORMAS DE PAGO</a>
          <a href="#">LOGIN</a>
        </div>
        <div className='d-flex flex-column text-center'>
          <p className='footer-nav-title'>FAQ</p>
          <a href="#">METODOS DE ENVIO</a>
          <a href="#">COMO COMPRAR</a>
          <a href="#">SHOWROOM</a>
        </div>
        <div className='d-flex flex-column text-center'>
          <p className='footer-nav-title'>LE MARCHÊ</p>
          {category &&
              category.map((item, i)=>
                <a key={i} href={`/category?id=${item.id}`} className='text-uppercase' >{item.title}</a>
              )
          }
        </div>
      </div>
      <hr/>
    </div>
  )
}
