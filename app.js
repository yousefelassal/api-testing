const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

// employees data in a database
const employees = [
    { firstName: 'Jane', lastName: 'Smith', age: 20 },
    //...
    { firstName: 'John', lastName: 'Smith', age: 30 },
    { firstName: 'Mary', lastName: 'Green', age: 50 },
]

let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };

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
    return res.send(Object.values(users));
  });
  
  app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
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

  app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
  });
  
  app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
  });

  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
    };
  
    messages[id] = message;
  
    return res.send(message);
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