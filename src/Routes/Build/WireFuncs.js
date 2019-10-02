import update from 'immutability-helper'
import { getMousePosition, getTerminalPoint, terminalConnected, getTerminalType } from './WireHelpers'
import ItemTypes from './ItemTypes'



function createFloatingWire(evt, wires, setWires, setFloatingWire) {
    
    const terminalId = evt.target.id
    console.log('WireFuncs > createFloatingWire() : terminalId = ', terminalId)

    const terminalType = getTerminalType(terminalId)
    console.log('WireFuncs > createFloatingWire() : terminalType = ', terminalType)


    const existingWireAtIn = terminalConnected(terminalId, wires)

    let from, newFloatingWireName
    if (terminalType === ItemTypes.GATE_IN && existingWireAtIn) {

        console.log(`WireFuncs > createFloatingWire() : ${terminalId} already connected to wire ${existingWireAtIn}, lifting up`)
        
        // let newWires = { ...wires }
        // delete newWires[existingWireAtIn]      
        // setWires(newWires)

        const fromId = existingWireAtIn.replace(terminalId,'').replace(ItemTypes.WIRE,'')
        console.log('WireFuncs > createFloatingWire() : fromId = ', fromId)

        from = document.getElementById(fromId)
        newFloatingWireName = fromId + ItemTypes.WIRE + ItemTypes.FLOATING_WIRE + '^' + existingWireAtIn
    }
    else {
        from = document.getElementById(terminalId)
        newFloatingWireName = terminalId + ItemTypes.WIRE + ItemTypes.FLOATING_WIRE
    }

    const fromPoint = getTerminalPoint(from)
    const toPoint = getMousePosition(evt)

    let newFloatingWire = {}
    newFloatingWire.name = newFloatingWireName
    newFloatingWire.from = {x: fromPoint.x, y: fromPoint.y} 
    newFloatingWire.to = {x: toPoint.x, y: toPoint.y} 
    // const newFloatingWire = {
    //     name: newFloatingWireName,
    //     from: {x: fromPoint.x, y: fromPoint.y}, 
    //     to: {x: toPoint.x, y: toPoint.y} 
    // }
    console.log('WireFuncs > createFloatingWire() : newFloatingWire = ', newFloatingWire)

    setFloatingWire(newFloatingWire)
}

function dragFloatingWire(evt, floatingWire, setFloatingWire) {
    
    // console.log('WireFuncs > dragFloatingWire() : floatingWire = ', floatingWire)

    const mousePos = getMousePosition(evt)
    // console.log('WireFuncs > dragFloatingWire() : mousePos = ', mousePos)
    
    setFloatingWire(update(floatingWire, {
        $merge: {
            to: {x: mousePos.x, y: mousePos.y}
        }
    }))
}

function connectedToProvider(terminalIds) {

    return terminalIds.some(terminalId => {
        console.log('WireFuncs > connectedToProvider() : terminalId = ', terminalId)

        const terminalType = getTerminalType(terminalId)
        console.log('WireFuncs > connectedToProvider() : terminalType = ', terminalType)
        
        return terminalType === ItemTypes.GATE_OUT || terminalType === ItemTypes.CHIP_IN
    })
}

function getConnectedTerminals(terminalId, wires) {
    const wireIds = Object.keys(wires)

    let connectedTerminals = []

    wireIds.forEach(wireId => {
        if (wireId.includes(terminalId)) {
            const connectedTerminal = wireId.replace(ItemTypes.WIRE,'').replace(terminalId,'')
            connectedTerminals.push(connectedTerminal)
        }
    })

    return connectedTerminals
}



function getNetwork(terminalId, wires) {

    const connectedTerminals = getConnectedTerminals(terminalId, wires)
    console.log('WireFuncs > getNetwork() : connectedTerminals = ', connectedTerminals)

    let network = {}
    network[terminalId] = connectedTerminals

    connectedTerminals.forEach(connectedTerminalId => {
        network[connectedTerminalId] = getConnectedTerminals(connectedTerminalId, wires)
    })
    console.log('WireFuncs > getNetwork() : network = ', network)

    for (var terminal in network) {
        console.log('WireFuncs > getNetwork() : terminal = ', terminal)

        network[terminal].forEach(connectedTerminal => {
            if (!network[connectedTerminal])
                network[connectedTerminal] = getConnectedTerminals(connectedTerminal, wires)
        })
    }
    console.log('WireFuncs > getNetwork() : network = ', network)
    
    return network
}

function networkContainsProvider(network) {
    let containsProvider = false

    const networkPoints = Object.keys(network)
    containsProvider = connectedToProvider(networkPoints)
    console.log('WireFuncs > connectFloatingWire() : networkPoints contain provider = ', containsProvider)

    if (!containsProvider) {
        console.log('WireFuncs > connectFloatingWire() : networkContainsProvider do not contain provider, checking points connected to those points')

        for (var networkPoint in network) {
            console.log('WireFuncs > connectFloatingWire() : networkPoint = ', networkPoint)

            containsProvider = connectedToProvider(network[networkPoint])
            console.log('WireFuncs > connectFloatingWire() : containsProvider = ', containsProvider)

            if (containsProvider) break
        }
    }
    console.log('WireFuncs > connectFloatingWire() : containsProvider', containsProvider)
    return containsProvider
}

