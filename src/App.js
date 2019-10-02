import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import LandingPage from './Routes/LandingPage'
import LoginForm from './Routes/Auth/LoginForm'
import LogoutForm from './Routes/Auth/LogoutForm'
import RegisterForm from './Routes/Auth/RegisterForm'
import RegisterConf from './Routes/Auth/RegisterConf'
import ResetForm from './Routes/Auth/ResetForm'
import ResetConf from './Routes/Auth/ResetConf'
import PrivateRoute from './Routes/PrivateRoute'
import Home from './Routes/Home'
import Build from './Routes/Build/Build'



import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'

import HotTubIcon from '@material-ui/icons/HotTub'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import HelpIcon from '@material-ui/icons/Help'
import AddIcon from '@material-ui/icons/AddCircle'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'


import Typography from '@material-ui/core/Typography'
import { theme } from './theme'

import { BuildContextProvider } from './Routes/Build/BuildContext'


export default () => {

	const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated'))

	const AppBarSmart = () => {

		const [tabValue, setTabValue] = useState(window.location.pathname)

		const tabGroup1 = isAuthenticated ? ['/home', '/build'] : ['/about']
		const tabGroup2 = isAuthenticated ? ['/about', '/logout'] : ['/login', '/register']

		const AuthTabs1 = () => (
			<Tabs value={window.location.pathname === tabValue && tabGroup1.includes(window.location.pathname) ? tabValue : false} onChange={(event, value) => setTabValue(value)}>
				<Tab icon={<HomeIcon />} value='/home' label="Home" component={Link} to="/home" />
				<Tab icon={<AddIcon />} value='/build' label="Build" component={Link} to="/build" />
			</Tabs>
		)

		const AuthTabs2 = () => (
			<Tabs value={window.location.pathname === tabValue && tabGroup2.includes(window.location.pathname) ? tabValue : false} onChange={(event, value) => setTabValue(value)}>
				<Tab icon={<HelpIcon />} value='/about' label="About Me" component={Link} to="/about" />
				<Tab icon={<CloseIcon />} value='/logout' label="Log Out" component={Link} to="/logout" />
			</Tabs>
		)
		
		const NoAuthTabs1 = () => (
			<Tabs value={window.location.pathname === tabValue && tabGroup1.includes(window.location.pathname) ? tabValue : false} onChange={(event, value) => setTabValue(value)}>
				<Tab icon={<HelpIcon />} value='/about' label="About Me" component={Link} to="/about" />
			</Tabs>
		)

		const NoAuthTabs2 = () => (
			<Tabs value={window.location.pathname === tabValue && tabGroup2.includes(window.location.pathname) ? tabValue : false} onChange={(event, value) => setTabValue(value)}>
				<Tab icon={<FingerprintIcon />} value='/login' label="Log In" component={Link} to="/login" />
				<Tab icon={<HotTubIcon />} value='/register' label="Register" component={Link} to="/register" />
			</Tabs>
		)


		return (
			<AppBar>
				<Toolbar>
					<Grid container justify='flex-start'>
						{!isAuthenticated ? <NoAuthTabs1 /> : <AuthTabs1 />}
					</Grid>
					<Grid container justify='flex-end'>
						{!isAuthenticated ? <NoAuthTabs2 /> : <AuthTabs2 />}
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}

	return (    
		// <Router style={styles.div}>
		<Router>
			<AppBarSmart />
			<Switch>
				<Route exact path='/' component={!isAuthenticated ? LandingPage : Home} />
				<Route exact path='/login' render={(props) => <LoginForm {...props} setIsAuthenticated={setIsAuthenticated} />} />
				<Route path="/register" component={RegisterForm} />
				<Route path='/registerConfirmed' component={RegisterConf} />
				<Route path='/reset' component={ResetForm} />
				<Route path='/resetConfirmed' component={ResetConf} />
				{/* <Route path='/about' render={(props) => <Redirect {...props} to='https://cv.jsalaz1989.now.sh/' />} /> */}
				<Route path='/about' component={() => {window.location.href = 'https://cv.jsalaz1989.now.sh/'; return null;}}/>
				<PrivateRoute path='/home' component={Home} isAuthenticated={isAuthenticated} />
				{/* <PrivateRoute path='/build' component={Build} isAuthenticated={isAuthenticated}/> */}
				<Route exact path='/build' render={(props) => <BuildContextProvider {...props}><Build {...props} /></BuildContextProvider>} />
				<PrivateRoute path='/logout' component={LogoutForm} isAuthenticated={isAuthenticated}/>
			</Switch>
			<Typography color='textSecondary' align='center' className='foot' style={{ backgroundColor: theme.palette.primary.main }}>j++ &copy; 2019</Typography>
        </Router>
    )
}