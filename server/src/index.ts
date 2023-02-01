
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const routers = require('./routes');
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middleware/filepath.middleware');
const path = require('path');

const corsMiddleWare = require('./middleware/cors.middleware')
const cors = require('cors')

const PORT = process.env.PORT || config.get('serverPort')

const app = express();

app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'static')))

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(corsMiddleWare)

app.use('/api', routers)

app.listen(PORT, async () => {
	await mongoose.connect(config.get('DBUrl'))
	console.log(`Server started on port ${PORT}`)
});
