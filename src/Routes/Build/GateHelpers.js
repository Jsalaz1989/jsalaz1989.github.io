// Find the next available name for a given gate/node
function getNextName(gateType, gates) {

    console.log('GateFuncs > getNextName() : gates = ', gates)

    let highestNumber = -1
    let currentNumber

    // Increment suffix for every encounter of the same type,
    // must account for deleted gates
    for (var gate in gates) {                           
        if (gate.includes(gateType)) {
            // console.log('GateFuncs > getNextName() : gate = ', gate)
            // console.log('GateFuncs > getNextName() : gateType = ', gateType)

            currentNumber = gate.replace(gateType, '')
            // console.log('GateFuncs > getNextName() : currentNumber = ', currentNumber)

            currentNumber = Number(currentNumber)
            // console.log('GateFuncs > getNextName() : currentNumber = ', currentNumber)
            // console.log('GateFuncs > getNextName() : highestNumber = ', highestNumber)

            if (currentNumber > highestNumber)
                highestNumber = currentNumber
        }
    }

    highestNumber++
    
    return gateType + highestNumber.toString()
}

function addChipTerminalNodePoint(chipTerminalId) {

    console.log('GateFuncs > addChipTerminalNode() : chipTerminalId = ', chipTerminalId)
    const chipInTerminal = document.getElementById(chipTerminalId)            
    
    console.log('GateFuncs : chipInTerminal = ', chipInTerminal)

    if (!chipInTerminal) return null

    const terminalBbox = chipInTerminal.getBoundingClientRect()

    let x
    if (chipTerminalId.includes('in'))          x= terminalBbox.right
    else if (chipTerminalId.includes('out'))    x= terminalBbox.left

    let y = terminalBbox.top + terminalBbox.height/2
    
    const svg = document.getElementById('svg')
    const pt = svg.createSVGPoint()
    pt.x = x
    pt.y = y

    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    x = svgP.x-100/2    // not sure why 50 is a good value but it shows up again here
    y = svgP.y-100/2

    const translation = `${x} ${y}`
    console.log(`GateFuncs > addChipTerminalNode() : translation = ${translation}`)

    // return translation
    return {x: x, y: y}
}

function addNewChipTerminalNode(inOuts) {
    
    let newGates = {}

    for (var inOut in inOuts) {

        console.log('Build > addChipTerminalNode() : inOut = ', inOut)

        const chipNodePoint = addChipTerminalNodePoint(inOut)

        newGates[inOut+'Node'] = {
            left: chipNodePoint.x,
            top: chipNodePoint.y
        }
    }

    return newGates
}

export { getNextName, addNewChipTerminalNode }