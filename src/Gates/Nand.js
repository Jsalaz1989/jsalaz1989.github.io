import React, { useState } from 'react'

import './Nand.css'     //TODO: move draggable to Source.css or something

import { gateStyle } from '../theme'

import ItemTypes from '../Routes/Build/ItemTypes'

// Nand gate receives id from addGate() and attaches specific gate parts
export default ({ id }) => {

    // Keep track of which terminal is highlighted
    const [terminalColors, setTerminalColors] = useState({
        [id+ItemTypes.GATE_IN+'A']: gateStyle.stroke,
        [id+ItemTypes.GATE_IN+'B']: gateStyle.stroke,
        [id+ItemTypes.GATE_OUT]: gateStyle.stroke,
    })

    // Modify only the terminal being mouserOver'd or mouseOut'd
    function highlight(terminalId, color) {
        let newTerminalColors = { ...terminalColors }
        newTerminalColors[terminalId] = color
        setTerminalColors(newTerminalColors)
    }

    return (
        <g                              // provides default style (basically for the path and cirlce only)
            id={id}                                     // needed so we can refer to its parent in DragPreview
            stroke={gateStyle.stroke} 
            strokeWidth={gateStyle.gateStrokeWidth} 
            fill={gateStyle.fill}
        >     
            <path 
                id={id+ItemTypes.BODY} className='draggable'
                d='M 20,25 L 47,25 C 75,30 75,70 47,75 L 20,75 Z'
            />   
            <circle cx='75' cy='50' r='7' />  
            <line 
                id={id+ItemTypes.GATE_IN+'A'} 
                x1='0' y1='35' x2='20' y2='35' 
                onMouseOver={()=>highlight(id+ItemTypes.GATE_IN+'A', gateStyle.fill)}
                onMouseOut={()=>highlight(id+ItemTypes.GATE_IN+'A', gateStyle.stroke)}
                stroke={terminalColors[id+ItemTypes.GATE_IN+'A']}
            />  
            <line 
                id={id+ItemTypes.GATE_IN+'B'} 
                x1='0' y1='65' x2='20' y2='65' 
                onMouseOver={()=>highlight(id+ItemTypes.GATE_IN+'B', gateStyle.fill)}
                onMouseOut={()=>highlight(id+ItemTypes.GATE_IN+'B', gateStyle.stroke)}
                stroke={terminalColors[id+ItemTypes.GATE_IN+'B']}
            />  
            <line 
                id={id+ItemTypes.GATE_OUT} 
                x1='83' y1='50' x2='100' y2='50' 
                onMouseOver={()=>highlight(id+ItemTypes.GATE_OUT, gateStyle.fill)}
                onMouseOut={()=>highlight(id+ItemTypes.GATE_OUT, gateStyle.stroke)}
                stroke={terminalColors[id+ItemTypes.GATE_OUT]}
            />    
            <text 
                id={id+ItemTypes.TEXT}
                strokeWidth={gateStyle.textStrokeWidth}
                x='30' y='54' 
                fontSize={gateStyle.textFontSize}
                fontWeight={gateStyle.textFontWeight}
            >
                {id}
            </text>    
        </g>
    )
}