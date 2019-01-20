import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("Application", () => {
	let app;

	it("renders without crashing", () => {
		shallow(<App />);
	});

	it("creates holder div for tournament information cards", () => {
		app = mount(<App />);

		expect(app.find(".tournaments-holder").length).toEqual(1);
	});
});
