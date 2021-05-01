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
			},
			{
				sequelize,
				indexes: [{ fields: ['email'], unique: true }],
			}
		);
	}
}

User.register();

module.exports = User;
