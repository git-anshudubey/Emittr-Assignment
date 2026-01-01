import React, { useContext } from 'react';
import { WorkflowContext } from '../context/WorkflowContext';
import NodeRenderer from './NodeRenderer';

export default function Canvas() {
    const { rootId } = useContext(WorkflowContext);

    return (
        <div className="workflow-canvas">
            <NodeRenderer nodeId={rootId} />
        </div>
    );
}
