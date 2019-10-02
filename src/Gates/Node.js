import React, { useState } from 'react'

// import './Node.css'

import { theme } from '../theme'

import ItemTypes from '../Routes/Build/ItemTypes'

export default ({ id, stroke, fill }) => {

    const [terminalColor, setTerminalColor] = useState(stroke)

    console.log('Node : id = ', id)
    // console.log('Node : ItemTypes.CHIP_IN = ', ItemTypes.CHIP_IN)

    // console.log('Node : !id.includes(ItemTypes.CHIP_IN) && !id.includes(ItemTypes.CHIP_OUT) = ', !id.includes(ItemTypes.CHIP_IN) && !id.includes(ItemTypes.CHIP_OUT))



    return (
        <g id={id}>
            {!id.includes(ItemTypes.CHIP_IN) && !id.includes(ItemTypes.CHIP_OUT) ? 
                <circle 
                    id={id+ItemTypes.BODY} 
                    className="draggable confine"
                    cx='50' cy='50' r='5'
                    stroke={stroke}
                    fill={fill}
                />
                : 
                null
            }
            <circle 
                id={id+ItemTypes.NODE_CENTER} 
                // className="draggable confine"
                cx='50' cy='50' 
                r={id.includes(ItemTypes.CHIP_IN) || id.includes(ItemTypes.CHIP_OUT) ? '5' : '2'}
                stroke={terminalColor}
                fill={terminalColor}
                onMouseOver={()=>setTerminalColor(theme.palette.primary.light)}
                onMouseOut={()=>setTerminalColor('black')}
            />
        </g> 
    )       
}