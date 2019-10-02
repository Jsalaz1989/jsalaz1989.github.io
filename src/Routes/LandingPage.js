import React from 'react'

import { theme } from '../theme' 

import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Logo from '../svgLogo';


const LandingPage = () => {

    const styles = {
		header: {
			backgroundColor: theme.palette.primary.main,
			minHeight: '60vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.palette.primary.contrastText,
		},
		headerTitle: {
			fontSize: 'calc(14px + 2vmin)',
			textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
		},
		headerSubtitle: {
			fontSize: 'calc(6px + 2vmin)',
		},
		headerButton: {
			color: theme.palette.primary.light,
		},
		logo: {
			animation: 'App-logo-spin infinite 20s linear',
			height: '30vmin',
			pointerEvents: 'none',
			animationTextContent: '@keyframes App-logo-spin { from{transform: rotate(0deg);} to{transform: rotate(360deg);} }',
            fill: theme.palette.primary.light,
            animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
		},
		headerAboutMe: {
			fontSize: 'calc(1px + 2vmin)',
			marginTop: '110px',
		},
    }	

    var createdStyleTag = document.createElement("style");
	createdStyleTag.textContent = styles.logo.animationTextContent
	document.body.appendChild(createdStyleTag);

    const NavButton = ({ to, text }) => {
        return <Button style={styles.headerButton} component={Link} to={to}>{text}</Button>;
    }

    
    return (
        <header style={styles.header}>
            <Logo style={styles.logo}/>
            <p style={styles.headerTitle}>
                Welcome to the <code>Nand2Tetris</code> App 
            </p>
            <p style={styles.headerSubtitle}>
                Please <NavButton to='/login' text='Log In'/> or <NavButton to='/register' text='Register'/> 
            </p>
            <p style={styles.headerAboutMe}>
                You may also learn a little bit <NavButton to='/about' text='About N2T'/>
            </p>
        </header>
    )
}

export default LandingPage