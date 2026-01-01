import React, { useContext } from 'react';
import { WorkflowContext } from '../context/WorkflowContext';
import { LuUndo, LuRedo, LuSave } from "react-icons/lu";

export default function Toolbar() {
    const { undo, redo, canUndo, canRedo, saveWorkflow } = useContext(WorkflowContext);

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <button disabled={!canUndo} onClick={undo} title="Undo">
                    <LuUndo />
                </button>
                <button disabled={!canRedo} onClick={redo} title="Redo">
                    <LuRedo />
                </button>
            </div>
            <button className="primary-btn" onClick={saveWorkflow} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LuSave /> Save Workflow
            </button>
        </div>
    );
}
