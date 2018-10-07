var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Actions = require('./actions');
import { Link } from 'react-router-dom'
var Panel = ReactBootstrap.Panel;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var ItemComponent = React.createClass({

	//React validates prop types for you - https://facebook.github.io/react/docs/reusable-components.html
	
	propTypes: {
		name:React.PropTypes.string.isRequired,
		value:React.PropTypes.number.isRequired,
		id:React.PropTypes.number.isRequired
	},
	
	incItem: function()
	{
		Actions.incItem({id:this.props.id, inc:1});
	},

	decItem: function()
	{
		Actions.incItem({id:this.props.id, inc:-1});
	},

	deleteItem: function()
	{
		Actions.deleteItem({id:this.props.id});
	},

	render: function ()
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
								<Button onClick={this.decItem}>-</Button>
								<Button onClick={this.incItem}>+</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button onClick={this.deleteItem}><Glyphicon glyph='remove' /></Button>
							</ButtonGroup>
						</ButtonToolbar>
					</div>
				</Panel>
		);
	}
});

module.exports = ItemComponent;