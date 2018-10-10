//var React = require('react');
import React from 'react';
import PropTypes from 'prop-types';
var PageHeader = require('react-bootstrap').PageHeader;
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;
var FormControl = require('react-bootstrap').FormControl;

import ItemComponent from './ItemComponent';

class Shop extends React.Component {

	constructor (props) {
		super(props)
		this.state =  {
			itemName:''
		};
	}

	//////////////////////////////////////////////
	//Our component event handlers (onClicks, etc)

	handleNewItemNameKeyUp (e)
	{
		// Allow enter to add new items
		if (e.keyCode === 13)
			this.handleNewItem(e);
	}

	handleNewItemNameChange (e) {
		this.setState({itemName:e.target.value}); 
	}

	handleNewItem () {
		if (this.state.itemName.length)
		{
			this.props.addItem(this.state.itemName); // Actions update store which triggers top level re-rener

			//Clear itemName text input
			this.setState({itemName:''});// set state updates only this component (not top level re-render, although in this case they are almost the same thing) 
		}
		else
			console.warn('Items must have a name');
	}

	////////////////////////
	//React component render

	render () {
		var AddNewItemDivStyle = {display:'flex', maxHeight:'34px'}; //showing my limited CSS skills here - maxHeight just makes the button sit nice

		var AddNewItemButton;
		// Enable / Disable Add Button depending on whether we have an itemName
		if (this.state.itemName.length) {
			AddNewItemButton = <Button bsStyle='success' onClick={() => this.handleNewItem()}>+</Button>;
		}
		else {
			AddNewItemButton = <Button bsStyle='success' disabled>+</Button>;
		}



		// Controlled vs uncontrolled input components - important reading
		// 		https://facebook.github.io/react/docs/forms.html

		// Why <ItemComponent key={item.id}... />  ?
		// 		http://facebook.github.io/react/docs/multiple-components.html#dynamic-children

		// Styling divs - done here two ways, with an object (AddNewItemDivStyle), and an inline object <div style={{...}}>
		// 		http://facebook.github.io/react/tips/inline-styles.html

		return (
			<div style={{padding:'16px 16px', maxWidth:'600px'}}>

				<PageHeader>Let's Pretend We're Going Shopping</PageHeader>

				<Well>
					Add New Item
					<div style={AddNewItemDivStyle}>
						<FormControl type='text' onChange={(e) => this.handleNewItemNameChange(e)} onKeyUp={(e) =>this.handleNewItemNameKeyUp(e)} value={this.state.itemName} />
						{AddNewItemButton}
					</div>
				</Well>
				{// alanb: how do i put an if statment in here so that whether this component displays or not depends on some boolean variable?
				// ans: "https://facebook.github.io/react/tips/if-else-in-JSX.html"
				//       https://reactjs.org/docs/conditional-rendering.html
				}
				{
					this.props.list.map((item) => {
						return (
							<ItemComponent 
								key={item.id} 
								id={item.id} 
								name={item.name} 
								value={item.value}
								deleteItem={this.props.deleteItem}
								incItem={this.props.incItem}
							/>
						);
					})
				}
				{
					this.props.isLoading ? (
						<h3>Loading</h3>
					) : (
						<span/>
					)
				}
			</div>
		);
	}
};

//React validates prop types for you - https://facebook.github.io/react/docs/reusable-components.html

Shop.propTypes = {
	list: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	incItem: PropTypes.func.isRequired
}

export default Shop;
