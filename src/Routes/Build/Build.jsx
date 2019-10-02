import React, { useState, useMemo } from 'react'
import ComponentsDrawer from './ComponentsDrawer'

import { theme } from '../../theme' 

import Paper from '@material-ui/core/Paper'

import './Build.css'



import DnDApp from './DnD/DnDApp'

import Grid from '@material-ui/core/Grid'

import IconButton from '@material-ui/core/IconButton'
import UpArrow from '@material-ui/icons/KeyboardArrowUp'
import DownArrow from '@material-ui/icons/KeyboardArrowDown'
import Save from '@material-ui/icons/Save'
import PlayArrow from '@material-ui/icons/PlayArrow'

import Input from '@material-ui/core/Input'

import { useContext } from 'react'
import { ChipInsContext, ChipOutsContext, GatesContext, WiresContext, SelectedElementContext } from './BuildContext'


import { handleDragOver, addRemoveChipTerminal, validateInputs, handleClick, handleKeyDown } from './BuildFuncs'

import ItemTypes from './ItemTypes'

export default () => {

	const [shift, setShift] = useState(0)
	// const [dragAreaVisible, setDragAreaVisible] = useState(false)

	// const context = useContext(AppDataContext)
	// const { gates, setGates, wires, setWires, chipIns, setChipIns, chipOuts, setChipOuts, selectedElement, setSelectedElement } = context
	
	const [chipIns, setChipIns] = useContext(ChipInsContext)
	const [chipOuts, setChipOuts] = useContext(ChipOutsContext)
	const [gates, setGates] = useContext(GatesContext)
	const [wires, setWires] = useContext(WiresContext)
	// const [selectedElement, setSelectedElement] = useContext(SelectedElementContext)
	const [selectedElement, setSelectedElement] = useState(null)


	const percent = 0.6

	const styles = {
		header: {
			backgroundColor: theme.palette.primary.main,
			// minHeight: '90vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'top',
			color: theme.palette.primary.contrastText,
			marginLeft: shift,
			paddingTop: 30,
		},
		headerTitle: {
			fontSize: 'calc(14px + 2vmin)',
			textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
			position: 'relative',
			top: '-35px',
		},
		headerSubtitle: {
			fontSize: 'calc(6px + 2vmin)',
			position: 'relative',
			top: '-55px',
		},
		paper: {
			// top: -30, 
			width: 1600*percent, 
			height: 900*percent, 
			position: 'relative', 
			// zIndex: 9999, 
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center',
			textAlign: 'center',
			marginTop: 5,
			marginBottom: 5,
		},
	}	
	
	const Row = ({ columns }) => (
		<Grid container spacing={0} justify='space-around' alignItems='center'
		onClick={evt=>handleClick(evt, setSelectedElement)}
					onKeyDown={evt=>handleKeyDown(evt, gates, setGates, wires, setWires, selectedElement, setSelectedElement)} 
				    // tabIndex="0"
		>
			<Grid item className='viewGridMed' md={3} children={columns[0]} style={{ pointerEvents: columns[0].props.type === 'Inputs' ? 'none' : 'all' }} />
			<Grid item className='viewGridMed' md={6} children={columns[1]} />
			<Grid item className='viewGridMed' md={3} children={columns[2]} style={{ pointerEvents: columns[2].props.type === 'Outputs' ? 'none' : 'all' }} />
		</Grid>
	)


	

	const TerminalHeadings = ({ title, chipInOuts, setChipInOuts }) => (
		<Grid container justify='center' alignItems='center' spacing={2}>
			<Grid item>
				<Grid container direction='column' justify='center'>
					<Grid item>
						<IconButton 
							children={<UpArrow fontSize='small' />} 
							size='small' 
							onClick={()=>addRemoveChipTerminal(title, chipInOuts, setChipInOuts, 'inc', gates, setGates, wires, setWires)} 
						/>
					</Grid>
					<Grid item>
						{Object.keys(chipInOuts).length}
					</Grid>
					<Grid item>
						<IconButton 
							children={<DownArrow fontSize='small' />} 
							size='small' 
							onClick={()=>addRemoveChipTerminal(title, chipInOuts, setChipInOuts, 'dec', gates, setGates, wires, setWires)} 
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>{title}</Grid>
		</Grid>
	) 

	const Inputs = ({ name }) => {

		function handleMouseUpIn(inputName) {

			const floatingWireName = localStorage.getItem('floatingWireName')
			console.log('Build > Inputs > handleMouseUpIn() : floatingWireName = ', floatingWireName)

			let newChipIns = { ...chipIns }
			console.log('Build > Inputs > handleMouseUpIn() : newChipIns = ', newChipIns)
			console.log('Build > Inputs > handleMouseUpIn() : inputName = ', inputName)
			console.log('Build > Inputs > handleMouseUpIn() : newChipIns[inputName] = ', newChipIns[inputName])

			newChipIns[inputName].connectedTo = floatingWireName.replace('floatingWire_', '')

			setChipIns(newChipIns)
		}

		const [strokeColor, setStrokeColor] = useState('black')

		console.log('Build > Inputs : name = ', name)

		return (
			<svg width='100' height='12' viewBox='0 0 100 10'>
				<text                
					// id={id+'Text'}
					// strokeWidth='1'
					x={name.length === 3 ? '12' : '6'} y='80%' 
					fontSize='11' 
					// fontWeight='100'
					fill='grey'  
				>
					{name}
				</text>
				<text                
					// id={id+'Text'}
					// strokeWidth='1'
					x='40' y='80%' 
					fontSize='12' 
					// fontWeight='100'
					fill='white'  
				>
					{chipIns[name].value}
				</text>
				<line 
					id={name} 
					x1='60' y1='5' x2='100' y2='5' 
					stroke={strokeColor}
					strokeWidth='5'
					pointerEvents='all'
					onMouseOver={()=>setStrokeColor(theme.palette.primary.light)}
					onMouseOut={()=>setStrokeColor('black')}
					onMouseUp={()=>handleMouseUpIn(name)}
				/>  
			</svg>
		)
	}

	const Outputs = ({ name }) => {
		const [strokeColor, setStrokeColor] = useState('black')

		return (
			<svg width='100' height='12' viewBox='0 0 100 10'>
				<line 
					id={name} 
					x1='0' y1='5' x2='40' y2='5' 
					stroke={strokeColor}
					strokeWidth='5'
					pointerEvents='all'
					onMouseOver={()=>setStrokeColor(theme.palette.primary.light)}
					onMouseOut={()=>setStrokeColor('black')}
									/>  
				<text                
					// id={id+'Text'}
					// strokeWidth='1'
					x={name.length === 4 ? '57' : '52'} y='80%' 
					fontSize='11' 
					// fontWeight='100'
					fill='grey'  
				>
					{name}
				</text>
				<text                
					// id={id+'Text'}
					// strokeWidth='1'
					x='92' y='80%' 
					fontSize='12' 
					// fontWeight='100'
					fill='white'  
				>
					{chipOuts[name].value}
				</text>
			</svg>
		)
	}

	const Terminals = ({ chipInOuts }) => (
		<Grid container direction='column' justify='center' alignItems='center' className='viewGridMed'>
			{Object.keys(chipInOuts).map(child => 
				<Grid item 
					className='viewGridSmall' 
					key={child} 
					children={ 
						Object.keys(chipInOuts)[0].includes(ItemTypes.CHIP_IN) 
							? <Inputs name={child} /> 
							: <Outputs name={child} /> 
					} 
				/>)}
		</Grid>
	)

	const [inputValue, setInputValue] = useState('')

	
	const TerminalValues = ({ title }) => {

		if (title === 'Inputs') {
			const inputsVals = Object.values(chipIns)
			const numInputs = inputsVals.length

			return <Input autoFocus inputProps={{ style: {textAlign: 'center', color: inputValue.length < numInputs ? 'grey' : 'white' }, maxLength: numInputs }} value={inputValue} onChange={evt=>validateInputs(evt.target.value, chipIns, setChipIns, setInputValue)}></Input> 
		}
		else if (title === 'Outputs') {

			let val = ''
			const outputsVals = Object.values(chipOuts)
			const numOutputs = outputsVals.length

			for (let i = 0; i < numOutputs; i++) 
				val = val.concat(outputsVals[numOutputs-1-i].value)

			console.log('Build > TerminalValues : val = ', val)

			return <Input readOnly inputProps={{ style: {textAlign: 'center'} }} value={val}></Input>
		}
	}

	const SaveButton = () => (
		<IconButton children={<Save fontSize='large' />} onClick={()=>console.log('trying to save...')} />
	)

	const PlayButton = () => (
		<IconButton children={<PlayArrow fontSize='large' />} onClick={()=>console.log('trying to run...')} />
	)


	// eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(()=>updateWires(wires, setWires), [gates, inputs])

	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => addChipTerminalNode(chipIns, chipOuts, gates, setGates), [chipIns, chipOuts])
	

	// console.log('Build : context = ', context)
	console.log('Build : chipIns = ', chipIns)
	console.log('Build : gates = ', gates)
	console.log('Build : wires = ', wires)    
	console.log('Build : selectedElement = ', selectedElement)


