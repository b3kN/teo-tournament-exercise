import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./";

Enzyme.configure({ adapter: new Adapter() });

describe("Header Component", () => {
	const header = shallow(<Header title="Tournament Exercise" />);

	it("renders with default title", () => {
		expect(header.find("h1").text().trim()).toEqual("Tournament Exercise");
	});

	it("renders with standard sub-title", () => {
		expect(header.find(".subheader").text().trim()).toEqual("Written by @b3kN");
	});
});
