const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const initRoute = require('./src/routes/index');
const cors = require('cors');
const path = require('path');

app.use(cors());
dotenv.config({ path: path.join(__dirname, './.env') });
connectDB.connect();

//Middeware

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

initRoute(app);

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running!');
});