return useMemo(()=>{
	return (
		// <BuildContextProvider>
			<div 
				style={styles.header} 
				onDragOver={handleDragOver} 
				// onClick={evt=>handleClick(evt, setSelectedElement)}
			>
				<ComponentsDrawer setShift={setShift} />
				<Paper 
					id='paper' 
					style={styles.paper} 
					

				>
					<Grid container direction='column' justify='space-between' spacing={0} className='viewGridLarge' style={{ height: "100%", paddingBottom: 20, paddingTop: 7 }}>
						<Row 
							columns={[
								<TerminalHeadings title='Inputs' chipInOuts={chipIns} setChipInOuts={setChipIns} />,
								<SaveButton />, 
								<TerminalHeadings title='Outputs' chipInOuts={chipOuts} setChipInOuts={setChipOuts} />
							]}
					// 		onClick={evt=>handleClick(evt, setSelectedElement)}
					// onKeyDown={evt=>handleKeyDown(evt, gates, setGates, wires, setWires, selectedElement, setSelectedElement)} 
				    // tabIndex="0" 
						/>
						<Row 
							columns={[
								<Terminals type='Inputs' chipInOuts={chipIns} />,
								<DnDApp selectedElement={selectedElement} />, 
								<Terminals type='Outputs' chipInOuts={chipOuts} />
							]} 
						/>
						<Row columns={[<TerminalValues title='Inputs' />, <PlayButton />, <TerminalValues title='Outputs' />]} />
					</Grid>
				</Paper>
			</div>
		// </BuildContextProvider>
	)
}, [gates, wires, chipIns, chipOuts, selectedElement])
}