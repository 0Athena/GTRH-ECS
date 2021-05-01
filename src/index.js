const express = require('express');
require('dotenv').config();
const config = require('config');
const http = require('http');
const {
	database: { sequelize },
	Exception,
} = require('utils');

sequelize
	.authenticate()
	.then(async () => {
		const app = express();
		await require('./app')(app);

		const httpServer = http.createServer(app);
		const port = config.get('port');

		httpServer.listen(port, () => {
			console.info(`Server is listening on port ${port}`);
		});
	})
	.catch(Exception.defaultHandler);
