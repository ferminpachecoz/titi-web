import React from 'react';
import './ProductForm.css';
import { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Debes ingresar un nombre').min(3, "Debe tener al menos 3 caracteres"),
  price: yup.number().positive('Debe ser un número mayor a 0').integer('Debe ser un número entero').required('Debes ingresar un precio'),
  description: yup.string().required('Debes ingresar una descripcion').min(5, "debe tener al menos 5 caracteres"),
  category: yup.string().required('Debes seleccionar una categoria'),
  collection: yup.string().required('El campo no puede estar vacío'),
  discount: yup.number('Debe ser un número').integer('Debe ser un número entero'),
  show: yup.string().required('Debes seleccionar una de las opciones'),
})

export default function ProductForm({click, title, btn, purl, selected}) {
  const [files, setFiles] = useState([]);
  const [sproduct, setSProduct] = useState();
  const [allCategory, setAllCategory] = useState();
  const [success, setSuccess] = useState(false)

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })
  console.log(errors);

  useEffect(()=>{
    if(selected){
      let data ={
        id: selected
      }
  
      let reqData={
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
  
      fetch('https://le-marche-server.herokuapp.com/edit/selected', reqData)
        .then(res => res.json())
        .then(data => setSProduct(data))
        .catch(err => console.error(err))
    }
  },[])
  useEffect(()=>{
    fetch('https://le-marche-server.herokuapp.com/category')
      .then(res => res.json())
      .then(data => setAllCategory(data))
      .catch(err => console.error(err))
  },[])
  const formSubmit = (form) =>{
    const data = new FormData();
    if(purl == 'edit' && selected){
      data.append("id", selected)
    }
    if(form.name){
      data.append("name", form.name)
    }
    if(form.price){
      data.append("price", form.price)
    }
    if(form.description){
      data.append('description', form.description)
    }
    if(form.collection){
      data.append("collection", form.collection)
    }
    if(form.discount){
      data.append("discount", form.discount)
    }
    if(form.category){
      data.append("id_category", form.category)
    }
    if(form.show){
      data.append("show", form.show)
    }
    if (files.length > 0) {
      for (let i=0; i<files.length; i++){
        data.append(`fieldname`, files[i])
      }
    }
    const request = {
      method:"POST",
      body: data
    }
    fetch(`https://le-marche-server.herokuapp.com/${purl}`, request)
      .then(res => res.json())
      .then(a => a.status?setSuccess(true):console.log(a))
      .catch(err => console.error(err))
    
  }
  return (
    <div className='form-container p-1'>
      {success &&
        <div className='success-message'>
          <p className='mb-0'>Se ha creado el producto exitosamente!</p>
          <span className='close-success-message mb-0'><a href="#" onClick={() => setSuccess(false)}>X</a></span>
        </div>
      }
      <h3>{title}</h3>
      <a href="#" className='close-icon'>
        <i className="bi bi-x" onClick={()=>click(0)}></i>
      </a>
      <hr/>
      <div>
        <form className='form-product' onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label>Nombre:</label>
            <input type="text" name='name' defaultValue={sproduct?sproduct.name:""} {...register('name')} />
            {errors.name && <p className='error-message'>{errors.name.message}</p>}
          </div>
          <div>
            <label>Precio:</label>
            <input type="number" name='price' defaultValue={sproduct?sproduct.price:0} {...register('price')} />
            {errors.price && <p className='error-message'>{errors.price.message}</p>}
          </div>
          <div>
            <label>Descripcion</label>
            <textarea cols="30" rows="3" name='description' defaultValue={sproduct?sproduct.description:""} {...register('description')} ></textarea>
            {errors.description && <p className='error-message'>{errors.description.message}</p>}
          </div>
          <div>
            <label>Categoría</label>
            <select name='category' defaultValue={sproduct?sproduct.category:""} {...register('category')} >
              <option value="" key="5asvvv">Seleccione una categoria</option>
              {allCategory &&
                allCategory.map((item, i)=>
                  <option value={item.id} key={i+'afd'}>{item.title}</option>
                )
              }
            </select>
            <p className='form-comment'>*Si no se modifica este campo entonces tomará el valor previo</p>
            {errors.category && <p className='error-message'>{errors.category.message}</p>}
          </div>
          <div>
            <label>Colección</label>
            <select name='collection' defaultValue={sproduct?sproduct.collection:""} {...register('collection')} >
              <option value="" key="3gaa">Seleccione una coleccion</option>
              <option value="invierno" key="1xsd">Invierno</option>
              <option value="verano" key="2vcx">Verano</option>
            </select>
            <p className='form-comment'>*Si no se modifica este campo entonces tomará el valor previo</p>
            {errors.collection && <p className='error-message'>{errors.collection.message}</p>}
          </div>
          <div>
            <label>Descuento(%)</label>
            <input type="number" name='discount' defaultValue={sproduct?sproduct.discount:0} placeholder='Ingrese un porcentaje...' {...register('discount')} />
            {errors.discount && <p className='error-message'>{errors.discount.message}</p>}
          </div>
          <div>
            <label>Mostrar</label>
            <select name='show' defaultValue={sproduct?sproduct.show:""} {...register('show')} >
              <option value="" key="3er">Seleccione una opcion</option>
              <option value="0" key="1asd">No</option>
              <option value="1" key="2ggg">Si</option>
            </select>
            <p className='form-comment'>*Si no se modifica este campo entonces tomará el valor previo</p>
            {errors.collection && <p className='error-message'>{errors.collection.message}</p>}
          </div>
          <div>
            <label>Fotos del producto:</label>
            <input type="file" name='images' multiple onChange={e => setFiles(e.target.files)} />
            <p className='form-comment'>*Si no se modifica este campo entonces tomará el valor previo</p>
          </div>
          <div className='button-container'>
            <button className='button bg-green-gradient' type='submit'>{btn}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
