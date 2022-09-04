import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import Box from '../components/Box';
import { useState } from 'react';

export default function Admin() {
  const [tab, setTab] = useState(0)

  const handleClick = (num) =>{
    setTab(num)
  }

  return (
    <div>
      <Header />
      <main className='row'>
        <SideBar func={handleClick} />
        <Box tab={tab} />
      </main>
      <Footer />
    </div>
  )
}

