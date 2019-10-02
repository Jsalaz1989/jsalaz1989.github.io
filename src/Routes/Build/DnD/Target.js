import React, { useState } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

import ItemTypes from './ItemTypes'
import Source from './Source'
import { DropTarget } from 'react-dnd'

import Wire from './Wire'

import { theme } from '../../../theme'

import Node from '../../../Gates/Node'

import { useContext } from 'react'
import { GatesContext, WiresContext, FloatingWireContext, SelectedElementContext } from '../BuildContext'


import { 
    handleDrop, 
    handleDoubleClick, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp
} from './TargetFuncs'



let percent = 0.6
let factor = 0.7
const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 1600*percent*factor,
    height: 900*percent*factor,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.light,
    borderRadius: 3,
    zIndex: 1001,
}

const boxTarget = {
    drop(props, monitor, component) {   // component is null when using functional components so I can't do component.moveBox, needs Target to be a class so I had to workaround
        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)

        moveBox(item.id, left, top)
    }
}

let moveBox = () => null  // global variable to rewrite in Target but used in boxTarget

const Target = ({ hideSourceOnDrag, connectDropTarget, selectedElement }) => {

    const [creatingNode, setCreatingNode] = useState(null) //TODO: check if needed

    const [gates, setGates] = useContext(GatesContext)
    const [wires, setWires] = useContext(WiresContext)
    const [floatingWire, setFloatingWire] = useContext(FloatingWireContext)
    // const [floatingWire, setFloatingWire] = useState(null)  // musn't include in context because it rerenders a lot of higher components
    // const [selectedElement, setSelectedElement] = useContext(SelectedElementContext)

    console.log('Target : gates = ', gates)
    console.log('Target : wires = ', wires)
    console.log('Target : floatingWire = ', floatingWire)
    console.log('Target : selectedElement = ', selectedElement)


    
    moveBox = (id, left, top) => {
        setGates(update(gates, {
            [id]: {
                $merge: {
                    left: left,
                    top: top
                }
            }
        }))
    }

    return connectDropTarget(
        <svg 
            id='svg' 
            xmlns="http://www.w3.org/2000/svg"
            style={styles} 
            onDrop={evt=>handleDrop(evt, gates, setGates)} 
            onDoubleClick={evt=>handleDoubleClick(evt, gates, setGates, wires, setWires)} 
            onMouseDown={evt=>handleMouseDown(evt, wires, setWires, setFloatingWire)}
            onMouseMove={evt=>handleMouseMove(evt, floatingWire, setFloatingWire)}
            onMouseUp={evt=>handleMouseUp(evt, wires, setWires, floatingWire, setFloatingWire)}                         
        >
            {Object.keys(wires).map(id => {
                const { from, to } = wires[id]
                return (
                    <Wire
                        key={id}
                        id={id}
                        from={from}
                        to={to}
                        floatingWire={floatingWire}
                        creatingNode={creatingNode} //TODO: check if needed
                        setCreatingNode={setCreatingNode} //TODO: check if needed
                        selected={selectedElement === id ? true : false}
                    />
                )
            })}
            {floatingWire &&
                <line
                    // id={ItemTypes.FLOATING_WIRE}
                    x1={floatingWire.from.x}
                    y1={floatingWire.from.y}
                    x2={floatingWire.to.x}
                    y2={floatingWire.to.y}
                    stroke={theme.palette.primary.light}
                    strokeWidth='3'
                    style={{ pointerEvents: 'none' }}
                />
            }
            {Object.keys(gates).map(id => {

                const { left, top, rotation } = gates[id]
                console.log('Target : id = ', id)

                if (!id.includes(ItemTypes.CHIP_IN) && !id.includes(ItemTypes.CHIP_OUT)) { 
                    return (
                        <Source 
                            key={id}
                            id={id}
                            left={left}
                            top={top}
                            rotation={rotation}
                            floatingWire={floatingWire}   // prevents gate from being dragged while pulling terminal
                            hideSourceOnDrag={hideSourceOnDrag}
                            selected={selectedElement === id ? true : false}
                        />
                    )
                }
                else {
                    return (
                        <g 
                            key={id} 
                            transform={`translate(${left} ${top})`}
                        >
                            <Node 
                                id={id}
                                stroke='black'
                                fill='black'
                            />
                        </g>
                    )
                }
            })}
        </svg>
    )
}

// The rest is react-dnd mumbo-jumbo

Target.propTypes = {
    hideSourceOnDrag: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

export default DropTarget(ItemTypes.CSV, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(Target)