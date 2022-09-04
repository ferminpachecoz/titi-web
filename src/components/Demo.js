import React from 'react';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstname: yup.string().required('El campo no puede estar vacío').min(3, "Debe tener al menos 3 caracteres"),
  lastname: yup.string().required('El campo no puede estar vacío').min(5, "Debe tener al menos 5 caracteres"),
})

export default function Demo() {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const formSubmit = (data) =>{
    console.log(data);
  }
  console.log(errors);
  return (
    <div className='d-flex justify-content-center'>
      <form className='my-5' onSubmit={handleSubmit(formSubmit)}>
        <div className='my-2'>
          <label>Nombre</label>
          <input type="text" name='firstname' {...register('firstname')} />
          {errors.firstname && <p>{errors.firstname.message}</p>}
        </div>
        <div className='my-2'>
          <label>Apellido</label>
          <input type="text" name='lastname' {...register('lastname')} />
          {errors.lastname && <p>{errors.lastname.message}</p>}
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type='submit'>submit</button>
        </div>
      </form>
    </div>
  )
}
