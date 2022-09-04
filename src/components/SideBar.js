import React from 'react';
import './SideBar.css';

export default function SideBar({func}) {

  return (
    <div className='sidebar-container col-4 col-sm-4 col-md-3 col-xl-2'>
      <ul className='d-flex flex-column'>
        <a href="#" onClick={()=>func(0)}>
          <li>Productos</li>
        </a>
        <a href="#" onClick={()=>func(2)}>
          <li>Header</li>
        </a>
        <a href="#" onClick={()=>func(1)}>
          <li>Banner</li>
        </a>
      </ul>
    </div>
  )
}
