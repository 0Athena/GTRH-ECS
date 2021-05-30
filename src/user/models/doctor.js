const { DataTypes } = require('sequelize');
const {
	database: { sequelize, BaseModel },
} = require('utils');
const userModel = require('./user');

class Doctor extends userModel {
	static associate() {}

	static initialize() {
		User.init(
			{
				specialty: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				sequelize,
			}
		);
	}
}

Doctor.register();

module.exports = Doctor;
