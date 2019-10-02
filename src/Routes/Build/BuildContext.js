import React, { createContext, useState, useEffect } from 'react'

import { updateWires } from './WireFuncs'
import { addChipTerminalNode } from './GateFuncs'


const ChipInsContext            = createContext([{}, () => {}])
const ChipOutsContext           = createContext([{}, () => {}])
const GatesContext              = createContext([{}, () => {}])
const WiresContext              = createContext([{}, () => {}])
const FloatingWireContext       = createContext([null, () => {}])
const SelectedElementContext    = createContext([null, () => {}])


const defaultChipIns    = false     ?   { in0: {value: 0, connectedTo: null} }              : {}
const defaultChipOuts   = false     ?   { out0: {value: 0, connectedTo: null} }             : {}
// const defaultGates      = true      ?   { Nand0: {left: 209.5, top: 64, rotation: 0} }      : {}
const defaultGates      = true      ?   { Nand0: {left: 209.5, top: 64, rotation: 0}, Nand1: {left: 400.5, top: 90, rotation: 0} }      : {}
const defaultWires      = false     ?   { 
    Nand0Out_Nand1InA: { from: {x: 309.5, y: 114}, to: {x: 400.5, y: 125} }, 
    Nand0Out_Nand0InA: { from: {x: 500.5, y: 200}, to: {x: 300.5, y: 200} } 
}      : {}



const BuildContextProvider = (props) => {
    
	const [chipIns, setChipIns]                     = useState(defaultChipIns)
    const [chipOuts, setChipOuts]                   = useState(defaultChipOuts)
    const [gates, setGates]                         = useState(defaultGates)
	const [wires, setWires]                         = useState(defaultWires)
    const [floatingWire, setFloatingWire]           = useState(null)
    const [selectedElement, setSelectedElement]     = useState(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>updateWires(wires, setWires), [gates, chipIns])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => addChipTerminalNode(chipIns, chipOuts, gates, setGates), [chipIns, chipOuts])
	
    return (
        <ChipInsContext.Provider value={[chipIns, setChipIns]}>
            <ChipOutsContext.Provider value={[chipOuts, setChipOuts]}>
                <GatesContext.Provider value={[gates, setGates]}>
                    <WiresContext.Provider value={[wires, setWires]}>
                        <FloatingWireContext.Provider value={[floatingWire, setFloatingWire]}>
                            <SelectedElementContext.Provider value={[selectedElement, setSelectedElement]}>
                                {props.children}
                            </SelectedElementContext.Provider>
                        </FloatingWireContext.Provider>
                    </WiresContext.Provider>
                </GatesContext.Provider>
            </ChipOutsContext.Provider>
        </ChipInsContext.Provider>
    )
}

export { BuildContextProvider, ChipInsContext, ChipOutsContext, GatesContext, WiresContext, FloatingWireContext, SelectedElementContext }