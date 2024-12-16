const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

app.use('/appointments', appointmentRoutes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
