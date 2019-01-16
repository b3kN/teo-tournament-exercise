import React, { Component } from 'react';

class Matches extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.league,
			contestants: [],
			results: []
		};
	}

	componentDidMount() {
		var corsBypass = "https://cors-anywhere.herokuapp.com/";

		fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/results`)
			.then(response => response.json())
			.then(data => this.setState({ results: data }))
			.catch(e => console.log('error', e));

		console.log('Successfully gathered results for league ' + this.state.id);

		fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/contestants`)
			.then(response => response.json())
			.then(data => this.setState({ contestants: data }))
			.catch(e => console.log('error', e));

		console.log('Successfully gathered contestants for league ' + this.state.id);
	}

	render() {
		return (
			<div className="matches-holder">
				Lorem Ipsum...
			</div>
		);
	}
}

export default Matches;
