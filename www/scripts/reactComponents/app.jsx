import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'

require('../../node_modules/bootstrap/dist/css/bootstrap.css');
const ReactBootstrap = require('react-bootstrap');
const Glyphicon = ReactBootstrap.Glyphicon;

import Shop from './shop';
import Summary from './summary';

class App extends React.Component {

	constructor (props) {
		super(props)
	}

	componentDidMount () {
		if (typeof this.props.onInitialLoad === 'function') {
			this.props.onInitialLoad()
		}	
	}

	////////////////////////////////////////////////////////////////////////////////////////
	//React componentWillMount
	//https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount

	componentWillMount () {
		console.log('App component is mounting');
	}

	//////////////////////////////////////////////
	//Our component event handlers (onClicks, etc)

	onSummaryClick (e) {
		// don't use me, use setStateFromUrl in store instead
	}

	////////////////////////
	//React component render

	render () {

		return (
			<HashRouter>
				<div>
					<nav>
      					<ul>
							<li><Link to='/'>Shop</Link></li>
							<li><Link to='/summary' onClick={this.onSummaryClick}>
									<Glyphicon glyph='gift' />
								</Link></li>
						</ul>

					</nav>
					<Switch>
						<Route exact path='/' render={() =>  
							<Shop 
								list={this.props.items} 
								isLoading={this.props.isLoading}
								addItem={this.props.addItem}
								deleteItem={this.props.deleteItem}
								incItem={this.props.incItem}
							/>
						}/>
						<Route path='/summary' render={() =>  <Summary visitCount={this.props.summaryCount}/>} />
						<Route path='/item' render={() =>  <h3>{this.props.selectedItem.name}</h3>} />
					</Switch>
				</div>
			</HashRouter>
		);
	}
};

//React validates prop types for you - https://facebook.github.io/react/docs/reusable-components.html

App.propTypes = {
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	addItem: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	incItem: PropTypes.func.isRequired
}

// Export a function that kicks the React rendering off (App is our top level React component)

export default App
