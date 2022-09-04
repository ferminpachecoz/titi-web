import React from 'react';
import ProductSection from './AdminSections/ProductSection';
import LayoutHeader from './AdminSections/LayoutHeader';
import { useState, useEffect } from 'react';

export default function Box({tab}) {
  const [headerCategory, setHeaderCategory] = useState([])
  const [bannerCategory, setBannerCategory] = useState([])
  const [notHeader, setNotHeader] = useState([]);
  const [notBanner, setNotBanner] = useState([])
  useEffect(()=>{
    fetch('/category')
      .then(res => res.json())
      .then(data =>{
        if(data){
          let header = data.filter(item => item.header === 1);
          let banner = data.filter(item => item.banner === 1);
          let x = data.filter(item => item.header === 0);
          let z = data.filter(item => item.banner === 0)
          setHeaderCategory(header)
          setBannerCategory(banner)
          setNotHeader(x);
          setNotBanner(z)
        }
      })
      .catch(err => console.error(err))
  },[])
  return (
    <div className='col-8 col-sm-8 col-md-9 col-xl-10'>
      {tab === 0 && <ProductSection />}
      {tab === 2 && <LayoutHeader category={headerCategory} notHeader={notHeader} title={"Categorias Visibles"} section="header" />}
      {tab == 1 && <LayoutHeader category={bannerCategory} notHeader={notBanner} title={"Categorias Visibles"} section="banner" />}
    </div>
  )
}
