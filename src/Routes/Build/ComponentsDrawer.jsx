import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Memory from '@material-ui/icons/Memory';

import Typography from '@material-ui/core/Typography'

import { theme } from '../../theme'

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Nand from '../../Gates/Nand'
import { renderToStaticMarkup } from 'react-dom/server';

import ItemTypes from './ItemTypes'

const ComponentsDrawer = ({ setShift }) => {

	const [open, setOpen] = useState(false)

	// const [expanded, setExpanded] = useState({ zero: false })
	const [expanded, setExpanded] = useState({ zero: false })

	let drawerWidth = theme.overrides.MuiDrawer.paper.width
	
	const styles = {
		open: {
			// height: '30px',
			zIndex: 100,
		},
		closed: {
			// width: '70%',
			// zIndex : -100,
		},
        header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
			// display: 'flex',
			// flexDirection: 'column',
			// alignItems: 'center',
			// justifyContent: 'top',
			color: theme.palette.primary.contrastText,
		},
		chapter: {
			fontSize: '0.7em'
		},
		component: {

		},
		drawerHeader: {
			backgroundColor: theme.palette.primary.dark, 
			width: drawerWidth,
			zIndex: 9999,
			position: "fixed",
			top: 85,	
			left: 0,
			borderBottomStyle: 'solid',
			borderBottomWidth: '1px',
			borderBottomColor: theme.palette.primary.light,
		},
		logo: {
			// animation: 'App-logo-spin infinite 20s linear',
			// height: '20vmin',
			width: 100,
			// pointerEvents: 'auto',
			// cursor: 'grab',
			// animationTextContent: '@keyframes App-logo-spin { from{transform: rotate(0deg);} to{transform: rotate(360deg);} }',
			fill: theme.palette.primary.light,
			// position: 'absolute',
			// top: gatePosition.top-50,
			// left: gatePosition.left-231.58/2,
			// zIndex: 99999,
		},
	}	
		
	// var img = new Image() 
	// img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png'
	// img.src = require('./fav.png')
	// img.src = require(Nand(styles.logo))


	var img = new Image();
	const svgString = renderToStaticMarkup(
        <svg style={styles.logo} xmlns="http://www.w3.org/2000/svg" mlns="http://www.w3.org/2000/svg" >
			<Nand style={styles.logo} divWrap={false} />
		</svg>
	)
	let blob = new Blob([svgString], {type: 'image/svg+xml'});
	let url = URL.createObjectURL(blob);
	img.src = url;
	img.addEventListener('load', () => URL.revokeObjectURL(url), {once: true});
	img.width = 100
	img.height = 100

	// console.log('img = ', img)


	function handleDragStart(evt) {
		console.log('ComponentsDrawer > handleDragStart() : evt.target.id = ', evt.target.id)
		evt.dataTransfer.setData('text/plain', evt.target.id)
		evt.dataTransfer.setDragImage(img, img.width/2, img.height/2)
	}

	const ExpandedDrawer = () => (
			<Drawer style={styles.open} open={open} width={drawerWidth} BackdropProps={{ invisible: true }} onClose={() => setOpen(false)}>
				<div
					tabIndex={0}
					role="button"
					onClick={() => console.log('onClick')}
					onKeyDown={() => console.log('onKeyDown')}
					style={{
						position: "relative",
						overflow: "auto",
					}}
				>
					<Grid style={styles.drawerHeader} container alignItems='center' justify='space-around'>
						<Grid item>
							<Memory style={{ color: 'white', display: 'inline' }} />
						</Grid>
						<Grid item>
							<Typography style={{ transform: 'translate(7px, -1px)' }}>MY COMPONENTS</Typography> 
						</Grid>
						<Grid item>
							<IconButton onClick={()=> {setOpen(false); setShift(0)}}>
								<ChevronLeft />
							</IconButton>
						</Grid>
					</Grid>					
					<List style={{ marginTop: '40px' }}>
						<ListItem button key='Nand Gate' onClick={() => setExpanded({zero: !expanded.zero})}>
							<Typography style={{ position: 'relative', left: '8px', }}>0</Typography>
							<ListItemText primary='Nand Gate' style={{ position: 'relative', left: '23px', }} />
						</ListItem>
						{expanded.zero && 
							<div style={{ backgroundColor: '#b596c5', overflowX: 'hidden' }}>
								<ListItem id={'new'+ItemTypes.NAND} button key={ItemTypes.NAND} draggable onDragStart={(evt) => handleDragStart(evt)}>
									<ListItemText style={{ position: 'relative', left: '33px' }} secondary='Nand' id='nand' />				
								</ListItem>
								<ListItem button key='Nand2'>
									<ListItemText style={{ position: 'relative', left: '33px' }} secondary='Nand2' />			
								</ListItem>
							</div>
						}	
						<Divider />
						{['Basic Gates', 'Arithmetic', 'Memory', 'Machine Language', 'Computer Architecture', 'Assembler'].map((text, index) => (
							<ListItem button key={text}>
								<Typography style={{ position: 'relative', left: '8px', }}>{index+1}</Typography>
								<ListItemText primary={text} style={{ position: 'relative', left: '8px', }} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{['Virtual Machine I', 'Virtual Machine II', 'High-Level Language', 'Compiler I', 'Compiler II', 'Operating System', 'More Fun'].map((text, index) => (
							<ListItem button key={text}>
								<Typography style={{ position: 'relative', left: index+7 <= 9 ? '8px' : '0px'}}>{index+7}</Typography>
								{/* <Typography>{index+7 <= 9 ? <span>&nbsp;&nbsp;{index+7}</span> : index+7 }</Typography> */}
								<ListItemText primary={text} style={{ position: 'relative', left: index+7 <= 9 ? '8px' : '0px'}} />
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>
	)

	const CollapsedDrawer = () => (
		<div style={{ backgroundColor: theme.palette.primary.dark, width: '35px', position: 'absolute', left: '0', top: '85px', bottom: '0' }}>
			<Button style={{ width: '162px', height: '35px', transform: 'rotate(90deg) translate(62px,62px)' }} onClick={() => {setOpen(true); setShift(drawerWidth)}}>
				<Grid container alignItems='center'>
					<Grid item>
						<Memory style={{ color: 'white', display: 'inline' }} />
					</Grid>
					<Grid item>
						<Typography style={{ transform: 'translate(62px, 62px)' }}>My Components</Typography> 
					</Grid>
				</Grid>
			</Button>
		</div>
	)

	return (
		<div>
			<CollapsedDrawer />
			<ExpandedDrawer />
		</div>
	)
}

export default ComponentsDrawer;