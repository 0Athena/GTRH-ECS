const { BaseModel } = require('utils/database');

const camelCaseKeys = (obj) => {
	if (obj instanceof BaseModel) obj = obj.toJSON();

	if (!_.isObject(obj) || obj instanceof Date) {
		return obj;
	} else if (_.isArray(obj)) {
		return obj.map((v) => camelCaseKeys(v));
	}
	return _.reduce(
		obj,
		(r, v, k) => {
			return {
				...r,
				[_.camelCase(k)]: camelCaseKeys(v),
			};
		},
		{}
	);
};

const middleware = (req, res, next) => {
	var json = res.json;
	res.json = function (data) {
		const r = camelCaseKeys(data);
		// console.log(r);
		json.call(this, r);
	};
	next();
};

module.exports = middleware;
