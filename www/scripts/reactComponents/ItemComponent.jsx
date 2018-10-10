import React from 'react' ;
import PropTypes from 'prop-types';
var ReactBootstrap = require('react-bootstrap');
import { Link } from 'react-router-dom'
var Panel = ReactBootstrap.Panel;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

// pure component implements a default "shouldComponentUpdate" method
// the method shallow compares props and state with previous props and previous state
// it will not re-render if no prop/state has changed.
class ItemComponent extends React.PureComponent {

	constructor (props) {
		super(props)
	}
	
	incItem ()
	{
		this.props.incItem(this.props.id, 1);
	}

	decItem ()
	{
		this.props.incItem(this.props.id, -1);
	}

	deleteItem ()
	{
		this.props.deleteItem(this.props.id);
	}

	render  ()
	{
		//Watch out for React's camel-casing of CSS parameters - http://facebook.github.io/react/tips/inline-styles.html

		var containerStyle = {display:'flex', justifyContent:'space-between'};
		var elemStyle = {padding:'4px 16px', backgroundColor:'#ffffee'};

		return (
				<Panel bsSize='xsmall' header={'List Item ID ' + this.props.id}>
					<div style={containerStyle}>
						<div style={elemStyle}>
							<Link to={`/item/${this.props.id}`}>{this.props.name}</Link>: <b>{this.props.value}</b>
						</div>
						<ButtonToolbar>
							<ButtonGroup>
								<Button onClick={() => this.decItem()}>-</Button>
								<Button onClick={() => this.incItem()}>+</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button onClick={() => this.deleteItem()}><Glyphicon glyph='remove' /></Button>
							</ButtonGroup>
						</ButtonToolbar>
					</div>
				</Panel>
		);
	}
};

//React validates prop types for you - https://facebook.github.io/react/docs/reusable-components.html

ItemComponent.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	incItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired
}

export default ItemComponent;
