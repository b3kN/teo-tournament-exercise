import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tournament from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Tournament Component', () => {
	let tournament;

	it('renders without crashing', () => {
		shallow(<Tournament id="test" />);
	});

	it('creates holder div for tournament header information', () => {
		tournament = mount(<Tournament id="test" />);

		expect(tournament.find('.header-holder').length).toEqual(1);
	});

	it('header holder contains default title string', () => {
		tournament = mount(<Tournament id="test" />);

		expect(tournament.find('.header-holder').text()).toEqual("Tournament Data Loading...");
	});
});
