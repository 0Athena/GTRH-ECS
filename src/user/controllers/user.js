const { statusCodes, Exception } = require('utils');
const UserService = require('../services/user');

module.exports = {
	create: async (req, res) => {
		const data = req.body;
		const user = await new UserService(data).createUser();
		res.status(statusCodes.CREATED).send({ msg: 'CREATED', data: user });
	},
	// getById: async (req, res) => {
	// 	const userId = req.params.id;
	// 	const data = await UserService.getInfo(userId);
	// 	res.status(statusCodes.OK).send({ msg: 'OK', data });
	// },
};
