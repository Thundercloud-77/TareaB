import React, { useState } from 'react';
import './App.css';
import logo from './foto.png';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

function FormularioTicketTurno1() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [message, setMessage]=useState('');
  const[error, setError]= useState('');

  const onSubmit = async (data) => {
    try{
      const response = await axios.get(`http://localhost:3001/tickets?curp=${data.curp}`);
      if(response.data.lenght>0){
        setError('Ya existe un ticket con la misma CURP. No se ha insertado el ticket');
        setMessage('');
      } else{
        const insertResponse=await axios.post('http://localhost:3001/tickets',data);
        setMessage('Los datos se han insertado correctamente.');
        setError('');
        console.log(insertResponse.data)
      }
    }catch(error){
      console.error('Error al crear un ticket:',error);
      setError('Hubo un error al insertar los datos.');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" /> {''}
      <h2>Ticket de Turno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nombreCompleto">Nombre de quien realizará el trámite:</label>
          <Controller
            name="nombreCompleto"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="text" placeholder="Nombre Completo" />}
          />
          {errors.nombreCompleto && <span className="error">{errors.nombreCompleto.message}</span>}
          <label htmlFor="curp">CURP:</label>
          <Controller
            name="curp"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => <input {...field} type="text" placeholder="CURP" />}
          />
          {errors.curp && <span className="error">{errors.curp.message}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="nombre">Nombre:</label>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" placeholder="Nombre" />}
          />
          <label htmlFor="paterno">Paterno:</label>
          <Controller
            name="paterno"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" placeholder="Apellido Paterno" />}
          />
          <label htmlFor="materno">Materno:</label>
          <Controller
            name="materno"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" placeholder="Apellido Materno" />}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="telefono">Teléfono:</label>
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" placeholder="Teléfono" />}
          />
          <label htmlFor="celular">Celular:</label>
          <Controller
            name="celular"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" placeholder="Celular" />}
          />
          <label htmlFor="correo">Correo:</label>
          <Controller
            name="correo"
            control={control}
            defaultValue=""
            rules={{
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Correo electrónico no válido',
              },
            }}
            render={({ field }) => <input {...field} type="text" placeholder="Correo" />}
          />
          {errors.correo && <span className="error">{errors.correo.message}</span>}
        </div>

        <div>
          <label htmlFor="curso">Nivel al que desea ingresar o que ya cursa el alumno?</label>
          <Controller
            name="curso"
            control={control}
            defaultValue="curso1"
            render={({ field }) => (
              <select {...field}>
                <option value="curso1">Curso 1</option>
                <option value="curso2">Curso 2</option>
                <option value="curso3">Curso 3</option>
              </select>
            )}
          />
        </div>

        <div>
          <label htmlFor="municipio">Municipio donde se desea que estudie el alumno:</label>
          <Controller
            name="municipio"
            control={control}
            defaultValue="municipio1"
            render={({ field }) => (
              <select {...field}>
                <option value="municipio1">Municipio 1</option>
                <option value="municipio2">Municipio 2</option>
                <option value="municipio3">Municipio 3</option>
              </select>
            )}
          />
        </div>


        <div>
          <label htmlFor="asunto">Seleccione el asunto a tratar:</label>
          <Controller
            name="asunto"
            control={control}
            defaultValue="asunto1"
            render={({ field }) => (
              <select {...field}>
                <option value="asunto1">Asunto 1</option>
                <option value="asunto2">Asunto 2</option>
                <option value="asunto3">Asunto 3</option>
              </select>
            )}
          />
        </div>

        <div>
          <button type="submit">Generar Turno</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioTicketTurno1;
