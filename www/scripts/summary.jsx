//var React = require('react');
import React from 'react';

class Summary extends React.Component {

	// propTypes: {
	// 	visitCount:React.PropTypes.number.isRequired
	// },

	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div>
				<p>Hi</p>
				<p>Visted {this.props.visitCount} times</p>
			</div>
		);
	}
};

export default Summary;
