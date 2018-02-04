const express = require('express');
const router = require('./articles');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'articles')));

app.set('view engine', 'ejs');

app.use('/', router);

/*
app.get('/', (req, res) => {
  res.send('/foo');
});
*/
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});































//const router = require('./articles'); // nóg að skilgreina router í articles
/*1. lesa .md sk´rarnar
  lesa innihald möppu
  búa til js object útfrá .md
  2. búa til routes
  * router silgreindur í articles.js, vísað í app.js
  * skilgreina virkni fyrir '/' og '/:slug' ekki harðkóða, auk villusíðna(404,500)
  3. Skrifa EJS templates
  4.skrifa CSS


  efst         ->> const readdir = util.promisify(fs.readdir);

  í async fall ->> const filelist = await readdir('slóð/á/möppu')
*/

/*
const app = express();



app.use('/', router);
app.get('/', (req, res) => {
  res.send({title: 'lasdf'},`
    title: 'la'<br>
    method: ${req.method}<br>
    url: ${req.url}<br>
    originalUrl: ${req.originalUrl}<br>
    ip: ${req.ip}<br>
    protocol: ${req.protocol}<br>
    hostname: ${req.hostname}<br>
    query: ${JSON.stringify(req.query)}<br>
    <br>
    User-agent: ${req.get('User-agent')}<br>
    Host: ${req.get('Host')}<br>
    <br>
    accepts json? ${req.accepts('json')}<br>
    accepts foo? ${req.accepts('foo')}<br>
  `);
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
