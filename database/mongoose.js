const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dogDB', {useNewUrlParser: true})

const dogSchema = new mongoose.Schema({
  name: String
})

const Dog = mongoose.model("dog",  dogSchema);

const firstDog = new Dog({
  name: 'German Shepherd'
})

const second = new Dog({
  name: 'Lebrador retriever'
})

const third = new Dog({
  name: 'Pomernanin'
})

// Dog.insertMany([firstDog, second, third], function(err, dogs)
// {
//   if(err)
//   {
//     console.log(err)


//   }
//   else
//   {
//     console.log(dogs)
//   }
// })


// firstDog.save(function(){
//   console.log('data has been saved');
  
// });

Dog.find(function(err, dogs){
  // console.log(dogs);
  dogs.forEach(element => {
    console.log(element.name);
  });
  mongoose.connection.close();
})