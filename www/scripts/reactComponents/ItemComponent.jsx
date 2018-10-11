import React from 'react' ;
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import * as RS from 'reactstrap'
var ButtonToolbar = RS.ButtonToolbar;
var ButtonGroup = RS.ButtonGroup;
var Button = RS.Button;
var Glyphicon = RS.Glyphicon;

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

		let elemStyle = {padding:'4px 16px', backgroundColor:'#ffffee'};
		let toolbarStyle = {float: "right"}
		let pillStyle = {float: "right", minWidth:'30px'}
		let colStyle = {display: "flex", "alignItems": 'center'}

		return (
				<RS.Card className='mb-2'>
					<RS.CardHeader>{'List Item ID ' + this.props.id}</RS.CardHeader>
					<RS.CardBody>
						<RS.Row>
							<RS.Col className='col-md-9 col-sm-8 col-xs-6' style={elemStyle}>
								<Link to={`/item/${this.props.id}`}>{this.props.name}</Link>:
							</RS.Col>
							<RS.Col className='col-md-3 col-sm-4 col-xs-6' style={colStyle}>
								<RS.Badge color="info" className='mr-2' pill style={pillStyle}>{this.props.value}</RS.Badge>
								<ButtonToolbar style={toolbarStyle}>
									<ButtonGroup>
										<Button onClick={() => this.decItem()}>-</Button>
										<Button onClick={() => this.incItem()}>+</Button>
									</ButtonGroup>
									<ButtonGroup className='ml-1'>
										<Button color='danger' onClick={() => this.deleteItem()}>x{
										//<Glyphicon glyph='remove' />
										}</Button>
									</ButtonGroup>
								</ButtonToolbar>
							</RS.Col>
						</RS.Row>
					</RS.CardBody>
				</RS.Card>
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
