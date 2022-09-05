import React from 'react';
import './LayoutHeader.css';
import { useState } from 'react';

export default function LayoutHeader({category, notHeader, title, section}) {
  const [visible, setVisible] = useState(category);
  const [notVisible, setNotVisible] = useState(notHeader);

  const handleClick = (id, type, title, img_path) =>{
    if(type === 'add'){
      let request = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, [section]: 1})
      }
      console.log(request)
      fetch('https://le-marche-server.herokuapp.com/detail-category', request)
        .then(res => res.json())
        .then(a =>{
          if(a.status === 1){
            setVisible(values => ([...values, {id, title, img_path}]))
            let z = notVisible.filter((item)=>item.id !== id)
            setNotVisible(z)
          }
        })
        .catch(err => console.error(err))
    }else if(type === "delete"){
      let request = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, [section]: 0})
      }
      console.log(request);
      fetch('https://le-marche-server.herokuapp.com/detail-category', request)
        .then(res => res.json())
        .then(a =>{
          if(a.status === 1){
            setNotVisible(values => ([...values, {id, title, img_path}]))
            let z = visible.filter((item)=>item.id !== id)
            setVisible(z)
          }
        })
        .catch(err => console.error(err))
    }
  }
  return (
    <div className='layout-header-container'>
      <h1 className='h-responsive mb-4'>{title}</h1>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2'>
        {
          visible.map((item, i)=>
            <div key={i+'vth'} className='col' >
              <div className='square' style={{backgroundImage: `url('images/${item.img_path}')`}}>
                <div className='shadow p-3'>
                  <p>{item.title}</p>
                  <div className='button-container'>
                    <button onClick={()=>handleClick(item.id, 'delete', item.title, item.img_path)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <h1 className='h-responsive my-4'>Categorias no Visibles</h1>
      <div className='row row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2'>
        {
          notVisible.map((item, i)=>
            <div key={i+'nv'} className='col'>
              <div className='square' style={{backgroundImage: `url('images/${item.img_path}')`}}>
                <div className='shadow p-3'>
                  <p>{item.title}</p>
                  <div className='button-container'>
                    <button style={{backgroundColor: "rgba(0, 255, 0, 0.815)"}} onClick={()=>handleClick(item.id, 'add', item.title, item.img_path)}>Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
