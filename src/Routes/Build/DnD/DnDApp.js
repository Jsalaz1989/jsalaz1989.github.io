import React from 'react'

import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'

import DragPreview from './DragPreview'
import Target from './Target'


export default ({ gates, setGates, wires, setWires, selectedElement, floatingWire, setFloatingWire }) => (
    <DndProvider backend={MouseBackEnd}>
        {/* <Target hideSourceOnDrag={false} gates={gates} setGates={setGates} wires={wires} setWires={setWires} selectedElement={selectedElement} floatingWire={floatingWire} setFloatingWire={setFloatingWire} /> */}
        {/* <DragPreview wires={wires} /> */}
        <Target hideSourceOnDrag={false} selectedElement={selectedElement} />
        <DragPreview />
    </DndProvider>
)