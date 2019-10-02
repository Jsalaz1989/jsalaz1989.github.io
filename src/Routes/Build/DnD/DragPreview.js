import React from 'react'
import { DragLayer } from 'react-dnd'

import Nand from '../../../Gates/Nand'
import Node from '../../../Gates/Node'
import { getTerminalPoint } from '../WireHelpers'

import { useContext } from 'react'
import { WiresContext } from '../BuildContext'

const dragOpacity = 0.3

// Generate preview with proper rotation and offsets from mouse cursor
const draggedGateStyle = (item, currentOffset) => {

    // console.log('DragPreview > defaultStyle() : item = ', item)

    const gate = document.getElementById(item.id)
    // console.log('DragPreview > defaultStyle() : gate = ', gate)

    const gateParent = gate.parentElement
    // console.log('DragPreview > defaultStyle() : gateParent = ', gateParent)

    const transform = gateParent.transform
    // console.log('DragPreview > defaultStyle() : transform = ', transform)
    
    const rotation = transform.baseVal['1'].angle
    // console.log('DragPreview > defaultStyle() : rotation = ', rotation)
    
    // Calculate proper offsets
    //TODO: make dynamic?
    let left, top
    if (!item.id.includes('Node')) {
        switch(rotation) {
            case 0:
                left = 0
                top = -25
                break
            case 90:
                left = -150
                top = 75
                break
            case 180:
                left = -200
                top = -75
                break
            case 270:
                left = -100
                top = -125
                break
            default:
                break
        }
    }
    else if (item.id.includes('Node')) {
        switch(rotation) {
            case 0:
                left = -45
                top = -45
                break
            case 90:
                left = -150
                top = 75
                break
            case 180:
                left = -200
                top = -75
                break
            case 270:
                left = -100
                top = -125
                break
            default:
                break
        }
    }

    return (
        {
            left: currentOffset.x+left,
            top: currentOffset.y+top,
            position: 'fixed',
            opacity: dragOpacity,
            transform: `rotate(${rotation}deg)`,
        }
    )
}

const overlaySvgStyle = () => {

    // Needed to imitate position of Target's svg, must be calculated here and not outside this function
    const svgBbox = document.getElementById('svg').getBoundingClientRect()
    const paperBbox = document.getElementById('paper').getBoundingClientRect()

    //TODO: see if some of these can be placed in theme and be shared with Target svg
    return (
        {
            opacity: dragOpacity,
            // imitate Target svg border to supperpose that svg with this one perfectly
            borderWidth: 3,
            borderStyle: 'dashed',
            borderColor: 'red',
            borderRadius: 3,
            // backgroundColor: 'red',
            position: 'absolute',
            left: svgBbox.left-paperBbox.left,
            top: svgBbox.top-paperBbox.top,
            zIndex: 1999,   // set original zindex in theme and then use it here + 1 ? doesn't seem to have much an effect but it also might fix pointer events while dragging
            width: svgBbox.width,
            height: svgBbox.height

        }
    )
}

//TODO: see if you can do without this, or maybe use ItemTypes
const gateTypes = {
    'Node': Node,
    'Nand': Nand
}

function getConnectedWires(gateId, wires) {
    // console.log('DragPreview > getConnectedWires() : gateId = ', gateId)
    // console.log('DragPreview > getConnectedWires() : wires = ', wires)

    const wireIds = Object.keys(wires)
    // console.log('DragPreview > getConnectedWires() : wireIds = ', wireIds)

    let connectedWires = {}
    wireIds.forEach(wireId => {
        // console.log('DragPreview > getConnectedWires() : wireId = ', wireId)
        
        if (wireId.includes(gateId)) {
            connectedWires[wireId] = {
                from: {x: null, y: null}, 
                to: {x: null, y: null}
            }
        }

    })
    // console.log('DragPreview > getConnectedWires() : connectedWires = ', connectedWires)

    return connectedWires
}

