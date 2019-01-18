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
							let result = new Result(item.beginAt, [], item.state);

							// console.log('Create new result item for current item', result);

							item.participants.forEach(p => {
								let team = this.state.contestants.find(c => c.id === p.id);

								if (team) {
									let participant = new Participant(team.name, p.points[0], p.place);

									// console.log('Add participant to current result item', participant);

									result.participants.push(participant);
								}
							});

							tempResults.push(result);
						});

						return tempResults;
					}).then(finalResults => {
						console.log('finalResults', finalResults);

						if (finalResults.length > 0) {
							finalResults.sort(function (a, b) {
								return new Date(a.date) - new Date(b.date);
							});

							this.setState({ results: finalResults });
						}

						// console.log('Final matches list:', this.state.results);
					});
			}).catch(e => console.log('Error while fetching league results', e));
	}

	render() {
		return (
			<div className="testing">
				TESTING...
			</div>
		);
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
