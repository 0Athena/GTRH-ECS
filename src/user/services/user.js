const { Exception, statusCodes } = require('utils');
const UserModel = require('../models/user');
const { Op } = require('sequelize');
const _ = require('lodash');

class User {
	constructor(data) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.email = data.email;
		this.phoneNumber = data.phoneNumber;
		this.birth = data.birth;
		this.phoneNumber = data.phoneNumber;
		this.address = data.address;
	}
	async createUser() {
		if (await User.isDuplicatedEmail(this.email))
			throw new Exception(statusCodes.DUPLICATED_ENTRY, 'A user with this email is already registered');
		return await this.save();
	}
	async save() {
		return UserModel.create(this);
	}

	static async isDuplicatedEmail(email) {
		return (
			(await UserModel.count({
				where: { [Op.and]: [{ email }] },
			})) > 0
		);
	}
	static async isDuplicatedPhone(phoneNumber) {
		return (
			(await UserModel.count({
				where: { [Op.and]: [{ phoneNumber }] },
			})) > 0
		);
	}
}

module.exports = User;
