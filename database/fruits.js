const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

const ownerScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const owner = mongoose.model('owner', ownerScema);

const amrit = new owner({
    name: "amrit",
    age: 22
})
// amrit.save();


const mobileScehma = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        min: 10000,
        max: 20000
    },
    owner: ownerScema
})



const mobile = mongoose.model('phoneCollections', mobileScehma);

const oneplus = new mobile({
    name: 'oneplus',
    price: 10000,
    owner: amrit
})



oneplus.updateOne({
    name: 'xiaomi'
})

oneplus.save()
// mobile.deleteMany({name: "oneplus", price: {$gt: 9000 }}, function (err) {
//     console.log(err);
    
// });  for deletion

mobile.find(function (err, phoneCollections) {
    if (err) {
        console.log(err);
        
    }
    else
    {
        console.log(phoneCollections);
        mongoose.connection.close();
        
    }
})
// oneplus.save(function () {
//     console.log('connections going to end');
// // mongoose.connection.close();

// });