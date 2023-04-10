const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

// Homepage is now shared
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile();
// });

app.listen(PORT, () => console.log('Server listening on port %s', PORT));