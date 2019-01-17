import React, { Component } from 'react';
import Matches from './../Matches';
import moment from 'moment';

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
			.then(data => this.setState({ name: data.name.full, start: moment(data.timeline.inProgress.begin).format("Qo MMMM YYYY") }))
			.catch(e => console.log('error', e));
	}

	render() {
		return (
			<div className="tournament-card">
				<div className="tournament-header">
					<div className="header-holder">
						<h4>
							{this.state.name}
						</h4>
						<span className="start-date">
							{this.state.start}
						</span>
					</div>
				</div>
				<Matches league={this.state.id} />
			</div>
		);
	}
}

export default Tournament;
