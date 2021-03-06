import React, { Component } from "react";
import moment from "moment";

class Result {
	constructor(time, participants, state) {
		this.time = time;
		this.participants = participants;
		this.state = state;
	}
}

class Participant {
	constructor(name, score, place) {
		this.name = name;
		this.score = score;
		this.place = place;
	}
}

class Matches extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			sortAscending: true,
			id: props.league,
			results: null,
			contestants: null
		};

		this.reverseSortOrder = this.reverseSortOrder.bind(this);
	}

	componentDidMount() {
		this.getTournamentResults();
	}

	getTournamentResults() {
		const corsBypass = "https://cors-anywhere.herokuapp.com/";

		fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/contestants`)
			.then((response) => response.json())
			.then((teams) => this.setState({ contestants: teams }))
			.then(() => {
				fetch(corsBypass + `https://api.eslgaming.com/play/v1/leagues/${this.state.id}/results`)
					.then((response) => response.json())
					.then((data) => {
						let tempResults = [];

						data.forEach((item) => {
							let result = new Result(moment(item.beginAt).format("h:mm"), null, item.state),
								participants = [];

							item.participants.forEach((p) => {
								let team = this.state.contestants.find((c) => c.id === p.id),
									participant;

								if (team) {
									participant = new Participant(team.name, p.points[0], p.place);
								} else {
									participant = new Participant("Team Not Found", p.points[0], p.place);
								}

								participants.push(participant);
							});

							participants.sort(function (a, b) {
								return a.place - b.place;
							});

							result.participants = participants;

							tempResults.push(result);
						});

						return tempResults;
					}).then((finalResults) => {
						if (finalResults.length > 0) {
							finalResults.sort(function (a, b) {
								return new Date(a.date) - new Date(b.date);
							});

							this.setState({ results: finalResults });
						}

						this.setState({ loading: false });
					});
			}).catch(function (e) {
				console.log("An error was encountered while fetching league results data", e);
			});
	}

	reverseSortOrder() {
		this.setState((state) => ({
			sortAscending: !state.sortAscending,
			results: state.results.reverse()
		}));
	}

	render() {
		if (this.state.loading) {
			return (
				<h3>Matches data loading...</h3>
			);
		} else {
			return (
				<div className="results-holder">
					<div className="sort-holder">
						<button className="date-sort right" onClick={this.reverseSortOrder}>
							Date
							<span className={this.state.sortAscending ? "arrow" : "arrow reverse"} />
						</button>
					</div>
					{this.state.results.map((match, m) => {
						return (
							<div key={m} className="match-holder">
								<div className="start-time">
									{match.time}
								</div>
								{match.participants.map((team, t) => {
									let classes = t === 0 ? "team-line victor" : "team-line";

									return (
										<div key={t} className={classes}>
											{team.name}
											<span style={{ float: "right" }}>
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
	
export default Matches;