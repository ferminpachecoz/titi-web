import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Contact.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Contact() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBv7CRy6pGfdAMiu-sWae3Ic1lsb7-3djE"
  })
  if(!isLoaded) return <div>Cargando...</div>
  return <Map />
}
function Map (){
  return (
    <div>
      <Header />
      <GoogleMap zoom={15} center={{lat: -41.12178670310981, lng: -71.40375798504826}} mapContainerClassName="map-container" >
        <Marker position={{lat: -41.12178670310981, lng: -71.40375798504826}} />
      </GoogleMap>
      <div className='row mt-4'>
        <div className='col-12 col-md-6 info-contact'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-8'>
              <h3>Mantente en contacto</h3>
              <hr/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              <br/>
              <div className='d-flex flex-column'>
                <div className='d-flex mb-2'>
                  <i className="bi bi-envelope info-icon me-2"></i><p>ferminpacheco87@gmail.com</p>
                </div>
                <div className='d-flex mb-2'>
                  <i className="bi bi-phone info-icon me-2"></i><p>11-6110-7112</p>
                </div>
                <div className='d-flex mb-2'>
                  <i className="bi bi-geo-alt info-icon me-2"></i><p>Av Pioneros km8, R8400 San Carlos de Bariloche, Río Negro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-8'>
              <h3>Hacé tu consulta!</h3>
              <hr/>
              <form className='d-flex flex-column justify-content-center '>
                <input type="text" className='contact-input' placeholder='Nombre...'/>
                <input type="text" className='contact-input' placeholder='Apellido...'/>
                <textarea cols="0" rows="7" className='contact-input' placeholder='Escribe tu consulta aqui...'></textarea>
                <div className='d-flex justify-content-center'>
                  <button type='submit' className='button-contact'>Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
