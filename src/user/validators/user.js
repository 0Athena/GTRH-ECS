const { body, query } = require('express-validator');
const {
	validator: { chainBuilder, commonChain },
} = require('utils');

const create = chainBuilder([
	commonChain.phoneRequired(body('mobileNumber')),
	commonChain.stringRequired(body(['firstName', 'lastName', 'occupation', 'city', 'country', 'location'])),
	commonChain.emailRequired(body('email')),
	commonChain.isInRequired(body('role'), ['user', 'admin', 'superAdmin']),
	commonChain.isInRequired(body('prayerTimeMethod'), [
		'MuslimWorldLeague',
		'Egyptian',
		'Karachi',
		'UmmAlQura',
		'Dubai',
		'Qatar',
		'Kuwait',
		'MoonsightingCommittee',
		'Singapore',
		'Turkey',
		'Tehran',
		'NorthAmerica',
		'Other',
	]),
	commonChain.isInRequired(body('madhab'), ['Shafi', 'Hanafi']),
	commonChain.stringOptional(body('website')),
	body(['lng', 'lat'])
		.exists()
		.withMessage('Field is required')
		.bail()
		.isDecimal()
		.withMessage('Field must be a decimal number'),
]);

const update = chainBuilder([
	commonChain.stringOptional(body(['firstName', 'lastName', 'occupation', 'city', 'country', 'website', 'location'])),
	commonChain.phoneOptional(body('mobileNumber')),
	commonChain.emailOptional(body('email')),
	commonChain.isInOptional(body('prayerTimeMethod'), [
		'MuslimWorldLeague',
		'Egyptian',
		'Karachi',
		'UmmAlQura',
		'Dubai',
		'Qatar',
		'Kuwait',
		'MoonsightingCommittee',
		'Singapore',
		'Turkey',
		'Tehran',
		'NorthAmerica',
		'Other',
	]),
	commonChain.isInOptional(body('madhab'), ['Shafi', 'Hanafi']),
	body(['lng', 'lat']).optional().isDecimal().withMessage('Field must be a decimal number'),
]);

const updateById = chainBuilder([
	commonChain.params.id,
	commonChain.phoneOptional(body('mobileNumber')),
	commonChain.stringOptional(body(['firstName', 'lastName', 'occupation', 'city', 'country', 'location'])),
	commonChain.emailOptional(body('email')),
	commonChain.isInOptional(body('role'), ['user', 'admin', 'superAdmin']),
	commonChain.isInOptional(body('prayerTimeMethod'), [
		'MuslimWorldLeague',
		'Egyptian',
		'Karachi',
		'UmmAlQura',
		'Dubai',
		'Qatar',
		'Kuwait',
		'MoonsightingCommittee',
		'Singapore',
		'Turkey',
		'Tehran',
		'NorthAmerica',
		'Other',
	]),
	commonChain.isInOptional(body('madhab'), ['Shafi', 'Hanafi']),
	commonChain.stringOptional(body('website')),
	body(['lng', 'lat']).optional().isDecimal().withMessage('Field must be a decimal number'),
]);

const createSymptoms = chainBuilder([
	commonChain.arrayRequired(body('symptoms')),
	commonChain.isInRequired(body('symptoms.*'), ['travelled']),
]);
const getUserPayments = chainBuilder([
	commonChain.pagination,
	commonChain.isInOptional(query('targetType'), [
		'zakatUlMal',
		'zakatUlFtr',
		'givings',
		'meals',
		'masjids',
		'masjidEvents',
	]),
	commonChain.integerOptional(query('userId')),
	commonChain.integerOptional(query('targetId')),
	commonChain.dateOptional(query('createdAt')),
]);

const getList = chainBuilder([commonChain.pagination]);
const getById = chainBuilder([commonChain.params.id]);
const deleteById = chainBuilder([commonChain.params.id]);

module.exports = {
	create,
};