function moveConnectedWires(gateId, wires, currentOffset) {
    // console.log('DragPreview > moveConnectedWires() : gateId = ', gateId)
    // console.log('DragPreview > moveConnectedWires() : wires = ', wires)

    const wireIds = Object.keys(wires)
    let newWires = wires
    wireIds.forEach(wireId => {

        console.log('DragPreview > moveConnectedWires() : wireId = ', wireId)
        
        const fromId = wireId.split('_')[0]
        const toId = wireId.split('_')[1]
        console.log('DragPreview > moveConnectedWires() : fromId = ', fromId)
        console.log('DragPreview > moveConnectedWires() : toId = ', toId)

        const from = document.getElementById(fromId)
        const to = document.getElementById(toId)
        console.log('DragPreview > moveConnectedWires() : from = ', from)
        console.log('DragPreview > moveConnectedWires() : to = ', to)

        if (!from && !to) return

        const fromPoint = getTerminalPoint(from)
        const toPoint = getTerminalPoint(to)
        console.log('DragPreview > moveConnectedWires() : fromPoint = ', fromPoint)
        console.log('DragPreview > moveConnectedWires() : toPoint = ', toPoint)


        const bboxGate = document.getElementById(gateId).getBoundingClientRect()
        // console.log('DragPreview > moveConnectedWires() : bboxGate = ', bboxGate)

        const diff = {
            x: currentOffset.x-bboxGate.x, 
            y: currentOffset.y-bboxGate.y
        }

        if (fromId.includes(gateId)) {
            newWires[wireId] = {
                from: {x: fromPoint.x+diff.x, y: fromPoint.y+diff.y}, 
                to: {x: toPoint.x, y: toPoint.y}
            } 
        }
        else if (toId.includes(gateId)) {
            newWires[wireId] = {
                from: {x: fromPoint.x, y: fromPoint.y},
                to: {x: toPoint.x+diff.x, y: toPoint.y+diff.y} 
            } 
        }           
    })

    return newWires
}


const DragPreview = ({ isDragging, currentOffset, item }) => {

    // eslint-disable-next-line no-unused-vars
    const [wires, setWires] = useContext(WiresContext)

    // console.log('DragPreview : item = ', item)

    let Gate
    let connectedWires = {}
    let draggedWires = {}
    if (isDragging && currentOffset) {
        const type = item.id.replace(/[0-9]/g, '')      // deduce gate type from id
        // console.log('DragPreview > DragPreview() : id = ', id)
        
        Gate = gateTypes[type]                          // convert string to function
        //TODO: see if you can do without gateTypes
        // Gate = document.getElementById(item.id)  

        connectedWires = getConnectedWires(item.id, wires)     // get all wires connected to currently dragged gate
        // console.log('DragPreview > DragPreview() : connectedWires = ', connectedWires)
    
        draggedWires = moveConnectedWires(item.id, connectedWires, currentOffset)   // follow gate with all attached wires 
    }

    // console.log('DragPreview : draggedWires = ', draggedWires)

    // Only render preview while dragging and if requested (likely always the case)
    return (
        !isDragging || !currentOffset || !item.withDragPreview ?
            null
            :
            <>
                {/* The gate preview */}
                <svg style={draggedGateStyle(item, currentOffset)}>
                    <Gate id={item.id} />
                </svg>

                {/* The wire preview */}
                {/* Overlay a copy of Target's svg */}
                <svg style={overlaySvgStyle()}>
                    {Object.keys(draggedWires).map(id => {
                        const { from, to } = draggedWires[id]
                        return (
                            <line 
                                key={id}
                                id={id}
                                stroke='black' //TODO: get from theme?
                                strokeWidth='3'  
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                style={{ pointerEvents: 'none' }}
                            />
                        )
                    })}
                </svg>
            </>
    )
}

// The rest is react-dnd mumbo-jumbo

export default DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))(DragPreview)

