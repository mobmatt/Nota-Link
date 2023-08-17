const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const crypto = require('crypto');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;



// Set up body-parser middleware
app.use(bodyParser.json());

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb+srv://elomukoro:Gm123456!@cluster.i9c1yn9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for encryption keys
const KeySchema = new mongoose.Schema({
  key: String
});

const Key = mongoose.model('Key', KeySchema);

// Create API endpoint to upload file and store encryption key
app.post('/upload', upload.single('file'), async (req, res) => {
  // Generate symmetric encryption key
  const encryptionKey = crypto.randomBytes(32).toString('hex');

  // Store encryption key in the database
  const newKey = new Key({
    key: encryptionKey,
    fileData: req.file.buffer
  });

   await newKey.save()
    .then(() => {
      res.json({ message: 'File uploaded and encryption key stored successfully.' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
