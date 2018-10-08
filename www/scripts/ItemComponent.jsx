var React = require('react');
var ReactBootstrap = require('react-bootstrap');
import { incItem, deleteItem } from './storeCtrl/actions';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
var Panel = ReactBootstrap.Panel;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

const mapDispatchToProps = (dispatch) => {
  return {
  	incItem: (id, val) => dispatch(incItem(id, val)),
  	deleteItem: (id) => dispatch(deleteItem(id))
  }
};

var ItemComponent = React.createClass({

	//React validates prop types for you - https://facebook.github.io/react/docs/reusable-components.html
	
	propTypes: {
		name:React.PropTypes.string.isRequired,
		value:React.PropTypes.number.isRequired,
		id:React.PropTypes.number.isRequired
	},
	
	incItem: function()
	{
		this.props.incItem(this.props.id, 1);
	},

	decItem: function()
	{
		this.props.incItem(this.props.id, -1);
	},

	deleteItem: function()
	{
		this.props.deleteItem(this.props.id);
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

module.exports = connect(null, mapDispatchToProps)(ItemComponent);