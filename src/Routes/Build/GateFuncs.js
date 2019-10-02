import update from 'immutability-helper'
import { getMousePosition, getTerminalPoint } from './WireHelpers'
import { getNextName, addNewChipTerminalNode } from './GateHelpers'
import ItemTypes from './ItemTypes'


// Add a gate to dnd dropzone
function addGate(evt, gateId, gates, setGates) {

    //TODO: consider getting gateId from evt.dataTransfer.getData('text')
    gateId = gateId.replace('new', '')                                  // deduce gate to drop
    console.log('GateFuncs > addGate() : gateId = ', gateId)

    console.log('GateFuncs > addGate() : gates = ', gates)
    gateId = getNextName(gateId, gates)                           // find next number up for the given gate
    console.log('GateFuncs > addGate() : gateId = ', gateId)

    const mousePos = getMousePosition(evt)
    const top = mousePos.y - 100/2              //TODO: figure out why 100/2
    const left = mousePos.x - 100/2

    let newGates = { ...gates }
    newGates[gateId] = { top: top, left: left, rotation: 0 }      // add new gate with its info

    console.log('GateFuncs > addGate() : newGates = ', newGates)
    setGates(newGates)
}

function addNode(evt, gates, setGates, wires, setWires) {

    // evt.preventDefault()

    let wireId = evt.target.id
    console.log('GateFuncs > addNode() : wireId = ', wireId)

    const id = getNextName('Node', gates)
    console.log('GateFuncs > addNode() : id = ', id)

    let newGates = { ...gates }
    const mousePos = getMousePosition(evt)

    newGates[id] = { 
        left: mousePos.x - 100/2, //TODO: figure out why 100/2 (or 50)
        top: mousePos.y - 100/2, 
        rotation: 0 
    }

    console.log('GateFuncs > addNode() : newGates = ', newGates)
    setGates(newGates)

    const fromId = wireId.split(ItemTypes.WIRE)[0]
    const toId = wireId.split(ItemTypes.WIRE)[1]
    console.log('GateFuncs > addNode() : fromId = ', fromId)
    console.log('GateFuncs > addNode() : toId = ', toId)

    const from = document.getElementById(fromId)
    const to = document.getElementById(toId)
    console.log('GateFuncs > addNode() : from = ', from)
    console.log('GateFuncs > addNode() : to = ', to)

    const fromPoint = getTerminalPoint(from)
    const toPoint = getTerminalPoint(to)

    let newWires = { ...wires }

    newWires[fromId + ItemTypes.WIRE + id + ItemTypes.NODE_CENTER] = {
        from: {x: fromPoint.x, y: fromPoint.y},
        to: {x: mousePos.x, y: mousePos.y}
    }
      
    newWires[id + ItemTypes.NODE_CENTER + ItemTypes.WIRE + toId] = {
        from: {x: mousePos.x, y: mousePos.y},
        to: {x: toPoint.x, y: toPoint.y}
    }

    delete newWires[wireId]

    console.log('GateFuncs > addNode() : newWires = ', newWires)
    setWires(newWires)
}
   
function rotateGate(id, gates, setGates) {

    const gateId = id.replace('Body', '')   // deduce gate id from gate body
    console.log('GateFuncs > rotateGate() : gateId = ', gateId)

    const newRotation = (gates[gateId].rotation + 90) % 360     // rotate 90deg clockwise
    console.log('GateFuncs > rotateGate() : newRotation = ', newRotation)

    // For the given gate, modify current rotation with new rotation
    setGates(update(gates, {
        [gateId]: {
            $merge: {
                rotation: newRotation
            }
        }
    }))
}


function addChipTerminalNode(inputs, outputs, gates, setGates) {
    
    let newGates = gates

    const inputNodes = addNewChipTerminalNode(inputs)
    const outputNodes = addNewChipTerminalNode(outputs)

    newGates = { ...newGates, ...inputNodes, ...outputNodes }

    setGates({ ...newGates })
}

export { addGate, rotateGate, addNode, addChipTerminalNode }