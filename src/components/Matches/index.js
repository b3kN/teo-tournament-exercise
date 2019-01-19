import React, { Component } from 'react';

class Matches extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: props.league,
			results: null,
			contestants: null
		};
	}

	componentDidMount() {
		this.getTournamentResults();
	}

	getTournamentResults() {
		const corsBypass = "https://cors-anywhere.herokuapp.com/";

		fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/contestants`)
			.then(response => response.json())
			.then(teams => this.setState({ contestants: teams }))
			.then(() => {
				fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/results`)
					.then(response => response.json())
					.then(data => {
						let tempResults = [];

						data.forEach(item => {
							let result = new Result(item.beginAt, null, item.state),
								participants = [];

							// console.log('Create new result item for current item', result);

							item.participants.forEach(p => {
								let team = this.state.contestants.find(c => c.id === p.id),
									participant;

								if (team) {
									participant = new Participant(team.name, p.points[0], p.place);
								} else {
									participant = new Participant("Team Not Found", p.points[0], p.place);
								}

								console.log('Add participant to current result item', participant);

								participants.push(participant);
							});

							participants.sort(function (a, b) {
								return b.place - a.place;
							});

							console.log('Participant list for current result item', participants);

							result.participants = participants;

							tempResults.push(result);
						});

						return tempResults;
					}).then(finalResults => {
						// console.log('finalResults', finalResults);

						if (finalResults.length > 0) {
							finalResults.sort(function (a, b) {
								return new Date(a.date) - new Date(b.date);
							});

							this.setState({ results: finalResults });
						}

						this.setState({ loading: false });

						console.log('Final matches list:', this.state.results);
					});
			}).catch(e => console.log('Error while fetching league results', e));
	}

	render() {
		if (this.state.loading) {
			return (
				<h3>Loading Matches...</h3>
			);
		} else {
			return (
				<div className="results-holder">
					{this.state.results.map((match, m) => {
						return (
							<div key={m} className="match-holder">
								{match.participants.map((team, t) => {
									return (
										<div key={t} className="team-line">
											{team.name}
											<span style={{ float: 'right' }}>
												{team.score}
											</span>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			);
		}
	}
}

class Result {
	constructor(date, participants, state) {
		this.date = date;
		this.participants = participants;
		this.state = state;
	}
}

class Participant {
	constructor(name, score, place) {
		this.name = name;
		this.score = score;
		this.place = score;
	}
}
	
export default Matches;