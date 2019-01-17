import React from 'react';
import ReactDOM from 'react-dom';
import Tournament from './';

describe('Tournament Component', () => {
	it('renders without crashing', () => {
		const tournament = document.createElement('div');
		ReactDOM.render(<Tournament id="00000" />, tournament);
	});
});