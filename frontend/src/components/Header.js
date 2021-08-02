import React from 'react';
import headerStyle from '../css/headerStyle.css';
import logo from '../assets/images/nasa_logo.png';


function Header(props) {
	
	return (
		<div className='header'>
			<img src={logo} className='logo-img'></img>
		</div>
	)
}

export default Header;