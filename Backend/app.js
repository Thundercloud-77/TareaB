const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001; 

mongoose.connect('URL_DE_CONEXION_MONGODB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Ticket = mongoose.model('Ticket', {
  nombreCompleto: String,
  curp: String,
  nombre: String,
  paterno: String,
  materno: String,
  telefono: String,
  celular: String,
  correo: String,
  curso: String,
  municipio: String,
  asunto: String,
});

app.post('/tickets', async (req, res) => {
  try {
    const ticketData = req.body;
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear un ticket' });
  }
});

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
});

app.listen(port, () => {
  console.log(`Backend en ejecución en el puerto ${port}`);
});
