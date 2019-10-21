import React, { useState, Fragment } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import Button from '@material-ui/core/Button'
import { Formik, Field, Form } from 'formik'
import CircularProgress from '@material-ui/core/CircularProgress'

import { TextField } from 'formik-material-ui'

import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Help from '@material-ui/icons/Help'


import { validateEmail, validatePassword } from '../../helpers/validations'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Tooltip from '@material-ui/core/Tooltip'




const BaseAuthForm =  (props) => {

	const [focusField, setFocusField] = useState(window.location.search === '' ? 'email' : 'password')
	const [showPassword, setShowPassword] = useState(false)

	let timeouts = []
	function validateOnTimeout(setFieldTouched, field, timeout) {
		const setFieldTouchedCallback = () => setFieldTouched(field)
		let timeoutId = setTimeout(setFieldTouchedCallback, timeout)
		timeouts.push(timeoutId)
	}

	function clearTimeouts(timeoutsArray) {
		for (let i = 0; i < timeoutsArray.length; i++)
			clearTimeout(timeoutsArray[i])
	}

	const Fields = ( props ) => {

		const styles = {
			iconButtonDisabled: {
				cursor: 'default',
			},
			iconButtonEnabled: {
				cursor: 'pointer',
			},
			icon: {
				width: '15', 
				height: 'auto',
			},
			helpIcon: {
				color: 'red',
			},
		}

		const GridContainerProps = {
			spacing: 6,
			alignItems: 'center',
		}

		const InputFieldProps = {
			component: TextField,
			helperText: ' ',
			margin: "dense",
		}

		const EmailFieldProps = {
			...InputFieldProps,
			name: "email",
			type: "email",
			label: "Email",
			validate: (value) => validateEmail(value, props.userMustExist),
			onFocus: () => validateOnTimeout(props.setFieldTouched, 'email', 5000),
		}

		const PasswordFieldProps = {
			...InputFieldProps,
			name: "password",
			type: showPassword ? 'text' : 'password',
			label: "Password",
			validate: validatePassword,
			InputProps: {
				endAdornment: (
					<InputAdornment position="end">
						<IconButton	onClick={()=>setShowPassword(!showPassword)}>
							{showPassword ? <Visibility style={styles.icon} /> : <VisibilityOff style={styles.icon} />}
						</IconButton>														
					</InputAdornment>
				)
			},
			onFocus: () => validateOnTimeout(props.setFieldTouched, 'password', 5000),
		}

		const Icon = ({ icon, helpText, nextPage }) => {
			return(
				<Tooltip title={helpText} placement="left">
					{icon !== 'help' ? 
						<IconButton style={styles.iconButtonDisabled}>
							{icon === 'email' && <AccountCircle style={styles.icon} />}
							{icon === 'password' && <Lock style={styles.icon} />}
						</IconButton>
						:
						<IconButton style={styles.iconButtonEnabled} onClick={ nextPage ? ()=> props.history.push(nextPage+props.values.email) : null }>
							<Help style={{...styles.icon, ...styles.helpIcon}} />
						</IconButton>
					}
				</Tooltip>
			)
		}

		return (
			<Fragment>
				<Grid container {...GridContainerProps}>
					<Grid item><Icon icon='email' helpText='Your email is your username'/></Grid>
					<Grid item><Field {...EmailFieldProps} autoFocus={focusField === 'email'}/></Grid>
				</Grid>
				<Grid container {...GridContainerProps}>
					<Grid item>
						{props.alternateButton && <Icon icon={props.alternateButton.icon} helpText={props.alternateButton.helpText} nextPage={props.alternateButton.nextPage} />}
						{/* {props.alternateButton && props.submitCount > 0 && !props.isSubmitting ? 
							<Icon icon='help' helpText='Reset password?'/>
							: 
							<Icon icon='password' helpText='Password should be 6-8 characters'/>
						} */}
					</Grid>
					<Grid item><Field {...PasswordFieldProps} autoFocus={focusField === 'password'} /></Grid>
				</Grid>
			</Fragment>
		)
	}

	const Submit = ( props ) => {

		const ProgressProps = {
			color: 'secondary',
			size: 30,
		}

		const ButtonProps = {
			color: 'secondary',
			size: 'small',
			disabled: !props.isValid,
			onClick: props.submitForm,
			variant: 'contained',
		}

		const style = {
			display: 'flex', 
			justifyContent: 'center',
		}
		
		return (
			<div style={style}>
				{props.isSubmitting ?
					<CircularProgress {...ProgressProps}/> 
					:
					<Button {...ButtonProps}>{props.submitButtonText}</Button>
				}
			</div>
		)
	}

	const DialogProps = {
		open: true,
		fullWidth: true,
		maxWidth: 'xs',
		onBackdropClick: () => {clearTimeouts(timeouts); props.history.push('/')},
	}

	const DialogContentTextProps = {
		variant: 'body2',
	}

	function focusNext(values) {
		if      (values.email === '')           setFocusField('email')
		else if (values.password === '')		setFocusField('password')
	}

	return (
		<Dialog {...DialogProps}>	
			<DialogTitle>{props.done ? props.titleAfter : props.titleBefore}</DialogTitle>
			<DialogContent>
				<DialogContentText {...DialogContentTextProps}>{props.done ? props.textAfter : props.textBefore}</DialogContentText>
				<br />
				<Formik
					initialValues={{
						email: window.location.search.replace('?email=',''),
						password: '',
					}}
					isInitialValid={props.isInitialValid}
					onSubmit={(values, actions) => {clearTimeouts(timeouts); props.onSubmit(values, actions)}}
					render={formikProps => 							
						<Form onBlur={() => focusNext(formikProps.values)}>
							{!props.done && <Fields {...props} {...formikProps}/>}
							<br />
							{(!props.done || props.nextAfterDone) && <Submit {...props} {...formikProps}/> }
						</Form>
					}
				>
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

export default BaseAuthForm