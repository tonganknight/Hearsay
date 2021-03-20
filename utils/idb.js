let db;

const request = indexedDB.open('hearsaydb', 1);

//if database changes
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('User', { autoIncrement: true });
  };
