'use strict';

module.exports = (sequelize, type) => {
	return sequelize.define('mapInfo', {
		id: {
			type: type.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		description: type.STRING,
		numBonuses: type.INTEGER,
		numCheckpoints: type.INTEGER,
		numStages: type.INTEGER,
		difficulty: type.INTEGER
	})
};