import React from "react";

const Header = (props) => (
	<header>
		<h1> {props.title} </h1>

		<div className="subheader">
			Written by <a href="https://github.com/b3kN">@b3kN</a>
		</div>
	</header>
);

export default Header;
