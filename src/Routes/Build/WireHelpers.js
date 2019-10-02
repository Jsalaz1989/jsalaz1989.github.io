import ItemTypes from './ItemTypes'

/**
* Get a new XY point in SVG-Space, where X and Y are relative to an existing element.  Useful for drawing lines between elements, for example

* X : the new X with relation to element, 5 would be '5' to the right of element's left boundary.  element.width would be the right edge.
* Y : the new Y coordinate, same principle applies
* svg: the parent SVG DOM element
* element: the SVG element which we are using as a base point.
*/
// Source: https://stackoverflow.com/questions/26049488/how-to-get-absolute-coordinates-of-object-inside-a-g-group/37927466
function getRelativeXY(x, y, svg, element) {
    // console.log('WireHelpers > getRelativeXY() : x = ', x, ' y = ', y, ' svg = ', svg, ' element = ', element)

    var p = svg.createSVGPoint();
    // console.log('WireHelpers > getRelativeXY() : p = ', p)

    p.x = x;
    p.y = y;

    var ctm = element.getCTM();
    // console.log('WireHelpers > getRelativeXY() : ctm = ', ctm)

    var pMatrixTransform = p.matrixTransform(ctm)
    // console.log('WireHelpers > getRelativeXY() : pMatrixTransform = ', pMatrixTransform)

    return pMatrixTransform
}

// Depending on the terminal type, get the relative point of a specific extreme (or center)
function getTerminalPoint(terminal) {

    console.log('WireHelpers > getTerminalPoint() : terminal = ', terminal)

    if (!terminal) return

    let x, y
    
    if      (terminal.id.includes(ItemTypes.GATE_OUT))      { x = 'x2'; y = 'y2' }
    else if (terminal.id.includes(ItemTypes.GATE_IN))       { x = 'x1'; y = 'y1' }
    else if (terminal.id.includes(ItemTypes.NODE_CENTER))   { x = 'cx'; y = 'cy' }
    else if (terminal.id.includes(ItemTypes.CHIP_IN))       { x = 'x2'; y = 'y2' }
    else if (terminal.id.includes(ItemTypes.CHIP_OUT))      { x = 'x1'; y = 'y1' }

    console.log(`WireHelpers > getTerminalPoint() : x = ${x}, y = ${y}`)

    x = terminal[x].baseVal.value
    y = terminal[y].baseVal.value

    const relativePoint = getRelativeXY(x, y, document.getElementById('svg'), terminal)

    return relativePoint
}

// Convert window coords (clientX,Y) to svg space
// Source: http://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/ 
function getMousePosition(evt) {
    
    var CTM = document.getElementById('svg').getScreenCTM() // current transformation matrix
    
    if (evt.touches) evt = evt.touches[0]
    
    // (x,y) in svg --> (ax+e, dy+f) on screen
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    }
}

function terminalConnected(terminalId, wires) {
    const wireIds = Object.keys(wires)
    // console.log('WireHelpers > terminalAlreadyConnected() : wireIds = ', wireIds)

    let terminalConnected = false
    wireIds.forEach(wireId => {
        // console.log('WireHelpers > terminalAlreadyConnected() : wireId = ', wireId)
        const wireTerminals = wireId.split(ItemTypes.WIRE)
        if (wireTerminals[0] === terminalId || wireTerminals[1] === terminalId) {
            terminalConnected = wireId
            return terminalConnected
        }
    })

    // console.log('WireHelpers > terminalAlreadyConnected() : terminalConnected = ', terminalConnected)
    return terminalConnected
}

// function terminalConnectedToType(terminalId, wireId) {

//     console.log('WireHelpers > terminalConnectedToType() : terminalId = ', terminalId)
//     console.log('WireHelpers > terminalConnectedToType() : wireId = ', wireId)

//     const wireTerminalIds = wireId.split(ItemTypes.WIRE)
//     const fromId = wireTerminalIds[0]
//     const toId = wireTerminalIds[1]
//     console.log('WireHelpers > terminalConnectedToType() : fromId = ', fromId)
//     console.log('WireHelpers > terminalConnectedToType() : toId = ', toId)

//     let terminalType
//     if      (terminalId === fromId)     terminalType = getTerminalType(toId)
//     else if (terminalId === toId)       terminalType = getTerminalType(fromId)

//     console.log('WireHelpers > terminalConnectedToType() : terminalType = ', terminalType)
//     return terminalType
// }

function getTerminalType(terminalId) {

    // console.log('WireHelpers > getTerminalType() : terminalId = ', terminalId)

    let terminalType
    if      (terminalId.includes(ItemTypes.GATE_IN))        terminalType = ItemTypes.GATE_IN
    else if (terminalId.includes(ItemTypes.GATE_OUT))       terminalType = ItemTypes.GATE_OUT
    else if (terminalId.includes(ItemTypes.CHIP_IN))        terminalType = ItemTypes.CHIP_IN
    else if (terminalId.includes(ItemTypes.CHIP_OUT))       terminalType = ItemTypes.CHIP_OUT
    else if (terminalId.includes(ItemTypes.NODE_CENTER))    terminalType = ItemTypes.NODE_CENTER    // should go last or else CHIP_IN is considered NODE_CENTER

    // console.log('WireHelpers > getTerminalType() : terminalType = ', terminalType)
    return terminalType
}

// function mouseOrTerminalPoint(evt, id) {
//     return id === 'floatingTerminal' 
//         ? getMousePosition(evt)
//         : getTerminalPoint(document.getElementById(id))
// }

// function nodeConnectedToOut(nodeId, wires) {
//     const wireIds = Object.keys(wires)

//     return wireIds.some(wireId => (
//         wireId.includes('Out') && wireId.includes(nodeId))
//     )
// }

// function nodeConnectedToChipIn(nodeId, wires) {
//     const wireIds = Object.keys(wires)

//     return wireIds.some(wireId => (
//         wireId.includes('in') && wireId.includes(nodeId))
//     )
// }

export { getMousePosition, terminalConnected, getTerminalPoint, getTerminalType }