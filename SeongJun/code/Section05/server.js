const express = require('express');

const PORT = 8080;
const HOST = "0.0.0.0"

const app = express();
app.get('/', (req, res) => {
  res.send('Hello bb!');
})

app.listen(PORT, HOST, ()=>{
  console.log(`Server running at http://${HOST}:${PORT}/`);
});


