import ItemTypes from './ItemTypes'

function handleDragOver(evt) {
    evt.preventDefault()
    // setDragAreaVisible(true)
}

function addRemoveChipTerminal(title, chipInOuts, setChipInOuts, incDec, gates, setGates, wires, setWires) {

    let newChipInOuts = { ...chipInOuts }
    let numInOuts = Object.keys(chipInOuts).length
    console.log('BuildFuncs > handleClick() > before : numInOuts = ', numInOuts)


    const chipInOutsType = title === 'Inputs' ? ItemTypes.CHIP_IN : ItemTypes.CHIP_OUT

    if (incDec === 'inc') {

        if (numInOuts === 16) return

        const chipInOutsName = chipInOutsType + numInOuts++
        console.log('BuildFuncs > handleClick() : chipInOutsName = ', chipInOutsName)

        newChipInOuts[chipInOutsName] = {
            value: 0,
            connectedTo: null
        }
    }
    else if (incDec === 'dec') {

        const chipInOutName = chipInOutsType + --numInOuts
        console.log('BuildFuncs > handleClick() : trying to delete chipInOutName = ', chipInOutName)

        delete newChipInOuts[chipInOutName]
        
        let newGates = { ...gates }
        delete newGates[chipInOutName+'Node']

        setGates(newGates)
        
        let newWires = { ...wires }

        for (var wireId in wires) {
            if (wireId.includes(chipInOutName))
                delete newWires[wireId]
        }
        
        setWires(newWires)
    }

    console.log('BuildFuncs > handleClick() : newChipInOuts = ', newChipInOuts)

    console.log('BuildFuncs > handleClick() : setChipInOuts = ', setChipInOuts)

    setChipInOuts(newChipInOuts)
}

// function getInputValue(chipIns) {
    
//     const 

// }

function validateInputs(val, chipIns, setChipIns, setInputValue) {
    console.log('BuildFuncs > validateInputs() : val = ', val)

    const isBool = /^[0-1]+$/.test(val)
    console.log('BuildFuncs > validateInputs() : isBool = ', isBool)

    const isEmpty = val === ''
    console.log('BuildFuncs > validateInputs() : isEmpty = ', isEmpty)

    if (!isBool && !isEmpty) return	


    let newChipIns = { ...chipIns }
    for (let i = 0; i < val.length; i++) {
        console.log('BuildFuncs > validateInputs() : i = ', i)

        // newChipIns[ItemTypes.CHIP_IN+(i+1).toString()].value = Number(val[val.length-1-i]) 
        newChipIns[ItemTypes.CHIP_IN+i].value = Number(val[val.length-1-i]) 
    }	

    setInputValue(val)
    setChipIns(newChipIns)
}

function handleClick(evt, setSelectedElement) {
    
    let id = evt.target.id
    console.log('BuildFuncs > handleClickPaper() : id = ', id)

    let newSelectedElement
    if (id.includes(ItemTypes.BODY) || id.includes(ItemTypes.TEXT)) {
        id = id.replace(ItemTypes.BODY, '').replace(ItemTypes.TEXT, '')     //TODO: check if we can do without the above if
        console.log('BuildFuncs > handleClickPaper() : id = ', id)

        newSelectedElement = id
    }
    else if (id.includes(ItemTypes.WIRE)) {
        console.log('BuildFuncs > handleClickPaper() : id = ', id)

        newSelectedElement = id
    }
    else
        newSelectedElement = null

    setSelectedElement(newSelectedElement)   
}

function handleKeyDown(evt, gates, setGates, wires, setWires, selectedElement, setSelectedElement) { 

    // if (evt.repeat) return


    console.log('BuildFuncs > handleKeyDown() : selectedElement = ', selectedElement)

    // evt.preventDefault()
    // evt.stopPropagation()

    if (selectedElement === null) return

    if (evt.keyCode === 48 || evt.keyCode === 49) return

    const DEL_KEY = 46
    const ESC_KEY = 27

    // console.log('Target : handleKeyDown() : evt = ', evt)

    const keyId = evt.keyCode
    // console.log('Target : handleKeyDown() : keyId = ', keyId)

    // console.log('Target : handleKeyDown() : selectedElement = ', selectedElement)

    if (keyId === DEL_KEY) {

        console.log('Build : handleKeyDown() : wires = ', wires)

        let newWires = { ...wires }

        if (selectedElement.includes('_'))
            delete newWires[selectedElement]
        else {
            let newGates = { ...gates }
            delete newGates[selectedElement]
            console.log('BuildFuncs > handleKeyDown() : newGates = ', newGates)
       
            setGates(newGates)

            const wireIds = Object.keys(wires)  
            wireIds.forEach(wireId => {
                if (wireId.includes(selectedElement))
                    delete newWires[wireId]
            })
        } 

        console.log('BuildFuncs > handleKeyDown() : newWires = ', newWires)


        setSelectedElement(null)

        setWires(newWires)
    }
    else if (keyId === ESC_KEY)
        setSelectedElement(null)
}


export { handleDragOver, addRemoveChipTerminal, validateInputs, handleKeyDown, handleClick }