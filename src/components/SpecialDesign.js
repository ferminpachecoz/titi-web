import React from 'react';
import './SpecialDesign.css'

export default function SpecialDesign() {
  let url = 'https://img.freepik.com/foto-gratis/disenador-caucasico-creando-nuevo-diseno_53876-14753.jpg?w=740&t=st=1662061084~exp=1662061684~hmac=d7bda426f8c2c1a5ab0cb1df44f8b0d310da33fde7eeafc2e876c8cf48f05793'
  return (
    <div className='d-flex justify-content-center'>
      <div className='design-container row'>
        <div className='col-12 col-sm-6 design-text d-flex flex-column text-center align-items-center justify-content-center'>
          <p>URBAN FASHION</p>
          <h2>ENCONTRÁ TU ESTILO</h2>
          <a href="/"><button className='mt-4'>COMPRAR AHORA</button></a>
        </div>
        <div className='col-12 col-sm-6 design-img'>
          <img src={url} alt="" />
        </div>
      </div>
    </div>
  )
}
