import React, { useState } from 'react'
import { theme } from '../../../theme'


export default ({ id, floatingWire, creatingNode, from, to, setCreatingNode, selected }) => {
    
    console.log('Wire : floatingWire = ', floatingWire)

    const [strokeColor, setStrokeColor] = useState('black')

    return (
        <svg>
            <defs>
                <filter id="f1" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>
            <line 
                key={id}
                id={id}
                // stroke={
                //     (floatingWire && floatingWire.includes(id)) ||
                //     (creatingNode === id) ||
                //     selected
                //         ? 'purple' 
                //         : 'black'
                // }  
                stroke={selected ? theme.palette.primary.light : strokeColor}
                opacity={floatingWire && floatingWire.name.includes(id) ? 0.3 : 1 }
                strokeWidth='3' 
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{ pointerEvents: floatingWire ? 'none' : 'all', boxShadow:'10px 10px' }} //TODO: get floatingWire from Context?
                onMouseOver={()=>{setCreatingNode(id); setStrokeColor(theme.palette.primary.light)}}
                onMouseOut={()=>{setCreatingNode(null); setStrokeColor('black')}}
                filter={ selected ? "url(#f1)" : null}
            />
        </svg>
    )
}