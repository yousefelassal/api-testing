const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// employees data in a database
const employees = [
    { firstName: 'Jane', lastName: 'Smith', age: 20 },
    //...
    { firstName: 'John', lastName: 'Smith', age: 30 },
    { firstName: 'Mary', lastName: 'Green', age: 50 },
]

app.use(bodyParser.json());

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