import React from 'react';
import './CartSection.css';
import { useEffect, useState } from 'react';

export default function CartSection() {
  let y = JSON.parse(sessionStorage.getItem("products"))
  const [data, setData] = useState(y)

  let total = 0;
  let totalDiscount = 0;

  if(data){
    data.forEach(item=>{
      total += (item.price * item.units)
      totalDiscount += ((item.price * item.units)*(item.discount * 0.01 ))
    })
  }
  
  const handleClick = id =>{
    let filtered = data.filter(item =>{
      return item.id !== id
    })
    let removed = JSON.stringify(filtered)
    sessionStorage.setItem("products", removed)
    sessionStorage.setItem("cartLength", filtered.length)
    setData(filtered);
  }

  const handleChange = (e, id) =>{
    let alfa = data;

    const index = alfa.findIndex(object => {
      return object.id === id;
    });
    
    if (index !== -1) {
      alfa[index].units = parseInt(e.target.value);
    }
    
    setData([...alfa])
  }

  const handlePay = () =>{
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('/payment/create', request)
      .then(res => res.json())
      .then(a => {
        if(a.init_point){
          window.location.replace(a.init_point)
        }else{
          console.log(a);
        }
      })
      .catch(err => console.error(err))
  }

  console.log(data);
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      <div className='col-8'>
        <div className='d-flex justify-content-center'>
          <div className='cart-image'>
            <img src="/cart-image.jpg" alt="" />
          </div>
        </div>
        <div>
          <h2 className='text-center mt-5'>CARRITO DE COMPRAS</h2>
          <p className='text-center'>Puede calcular su costo de envio mediante el calculador de envios o retirarlo por la sucursal mas cercana.</p>
          {data &&
            data.map((item, i)=>  
              <div className='cart-product row mb-5' key={i+'cart'}>
                <div className='col-4 col-md-2 img-container' style={{backgroundImage: `url(${item.path})`}}></div>
                <div className='col-6 col-md-8 p-2'>
                  <div className='d-flex justify-content-between'>
                    <p className='fw-500'>{item.title}</p>
                    <select onChange={e => handleChange(e, item.id)} >
                      <option value="1" key="hha">1</option>
                      <option value="2" key="vczk">2</option>
                      <option value="3" key="asdnn">3</option>
                    </select>
                  </div>
                  <p className='font-sm'>{item.description}</p>
                  <a href="#" className='font-xs cart-remove' onClick={()=>handleClick(item.id)}>REMOVE</a>
                </div>
                <div className='col-2 d-flex align-items-center'>
                  <p className='fw-600 text-center '>${item.price * item.units}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className='col-8 cart-subtotal'>
        <div className='d-flex justify-content-between'>
          <p className='font-sm '>Subtotal</p>
          <p className='font-sm fw-600'>${total}.00</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='font-sm '>Discount</p>
          <p className='font-sm fw-600'>${totalDiscount}.00</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='font-sm '>Delivery Method</p>
          <p className='font-sm fw-600'>--</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className='font-xl fw-600'>Total</p>
          <p className='font-xl fw-600'>${total-totalDiscount}.00</p>
        </div>
      </div>
      <div className='col-4 cart-checkout my-5'>
        <a href="#"><button onClick={handlePay} >Continue to Checkout</button></a>
      </div>
    </div>
  )
}
