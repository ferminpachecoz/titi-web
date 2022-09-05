import React from 'react';
import './ProductDesign.css';
import { useState, useEffect } from 'react';

export default function ProductDesign() {
  const [product, setProduct] = useState({})
  let images = product?product.images:[];
  let query = new URLSearchParams(window.location.search);
  let id = query.get('id');

  const handleClick = ()=>{
    let z = []
    let x = JSON.parse(sessionStorage.getItem('products'))
    
    if(x && x.length>0){
      x.forEach(item=>{
        if (item.id !== product.id) {
          let beta = {
            description: product.description,
            discount: product.discount,
            id: product.id,
            path: 'images/' + product.images[0].path,
            price: product.price,
            title: product.name,
            units: 1
          }
          z.push({...beta})
          z.push({...item})
        }
      })
    }else{
      let beta = {
        description: product.description,
        discount: product.discount,
        id: product.id,
        path: 'images/' + product.images[0].path,
        price: product.price,
        title: product.name,
        units: 1
      }
      z.push({...beta})
    }

    if(z.length > 0){
      let y = JSON.stringify(z);
      sessionStorage.setItem("products", y)
      window.location.replace("/cart")
    }
    console.log(JSON.parse(sessionStorage.getItem("products")));
  }

  useEffect(()=>{
    fetch(`https://le-marche-server.herokuapp.com/product/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err))
  },[])

  return (
    <div className='d-flex flex-column flex-md-row mb-5'>
      <div className='col-12 col-md-7'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            {images &&
              images.map((item, i)=>
                <div key={i} className={`carousel-item ${i == 0?'active':''}`}>
                  <img src={'images/'+item.path} className="d-block w-100" alt="lorem ipsum" />
                </div>
              )
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='col-12 col-md-4'>
        <div className='product-container'>
          <h3 className='mt-5'>{product.name}</h3>
          <p className='product-description'>{product.description}</p>
          <div className='d-flex justify-content-between'>
            <p className='product-price'>${product.price}</p>
            <i className="bi bi-star"></i>
          </div>
          {product.discount &&
            <p className='product-discount'>%{product.discount}Off</p>
          }
          <hr/>
          <p className='size-text'>SIZE</p>
          <p>6.8 FL. OZ.</p>
          <button onClick={handleClick}>ADD TO BAG</button>
          <div className='mt-4 description-container'>
            <p className='description-title'>Método de Envío</p>
            <p>Los productos se envían por medio de Correo Argentino, se pueden retirar por una sucursal del mismo o puede ser enviado a la puerta de su casa. Tambien puede venir a verlo a una de nuestras <a href="/contact" className='fw-600 text-decoration-underline'>sucursales oficiales</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
