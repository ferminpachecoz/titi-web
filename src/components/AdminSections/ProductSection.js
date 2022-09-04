import React from 'react';
import './ProductSection.css';
import CardSm from './CardSm';
import Modal from '../Modal';
import ProductForm from './ProductForm';
import CategoryForm from './CategoryForm';
import { useState, useEffect } from 'react';

export default function ProductSection() {
  const [show, setShow] = useState(0);
  const [products, setProducts] = useState()
  const [selected, setSelected]= useState()
  const [category, setCategory] = useState()
  const handleClick = (estado, id) =>{
    setShow(estado)
    setSelected(id)
  }

  useEffect(()=>{
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  },[])

  return (
    <div className='container overflow-hidden admin-product-container'>
      {show == 1 &&
      <Modal>
        <ProductForm click={handleClick} title="Editar Producto" btn="Editar" purl="edit" selected={selected} />
      </Modal>
      }
      {show == 2 &&
        <Modal>
          <ProductForm click={handleClick} title="Agregar Producto" btn="Agregar" purl="create"/>
        </Modal>
      }
      {show == 3 &&
        <Modal>
          <CategoryForm click={handleClick} />
        </Modal>
      }
      <div className='d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row justify-content-between align-items-center mb-3'>
        <h1 className='mt-3 section-title'>Todos los Productos</h1>
        <div>
          <button className='button btn-size-sm bg-green-gradient me-3' onClick={()=>handleClick(2)}>Agregar producto</button>
          <button className='button btn-size-sm bg-green-gradient' onClick={()=>handleClick(3)}>Agregar categoria</button>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-1 all-products'>
        {products &&
          products.map((item, i)=>  
            <div className='col' key={i+'ghy'}>
              <CardSm click={handleClick} product={item} />
            </div>
          )
        }
      </div>
    </div>
  )
}
