//var React = require('react');
import React from 'react';
var Actions = require('./actions');

var Summary = React.createClass({

	propTypes: {
		list:React.PropTypes.array.isRequired
	},



	render: function() {


		return (
			<div>
				Hi
			</div>
		);
	}
});

module.exports = Summary;
