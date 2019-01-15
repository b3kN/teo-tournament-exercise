import React, { Component } from 'react';
import Matches from './Matches';

class Tournament extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.league,
			name: null,
			start: null
		};
	}

	componentDidMount() {
		var corsBypass = "https://cors-anywhere.herokuapp.com/";

		fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}`)
			.then(response => response.json())
			.then(data => this.setState({ name: data.name.full, start: data.timeline.inProgress.begin }))
			.catch(e => console.log('error', e));
	}

	render() {
		return (
			<div className="tournament-card">
				<div className="tournament-header">
					<h4>
						{this.state.name}
					</h4>
					<h5>
						{this.state.start}
					</h5>
				</div>
				<Matches league={this.state.id} />
			</div>
		);
	}
}

export default Tournament;
