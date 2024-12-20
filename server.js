const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// חיבור ל-MongoDB
mongoose.connect('mongodb://localhost:27017/phonebook', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// יצירת מודל לאיש קשר
const Contact = mongoose.model('Contact', { name: String, phone: String });

// הגדרת Middleware
app.use(bodyParser.json());
app.use(cors());

// יצירת איש קשר חדש
app.post('/api/contacts', (req, res) => {
  const newContact = new Contact({ name: req.body.name, phone: req.body.phone });
  newContact.save()
    .then(contact => res.status(201).json(contact))
    .catch(err => res.status(400).json({ error: err.message }));
});

// קבלת כל אנשי הקשר
app.get('/api/contacts', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json({ error: err.message }));
});

// טיפול בשגיאות
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
