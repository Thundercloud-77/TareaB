import {useState, useEffect} from 'react';
import axios from 'axios';
function FormularioTicketTurno2() {
  
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    curp: '',
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    celular: '',
    correo: '',
    curso: 'curso1',
    municipio: 'municipio1',
    asunto: 'asunto1',
  });

  const [errors, setErrors] = useState({
    nombreCompleto: '',
    curp: '',
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    celular: '',
    correo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (formData[key] === '') {
        valid = false;
        newErrors[key] = 'Este campo es obligatorio';
      } else {
        newErrors[key] = '';
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
    }
  };
  
  return (
    <div className="container">
      <h2>Ticket de Turno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreCompleto">Nombre de quien realizará el trámite:</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            placeholder="Nombre Completo"
            value={formData.nombreCompleto}
            onChange={handleInputChange}
          />
          <span className="error">{errors.nombreCompleto}</span>
          <label htmlFor="curp">CURP:</label>
          <input
            type="text"
            id="curp"
            name="curp"
            placeholder="CURP"
            value={formData.curp}
            onChange={handleInputChange}
          />
          <span className="error">{errors.curp}</span>
        </div>

        <div>
          <button type="submit">Generar Turno</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioTicketTurno2;
