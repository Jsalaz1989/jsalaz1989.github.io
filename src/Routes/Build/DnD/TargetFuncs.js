import { addGate, rotateGate, addNode } from '../GateFuncs'
import { createFloatingWire, dragFloatingWire, connectFloatingWire } from '../WireFuncs'

import ItemTypes from '../ItemTypes' 

// Receive new gate into drop zone
//TODO: consider adding chip in and out dropzones
function handleDrop(evt, gates, setGates) {

    evt.preventDefault()    //TODO: see if necessary

    let id = evt.dataTransfer.getData('text')
    console.log('TargetFuncs > handleDrop() : id = ', id)

    if (id.includes('new'))
        addGate(evt, id, gates, setGates) //TODO: consider passing only evt and not id
}

// Rotate gate or add node
function handleDoubleClick(evt, gates, setGates, wires, setWires) {
        
    const id = evt.target.id
    console.log('TargetFuncs > handleDoubleClick() : id = ', id)

    if (id.includes(ItemTypes.BODY))
        rotateGate(id, gates, setGates)
    else if (id.includes(ItemTypes.WIRE))
        addNode(evt, gates, setGates, wires, setWires)
}

// Create a floating wire to be dragged onmousemove
function handleMouseDown(evt, wires, setWires, setFloatingWire) {
    
    const id = evt.target.id
    console.log('TargetFuncs > handleMouseDown() : id = ', id)

    if (id.includes(ItemTypes.WIRE)) return

    if (id.includes(ItemTypes.GATE_IN) || id.includes(ItemTypes.GATE_OUT) || id.includes(ItemTypes.CENTER))
        createFloatingWire(evt, wires, setWires, setFloatingWire)
}

// Drag floating wire that was created onmouseup
function handleMouseMove(evt, floatingWire, setFloatingWire) {
    // console.log('TargetFuncs > handleMouseMove() : evt.target.id = ', evt.target.id)
    // console.log('TargetFuncs > handleMouseMove() : state.floatingWire = ', state.floatingWire)
    
    if (floatingWire) 
        dragFloatingWire(evt, floatingWire, setFloatingWire)
}

function handleMouseUp(evt, wires, setWires, floatingWire, setFloatingWire) {
       
    console.log('TargetFuncs > handleMouseUp() : floatingWire = ', floatingWire)

    if (floatingWire) {

        const id = evt.target.id
        console.log('TargetFuncs > handleMouseUp() : id = ', id)

        if (id.includes(ItemTypes.GATE_IN) || id.includes(ItemTypes.GATE_OUT) || id.includes(ItemTypes.CENTER))
            connectFloatingWire(evt, wires, setWires, floatingWire, setFloatingWire)
        else {
            console.log('TargetFuncs > handleMouseUp() : no suitable target for floating wire, removing floating wire...')
            
            let newWires = { ...wires }
            const existingWireAtIn = floatingWire.name.split('^')[1]
            delete newWires[existingWireAtIn]      
            setWires(newWires)
            setFloatingWire(null)
        }
    }
}

export { handleDrop, handleDoubleClick, handleMouseDown, handleMouseMove, handleMouseUp }