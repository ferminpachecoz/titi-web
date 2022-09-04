import React from 'react';
import './AboutSection.css'

export default function AboutSection() {
  return (
    <div className='about-container'>
      <h1 className='text-center my-5'>¿Quienes Somos?</h1>
      <div className='row row-column'>
        <div className='col-12 row section'>
          <div className='col-12 col-md-6 shadow'>
            <div className='img-about' style={{backgroundImage: 'url("images/banner6.png")'}}></div>
          </div>
          <div className='col-12 col-md-6 text-container'>
            <p>En Le Marche Bs. As. te proponemos una manera diferente de comprar ropa, pensamos en mujeres jóvenes, modernas y urbanas. Te brindamos un espacio para que tengas una experiencia única, con atención personalizada, donde vas a poder encontrar prendas y accesorios elegidos con dedicación, los más lindos para armar los mejores outfits con tu onda y tu estilo, y a excelentes precios.</p>
          </div>
        </div>
        <div className='col-12 row section'>
          <div className='col-12 col-md-6 text-container order-2 order-md-1'>
            <p>Ofrecemos los looks de moda, y nuestro plus esta en la relación precio calidad y atenció. Disfrutamos asesorarte, darte ideas para combinar nuestras prendas con las que ya tengas en tu guardarropas.</p>
          </div>
          <div className='col-12 col-md-6 order-1 order-md-2 shadow'>
            <div className='img-about' style={{backgroundImage: 'url("images/banner7.png")'}}></div>
          </div>
        </div>
        <div className='col-12 row section'>
          <div className='col-12 col-md-6 shadow'>
            <div className='img-about' style={{backgroundImage: 'url("images/banner8.png")'}}></div>
          </div>
          <div className='col-12 col-md-6 text-container'>
            <p>Prendas versátiles que se adaptan a diferentes situaciones, tanto al día como a la noche. Buscamos que cada mujer encuentre su estilo propio. En nuestro showroom vas a encontrar, un lugar donde comprar ropa y donde venir con amigas sea una fiesta.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
