import React from 'react';
import './Header.css';
import LeftSideBar from './LeftSideBar';
import { useState, useEffect } from 'react';

export default function Header() {
  const [search, setSearch] = useState(false);
  const [displayNav, setDisplayNav] = useState(false);
  const [admin, setAdmin] = useState(false)
  const [category, setCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([])
  const [sideBar, setSideBar] = useState(false)
  const [searchResponsive, setSearchResponsive] = useState(false)
  const [query, setQuery] = useState('')
  let x = JSON.parse(sessionStorage.getItem("products"))
  console.log(query);
  useEffect(()=>{
    fetch('https://lm-serverless.herokuapp.com/category')
      .then(res => res.json())
      .then(data =>{
        if(data.length > 0){
          let filterCategory = data.filter((item,i)=>{
            return item.header == 1;
          })
          setCategory(filterCategory);
          setAllCategory(data)
        }else{
          console.log("Error motherfucker!!")
        }
      })
      .catch(err => console.error(err))
  },[])

  const handleChange = data =>{
    fetch(`https://lm-serverless.herokuapp.com/search?query=${data}`)
      .then(res => res.json())
      .then(a => setQuery(a))
      .catch(err => console.error(err))
  }

  useEffect(()=>{
    if(sessionStorage.getItem('admin')){
      setAdmin(true)
    }else{
      setAdmin(false);
    }
  },[])

  const displaySideBar = () =>{
    setSideBar(!sideBar)
  }

  return (
    <div className='header-container'>
      <div>
        <div className='d-flex justify-content-center logo-container'>
          <div className='burger-menu d-flex justify-content-evenly align-items-center'>
            <a href="#" onClick={displaySideBar}><i className="bi bi-list font-xxl fw-600"></i></a>
            <a href="#" onClick={()=>setSearchResponsive(!searchResponsive)}><i className="bi bi-search font-xl"></i></a>
          </div>
          {sideBar &&
            <LeftSideBar allCategory={allCategory} func={displaySideBar} />
          }
          <a href="/">
            <div style={{backgroundImage: "url('/le-marche-logo.png')"}} className="logo"></div>
          </a>
          <div className='nav-icons d-flex justify-content-evenly'>
            {search &&
            <div className='d-flex flex-column'>
              <input type="text" className='search-input me-3' placeholder='Buscar en productos...' onChange={e => handleChange(e.target.value)}/>
              <ul className='results'>
                {query &&
                  query.map((item, i)=>
                    <li key={i}><a href={`/product?id=${item.id}`}>{item.name}</a></li>
                  )
                }
              </ul>
            </div>
            }
            <div className='m-0 p-0 d-inline display-none'>
              <a href="#" onClick={()=> setSearch(!search)}><i className="bi bi-search"></i></a>
              <a href="/login"><i className="bi bi-person"></i></a>
              <a href="/admin"><i className="bi bi-star"></i></a>
            </div>
            <a href="/cart">
              <i className="bi bi-handbag position-relative">
                {x && x.length>0 &&
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark font-min'>
                    {x.length}
                  </span>
                }
              </i>
            </a>
            {admin &&
              <a href="/admin"><i className="bi bi-clipboard-data"></i></a>
            }
          </div>
        </div>
        <div className='nav-container d-flex justify-content-evenly mb-3'>
          {category &&
            category.map((item, i)=>
              <div key={i+'vvb'}>
                <a href={`category?id=${item.id}`}>{item.title}</a>
              </div>
            )
          }
          <div>
            <a href="#" onClick={() => setDisplayNav(!displayNav)}>mas</a>
          </div>
        </div>
        {displayNav &&
          <div className='nav-extended-container'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <p className='mb-1'>Todas las Categorias</p>
              {allCategory &&
                allCategory.map((item, i)=>
                  <a href={`/category?id=${item.id}`} key={i}>{item.title}</a>
                )
              }
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
              <p className='mb-1'>Informacion</p>
              <a href="/about">nosotras</a>
              <a href="#">como comprar</a>
              <a href="#">showroom</a>
              <a href="#">formas de pago</a>
              <a href="#">politica de cambio</a>
              <a href="/contact">contacto</a>
            </div>
          </div>
        }
      </div>
      {searchResponsive &&
        <div className='alpha d-flex flex-column'>
          <input type="text" placeholder='Busque un producto...' onChange={e => handleChange(e.target.value)} />
          <ul className='results-responsive'>
            {query &&
              query.map((item, i)=>
                <li key={i}><a href={`/products?id=${item.id}`}>{item.name}</a></li>
              )
            }
          </ul>
        </div>
      }
    </div>
  )
}
