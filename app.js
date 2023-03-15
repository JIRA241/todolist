const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();


// set up EJS as the view engine
app.set('view engine','ejs');
// use static files in the public folder
app.use(express.static(__dirname + '/public'));
// parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
// use method-override for PUT and DELETE requests
app.use(methodOverride('_method'));


// connect to MongoDB
mongoose.connect(
    'mongodb+srv://<Username>:<pass>@atlascluster.af82uvu.mongodb.net/?retryWrites=true&w=majority', 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));
  
  const itemSchema = new mongoose.Schema({
    name: String,
  });
  
  const Item = mongoose.model('Item', itemSchema);
  

// home route - display the to-do list
app.get('/', async (req, res) => {
    try {
      const items = await Item.find({});
      res.render('index', { items: items });
    } catch (err) {
      console.log(err);
    }
  });
  
  
// add new item to the to-do list
  app.post('/', async(req, res) => {
    const itemName = req.body.newItem;
  
    const item = new Item({
      name: itemName,
    });
  
    item.save();
    res.redirect('/');
  });

// delete item from the to-do list
app.delete('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    await Item.findOneAndDelete({ _id: itemId });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

  

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });






