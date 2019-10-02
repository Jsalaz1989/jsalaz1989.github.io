import React from 'react'
import PropTypes from 'prop-types'

// import ItemTypes from './ItemTypes'
import { DragSource } from 'react-dnd'

import Nand from '../../../Gates/Nand'
import Node from '../../../Gates/Node'
import { theme } from '../../../theme'

import ItemTypes from '../ItemTypes'

//TODO: consider using general ItemTypes for this?
const gateTypes = {
    [ItemTypes.CHIP_IN+ItemTypes.NODE]: Node,
    [ItemTypes.CHIP_OUT+ItemTypes.NODE]: Node,
    [ItemTypes.NODE]: Node,
    [ItemTypes.NAND]: Nand
}

// Functions ran right before drag
const boxSource = {

    // Gather info on dragged item
    beginDrag({ id, left, top, }, monitor, component) {
        console.log('Source > boxSource > beginDrag() : id = ', id)
        return { id, left, top, withDragPreview: true }
    },

    // Don't allow gate drag while dragging floatingWire
    canDrag(props, monitor) {
        console.log('Source > boxSource > beginDrag() : props.floatingWire = ', props.floatingWire)
        return !props.floatingWire
    }
}

// General container for draggable gates/nodes
const Source = ({ hideSourceOnDrag, left, top, rotation, connectDragSource, isDragging, id, selected=false }) => {

    console.log('Source : id = ', id)

    if (isDragging && hideSourceOnDrag) return

    // Ensure nodes are never rotated
    if (id.includes(ItemTypes.NODE)) rotation = 0

    // Adjust dragged gate position with respect to mouse cursor
    //TODO: make values dynamic *maybe play around with transformOrigin more?)
    switch(rotation) {
        // case 0:
        //     left = left
        //     top = top - 50
        case 90:
            left = left + 95
            top = top + 5
            break
        case 180:
            left = left + 85
            top = top + 100
            break
        case 270:
            left = left - 5
            top = top + 95
            break
        default:
            break
    }

    const translation = `${left} ${top}`
    // console.log('Source : translation = ', translation)

    const type = id.replace(/[0-9]/g, '')       // deduce gate type from id
    // console.log('Source : type = ', type)

    //TODO: see if you can use general ItemTypes
    const Gate = gateTypes[type]                // convert string to function
    // console.log('Source : Gate = ', Gate)

    // console.log('Source : selected = ', selected)

    // Svg tag needed only to define filter
    return connectDragSource(
        <svg>
            {console.log('Source: connectDragSource() : id = ', id)}
            {/* Define glow effect */}
            <defs>
                <filter id="glow" x="-20" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>

            {/* Wrap gate with g tag to move it around and apply filter */}
            <g 
                transform={`translate(${translation}) rotate(${rotation})`} 
                filter={ selected ? "url(#glow)" : null}
            >
                <Gate 
                    id={id} 
                    stroke={ selected ? theme.palette.primary.light : 'black' } 
                    fill={ selected ? theme.palette.primary.light : 'black' }
                />
            </g>
        </svg>
    )
}

// The rest is all react-dnd mumbo-jumbo

Source.propTypes= {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
    children: PropTypes.node
}

const connect = (connect, monitor) => (
    {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
)

//TODO: see if it should really be ItemTypes.BOX, or maybe even something else?
export default DragSource(ItemTypes.CSV, boxSource, connect)(Source)