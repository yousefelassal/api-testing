const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// employees data in a database
const employees = [
    { firstName: 'Jane', lastName: 'Smith', age: 20 },
    //...
    { firstName: 'John', lastName: 'Smith', age: 30 },
    { firstName: 'Mary', lastName: 'Green', age: 50 },
]

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  
  app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
  app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
  });
  
  app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  }); 

  app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
  });
  
  app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
  });
  
  app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
  });
  
  app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
  });

app.get('/employees', (req, res) => {
    const { firstName, lastName, age } = req.query;
    let results = [...employees];
    if (firstName) {
      results = results.filter(r => r.firstName === firstName);
    }
  
    if (lastName) {
      results = results.filter(r => r.lastName === lastName);
    }
  
    if (age) {
      results = results.filter(r => +r.age === +age);
    }
    res.json(results);
  });

app.listen(3000, () => console.log('server started'));