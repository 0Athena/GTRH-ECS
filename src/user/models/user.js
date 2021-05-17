const { DataTypes } = require('sequelize');
const {
	database: { sequelize, BaseModel },
} = require('utils');

class User extends BaseModel {
	static associate() {}

	static initialize() {
		User.init(
			{
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				name: {
					type: new DataTypes.VIRTUAL(DataTypes.STRING, ['firstName', 'lastName']),
					get: function () {
						return this.get('firstName') + ' ' + this.get('lastName');
					},
				},
				role: {
					type: new DataTypes.ENUM('user', 'superAdmin'),
					allowNull: false,
					defaultValue: 'user',
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				birth: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				address: {
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

User.register();

module.exports = User;
