const express = require('express');
const mongoose = require('mongoose');

const app = express();
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    }
  });
const Person = mongoose.model('Person', personSchema);

mongoose.connect('mongodb://localhost:27017/new', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');

    app.get('/api/person/:name', async (req, res) => {
      try {
        const person = await Person.findOne({ name: req.params.name });

        if (!person) {
          return res.status(404).json({ message: 'Person not found' });
        }

        res.json({ name: person.name, age: person.age });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
      }
    });


    app.listen(3005, () => {
      console.log(`Server is running`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
