const { Exception, statusCodes } = require('utils');
const UserModel = require('../models/user');
const { Op } = require('sequelize');
const _ = require('lodash');

class User {
	constructor(data) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.email = data.email;
	}
	async createUser() {
		if (await User.isDuplicated(this.email))
			throw new Exception(statusCodes.DUPLICATED_ENTRY, 'A user with this email is already registered');
		return await this.save();
	}
	async save() {
		return UserModel.create(this);
	}

	static async isDuplicated(email) {
		return (
			(await UserModel.count({
				where: { [Op.and]: [{ email }] },
			})) > 0
		);
	}
}

module.exports = User;
