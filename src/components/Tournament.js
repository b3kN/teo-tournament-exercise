import React, { Component } from 'react';

class Tournament extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orderAscending: true,
			league: props.league,
			tourneyData: null
		};
	}

	componentDidMount() {
		this.getTournamentData();
	}

	getTournamentData() {
		fetch(`https://api.eslgaming.com/play/v1/leagues/${this.state.league}`)
			.then(response => response.json())
			.then(tourneyData => this.setState({ tourneyData }))
			.catch(e => e);
	}

	render() {
		return (
			<div className="tournament-card">
				<div>
					{this.state.tourneyData}
				</div>
			</div>
		);
	}
}

export default Tournament;
