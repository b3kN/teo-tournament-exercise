import React, { Component } from 'react';
import Tournament from './components/Tournament';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor (props) {
		super(props);

		this.state = { tourneyData: null };
  }

  render() {
		return (
			<div className="app">
				<Header title="Tournament Exercise" />

				<Tournament league="177160" />
				<Tournament league="177161" />
				<Tournament league="185553" />
			</div>
		);
	}
}

export default App;
