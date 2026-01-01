import React, { useContext } from 'react';
import { WorkflowContext } from '../context/WorkflowContext';
import Node from './Node';
import AddNodeButton from './AddNodeButton';
import { NODE_TYPES } from '../constants';

const NodeRenderer = ({ nodeId, parentId = null, portId = null }) => {
    const { nodes, addNode } = useContext(WorkflowContext);
    const node = nodes[nodeId];

    // Logic to render placeholder if nodeId is null (empty slot)
    if (!node && parentId) {
        // It's an empty slot in a branch or flow
        return (
            <div className="node-wrapper placeholder-wrapper">
                <div className="placeholder-node">
                    <span>Empty</span>
                    <AddNodeButton parentId={parentId} portId={portId} onAdd={addNode} />
                </div>
            </div>
        );
    }

    if (!node) return null;

    // Render children based on node type
    // Action/Start: 1 child (default)
    // Condition: 2 children (true, false)
    // End: 0 children

    const renderChildren = () => {
        if (node.type === NODE_TYPES.END) return null;

        if (node.type === NODE_TYPES.CONDITION) {
            return (
                <div className="node-children condition-children">
                    <div className="connection-line-vertical"></div>
                    <div className="branch">
                        <div className="connection-line-vertical"></div>
                        <div className="connection-label">True</div>
                        {/* Recursive call needs to pass parentId and portId for the CHILD slot */}
                        {/* Use the current node as parent, and 'true' as port */}
                        <NodeRenderer nodeId={node.connections.true} parentId={node.id} portId="true" />
                    </div>
                    <div className="branch">
                        <div className="connection-line-vertical"></div>
                        <div className="connection-label">False</div>
                        <NodeRenderer nodeId={node.connections.false} parentId={node.id} portId="false" />
                    </div>
                </div>
            );
        }

        // Default for Start/Action
        return (
            <div className="node-children">
                <div className="connection-line-vertical"></div>
                {/* If connection exists, render it. If not, show Add Button directly */}
                {node.connections.default ? (
                    <NodeRenderer nodeId={node.connections.default} parentId={node.id} portId="default" />
                ) : (
                    <AddNodeButton parentId={node.id} portId="default" onAdd={addNode} />
                )}
            </div>
        );
    };

    return (
        <div className="node-wrapper">
            <Node node={node} />
            {renderChildren()}
        </div>
    );
};

export default NodeRenderer;