function connectFloatingWire(evt, wires, setWires, floatingWire, setFloatingWire) {

    console.log('WireFuncs > connectFloatingWire() : floatingWire = ', floatingWire)

    setFloatingWire(null)

    const sourceTerminalId = floatingWire.name.replace(ItemTypes.FLOATING_WIRE, '').replace(ItemTypes.WIRE, '')
    const sourceNetwork = getNetwork(sourceTerminalId, wires)
    const sourceNetworkContainsProvider = networkContainsProvider(sourceNetwork)
    console.log('WireFuncs > connectFloatingWire() : sourceTerminalId = ', sourceTerminalId)
    console.log('WireFuncs > connectFloatingWire() : sourceNetwork = ', sourceNetwork)
    console.log('WireFuncs > connectFloatingWire() : sourceNetworkContainsProvider = ', sourceNetworkContainsProvider)

    
    const targetTerminalId = evt.target.id
    const targetNetwork = getNetwork(targetTerminalId, wires)
    const targetNetworkContainsProvider = networkContainsProvider(targetNetwork)
    console.log('WireFuncs > connectFloatingWire() : targetTerminalId =', targetTerminalId)
    console.log('WireFuncs > connectFloatingWire() : targetNetwork = ', targetNetwork)
    console.log('WireFuncs > connectFloatingWire() : targetNetworkContainsProvider = ', targetNetworkContainsProvider)

    if (sourceNetworkContainsProvider && targetNetworkContainsProvider) {
        console.log('WireFuncs > connectFloatingWire() : cannot connect - both source and target networks contain providers')
        return
    }

    const floatingWireNameParts = floatingWire.name.split('^')
    console.log('WireFuncs > connectFloatingWire() : floatingWireNameParts = ', floatingWireNameParts)

    const newWireId = floatingWireNameParts[0].replace(ItemTypes.FLOATING_WIRE, targetTerminalId)
    console.log('WireFuncs > connectFloatingWire() : newWireId = ', newWireId)

    
    let newWirePoints = {} 
    newWirePoints.from = {x: floatingWire.from.x, y: floatingWire.from.y}
    
    const to = document.getElementById(targetTerminalId)
    const toPoint = getTerminalPoint(to)
    newWirePoints.to = {x: toPoint.x, y: toPoint.y}

    let newWires = { ...wires }
    newWires[newWireId] = newWirePoints
    if (floatingWireNameParts[1]) delete newWires[floatingWireNameParts[1]]
    console.log('WireFuncs > connectFloatingWire() : newWires = ', newWires)

    setWires(newWires)
}

function updateWires(wires, setWires) {
    console.log('WireFuncs > updateWire() : wires = ', wires)

    const wireIds = Object.keys(wires)        
    console.log('WireFuncs > updateWire() : wireIds = ', wireIds)
    console.log('WireFuncs > updateWire() : wireIds.length = ', wireIds.length)

    if (wireIds.length === 0) return 

    let wireChanges = {}
    wireIds.forEach(wireId => {

        console.log('WireFuncs > updateWire() : wireId = ', wireId)
        
        let fromId = wireId.split('_')[0]
        console.log('WireFuncs > updateWire() : fromId = ', fromId)
        
        // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

        const toId = wireId.split('_')[1]

        const from = document.getElementById(fromId)
        const to = document.getElementById(toId)

        // if (from === null || to === null) return

        const fromPoint = getTerminalPoint(from)
        const toPoint = getTerminalPoint(to)

        const wireChange = {
            [wireId]: {
                $merge: {
                    from: { x: fromPoint.x, y: fromPoint.y },
                    to: { x: toPoint.x, y: toPoint.y }
                }
            }
        }

        wireChanges = { ...wireChanges, ...wireChange }
    })

    console.log('WireFuncs > updateWire : wireChanges = ', wireChanges)
    setWires(update(wires, wireChanges))
}

export function updateWiresTerminals(wires, setWires) {
    console.log('WireFuncs > updateWire() : wires = ', wires)

    const wireIds = Object.keys(wires)        
    console.log('WireFuncs > updateWire() : wireIds = ', wireIds)
    console.log('WireFuncs > updateWire() : wireIds.length = ', wireIds.length)

    if (wireIds.length === 0) return 

    let wireChanges = {}
    wireIds.forEach(wireId => {

        console.log('WireFuncs > updateWire() : wireId = ', wireId)
        
        let fromId = wireId.split('_')[0]
        console.log('WireFuncs > updateWire() : fromId = ', fromId)
        
        // console.log('WireFuncs > updateWire() : updating wiredId = ', wireId)

        const toId = wireId.split('_')[1]

        const from = document.getElementById(fromId)
        const to = document.getElementById(toId)

        const fromPoint = getTerminalPoint(from)
        const toPoint = getTerminalPoint(to)

        const wireChange = {
            [wireId]: {
                $merge: {
                    from: { x: fromPoint.x, y: fromPoint.y },
                    to: { x: toPoint.x, y: toPoint.y }
                }
            }
        }

        wireChanges = { ...wireChanges, ...wireChange }
    })

    console.log('WireFuncs > updateWire : wireChanges = ', wireChanges)
    setWires(update(wires, wireChanges))
}

export { createFloatingWire, dragFloatingWire, connectFloatingWire, updateWires }