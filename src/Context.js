import React, { useState } from 'react'

const AppDataContext = React.createContext([{}, () => {}]);

const AppDataProvider = (props) => {

    // const [state, setState] = useState({ 
    //     gates: {},
    //     wires: {},
    //     floatingWire: null,
    //     chipIns: {},
    //     chipOuts: {},
    //     selectedElement: null 
    // })

    // return (
    //     <AppDataContext.Provider value={[state, setState]}>
    //         {props.children}
    //     </AppDataContext.Provider>
    // )

    const [gates, setGates] = useState({})
    const [wires, setWires] = useState({})
    const [floatingWire, setFloatingWire] = useState({})
    const [chipIns, setChipIns] = useState({})
    const [chipOuts, setChipOuts] = useState({})
    const [selectedElement, setSelectedElement] = useState({})

    const context = {
        gates, setGates,
        wires, setWires,
        floatingWire, setFloatingWire,
        chipIns, setChipIns,
        chipOuts, setChipOuts,
        selectedElement, setSelectedElement
    }
    
    console.log('Context : context = ', context)
	console.log('Context : chipIns = ', chipIns)

    return (
        <AppDataContext.Provider value={[{ ...context }]}>
            {props.children}
        </AppDataContext.Provider>
    )
}

export { AppDataContext, AppDataProvider }