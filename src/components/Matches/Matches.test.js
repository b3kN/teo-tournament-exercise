import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Matches from "./";

Enzyme.configure({ adapter: new Adapter() });

describe("Tournament Component", () => {
	let tournament;

	it("renders without crashing", () => {
		shallow(<Matches league="test" />);
	});

	it("creates holder div for tournament header information", () => {
		tournament = mount(<Matches league="test" />);

		expect(tournament.find("h3").length).toEqual(1);
	});

	it("matches contains default title string", () => {
		tournament = mount(<Matches league="test" />);

		expect(tournament.find("h3").text()).toEqual("Matches data loading...");
	});
});
