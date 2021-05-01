const express = require('express');
const path = require('path');

const { exit } = require('process');
const {
	database: { sequelize, initModels, associateModels, syncModels },
	Exception,
	argv,
	loggers: { createHttpLogger },
	catchAsync,
} = reuqire('utilties');

const init = async (app) => {
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json({ limit: '50mb' }));
	app.use(express.text({ limit: '50mb' }));
	app.use(require('./camelCaseTransformer'));
	app.use('/static', express.static(path.join(__dirname, '..', 'asset')));
	app.use(createHttpLogger());

	// app.use('/auth', require('./auth/router'));

	require('./swagger')(app);

	// app.use('/public', require('./publicRouter'));

	// const accessTokenVerifier = require('./auth/controllers/auth').accessTokenVerifier(true);

	// app.use(catchAsync(accessTokenVerifier));

	// app.use(require('./router'));

	app.use(Exception.requestDefaultHandler);

	initModels();
	associateModels();
	if (argv.sync) {
		let syncOptions = { alter: true };
		if (argv.force) {
			syncOptions = { force: true };
			await sequelize.getQueryInterface().dropAllTables();
		}
		await syncModels(syncOptions);
		exit(0);
	}
};

module.exports = init;
