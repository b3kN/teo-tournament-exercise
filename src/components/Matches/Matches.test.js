import React from 'react';
import ReactDOM from 'react-dom';
import Matches from './';

describe('Matches Component', () => {
	it('renders without crashing', () => {
		const matches = document.createElement('div');
		ReactDOM.render(<Matches league="00000" />, matches);
	});
});