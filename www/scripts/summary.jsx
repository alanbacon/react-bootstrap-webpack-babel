//var React = require('react');
import React from 'react';
var Actions = require('./actions');

var Summary = React.createClass({

	propTypes: {
		visitCount:React.PropTypes.number.isRequired
	},

	render: function() {


		return (
			<div>
				<p>Hi</p>
				<p>Visted {this.props.visitCount} times</p>
			</div>
		);
	}
});

module.exports = Summary;
