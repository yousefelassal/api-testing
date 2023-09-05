# API Testing

## Common error HTTP status codes include:

- 400 Bad Request - This means that client-side input fails validation.
- 401 Unauthorized - This means the user isn't not authorized to access a resource. It usually returns when the user isn't authenticated.
- 403 Forbidden - This means the user is authenticated, but it's not allowed to access a resource.
- 404 Not Found - This indicates that a resource is not found.
- 500 Internal server error - This is a generic server error. It probably shouldn't be thrown explicitly.
- 502 Bad Gateway - This indicates an invalid response from an upstream server.
- 503 Service Unavailable - This indicates that something unexpected happened on server side (It can be anything like server overload, some parts of the system failed, etc.).

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// existing users
const users = [
  { email: 'abc@foo.com' }
]

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const { email } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }
  res.json(req.body);
});


app.listen(3000, () => console.log('server started'));
```

## Allow filtering, sorting, and pagination
Filtering and pagination both increase performance by reducing the usage of server resources. As more data accumulates in the database, the more important these features become.

Here’s a small example where an API can accept a query string with various query parameters to let us filter out items by their fields:

```js
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
```
In the code above, we have the req.query variable to get the query parameters. We then extract the property values by destructuring the individual query parameters into variables using the JavaScript destructuring syntax. Finally, we run filter on with each query parameter value to locate the items that we want to return.

Once we have done that, we return the results as the response. Therefore, when we make a GET request to the following path with the query string:

`/employees?lastName=Smith&age=30`

We get:
```
[
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 30
    }
]
```
as the returned response since we filtered by lastName and age.

Likewise, we can accept the page query parameter and return a group of entries in the position from (page - 1) * 20 to page * 20.

We can also specify the fields to sort by in the query string. For instance, we can get the parameter from a query string with the fields we want to sort the data for. Then we can sort them by those individual fields.

For instance, we may want to extract the query string from a URL like:

http://example.com/articles?sort=+author,-datepublished

Where + means ascending and - means descending. So we sort by author’s name in alphabetical order and datepublished from most recent to least recent.
