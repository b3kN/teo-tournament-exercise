import React from 'react';

const Header = props => (
	<header style={{ marginBottom: 10 }}>
		<div>
			<span className="header"> {props.title} </span>
		</div>

		<div className="subheader-body">
			<span className="subheader"> Written by <a className="link" href="https://github.com/b3kN">@b3kN</a>. </span>
		</div>
	</header>
);

export default Header;
