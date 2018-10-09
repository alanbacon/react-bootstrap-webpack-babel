//var React = require('react');
import React from 'react';
import PropTypes from 'prop-types';

class Summary extends React.Component {

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

Summary.propTypes = {
	visitCount: PropTypes.number.isRequired
}

export default Summary;
