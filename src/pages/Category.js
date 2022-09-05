import React from 'react';
import Section from '../components/Section';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalPurchase from '../components/ModalPurchase';
import { useState, useEffect } from 'react';

export default function Category() {
  const [modal, setModal] = useState(false);
  const [productCategory, setProductCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [categoryTitle, setCategoryTitle] = useState([])

  const displayModal = (product) =>{
    setModal(!modal)
    if(product){
      setSelectedProduct(product)
    }
  }
  let query = new URLSearchParams(window.location.search);
  let category = query.get('id')

  useEffect(()=>{
    fetch('https://lm-serverless.herokuapp.com/products')
      .then(res => res.json())
      .then(a => {
        if(a.length > 0){
          let x = a.filter(item =>{
            return item.id_category == category;
          })
          setProductCategory(x)
        }
      })
      .catch(err => console.error)

      fetch('https://lm-serverless.herokuapp.com/category')
        .then(res => res.json())
        .then(data =>{
          let x = data.filter(item=>{
            return item.id == category
          })
          setCategoryTitle(x[0].title)
        })
  },[])

  return (
    <div>
      {modal &&
        <ModalPurchase display={displayModal} product={selectedProduct} />
      }
      <Header />
      <Section display={displayModal} productCategory={productCategory} categoryTitle={categoryTitle} />
      <Footer />
    </div>
  )
}
