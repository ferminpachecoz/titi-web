import React from 'react';
import './CategoryForm.css';
import { useRef, useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().min(5, "Debe tener al menos 5 caracteres").max(50, "Máximo de 50 caracteres").required("Debe tener un título"),
  description: yup.string().min(5, "Debe tener al menos 5 caracteres").max(150, "Máximo de 150 caracteres").required("Debe tener una descripción"),
  banner: yup.string().required("Debes seleccionar una opción"),
  header: yup.string().required("Debes seleccionar una opción"),
})

export default function CategoryForm({click}) {
  const edit = useRef();
  const [img, setImg] = useState('');
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState('');
  const [finded, setFinded] = useState('');
  const [url, setUrl] = useState('')
  const [success, setSuccess] = useState(false)

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const handleClick = (id, url) =>{
    edit.current.style.display = "block";
    if(id){
      setSelected(id)
    }
    setUrl(url);
  }

  const handleCreate = (data) =>{
    const form = new FormData();
    if(selected){
      form.append("id", selected)
    }
    if(data.title){
      form.append("title", data.title);
    }
    if(data.description){
      form.append("description", data.description)
    }
    if(img){
      form.append("img_path", img)
    }
    if(data.banner){
      form.append("banner", data.banner)
    }
    if(data.header){
      form.append("header", data.header)
    }

    let request = {
      method:"POST",
      body: form
    }

    fetch(`https://le-marche-server.herokuapp.com/${url}`, request)
      .then(res => res.json())
      .then(data => {
        if(data.status == 1){
          setSuccess(true)
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(()=>{
    fetch('https://le-marche-server.herokuapp.com/category')
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(err => console.error(err))
  },[])

  useEffect(()=>{
    if(selected){
      let findex = category.find(element=> element.id === selected);
      setFinded(findex)
    }
  }, [selected])
  const handleDelete = id_category =>{
    let si = window.confirm("Deseas borrar esta categoria?")
    if (si){
      let request = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id_category})
      }
      fetch("https://le-marche-server.herokuapp.com/delete-category", request)
        .then(res => res.json())
        .then(a => console.log(a))
        .catch(err => console.error(err))
    }
  }

  return (
    <div className='cat-container'>
      {success &&
        <div className='success-message'>
          <p className='mb-0'>Se ha creado una categoría exitosamente!</p>
          <span className='close-success-message mb-0'><a href="#" onClick={() => setSuccess(false)}>X</a></span>
        </div>
      }
      <a href="#" className='close-icon'>
        <i className="bi bi-x" onClick={()=>click(0)}></i>
      </a>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mt-3'>
        <h1>Categorias</h1>
        <div>
          <button className='button bg-green-gradient' onClick={()=>handleClick('','create-category')}>Agregar</button>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2'>
          {
            category.map((item, i)=>  
              <div className='col' key={i+'pou'}>
                <div className='category-box' >
                  <p>{item.title}</p>
                  <div className='edit-button'><button className='bg-blue-gradient' onClick={() => handleClick(item.id, 'update-category')}>Editar</button></div>
                  <div className='delete-button'><button onClick={() => handleDelete(item.id)}>Borrar</button></div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <form className='col-8 form-edit-category' ref={edit} onSubmit={handleSubmit(handleCreate)} >
          <div className='d-flex flex-column'>
            <label>Titulo:</label>
            <input type="text" name='title' defaultValue={finded?finded.title:''} {...register('title')} />
            {errors.title && <p className='error-message'>{errors.title.message}</p>}
          </div>
          <div className='d-flex flex-column'>
            <label>Descripción:</label>
            <input type="text" name='description' defaultValue={finded?finded.description:''} {...register('description')} />
            {errors.description && <p className='error-message'>{errors.description.message}</p>}
          </div>
          <div className='d-flex flex-column'>
            <label>Banner:</label>
            <select name='banner' defaultValue={finded?finded.banner:''} {...register('banner')} >
              <option value="" key="3qwe">Seleccione una opción</option>
              <option value="1" key="1rew">Si</option>
              <option value="0" key="2thy">No</option>
            </select>
            {errors.banner && <p className='error-message'>{errors.banner.message}</p>}
          </div>
          <div className='d-flex flex-column'>
            <label>Header:</label>
            <select name='header' defaultValue={finded?finded.header:''} {...register('header')} >
              <option value="" key="3shh">Seleccione una opción</option>
              <option value="1" key="1ashh">Si</option>
              <option value="0" key="2hbbb">No</option>
            </select>
            {errors.header && <p className='error-message'>{errors.header.message}</p>}
          </div>
          <div className='d-flex flex-column mt-3'>
            <label>Foto de portada:</label>
            <input type="file" onChange={e => setImg(e.target.files[0])} />
          </div>
          <div className='d-flex justify-content-center mt-3'>
            <button className='button bg-blue-gradient' type='submit'>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
