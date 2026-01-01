import React, { useContext, useState, useEffect } from 'react';
import { WorkflowContext } from '../context/WorkflowContext';
import { NODE_TYPES } from '../constants';
import { LuFlag, LuZap, LuGitBranch, LuSquare, LuX } from "react-icons/lu";

const ICONS = {
  [NODE_TYPES.START]: <LuFlag size={20} />,
  [NODE_TYPES.ACTION]: <LuZap size={20} />,
  [NODE_TYPES.CONDITION]: <LuGitBranch size={20} />,
  [NODE_TYPES.END]: <LuSquare size={20} />,
};

export default function Node({ node }) {
  const { deleteNode, updateNodeLabel } = useContext(WorkflowContext);
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(node.label);

  useEffect(() => {
    setLabel(node.label);
  }, [node.label]);

  const handleBlur = () => {
    setIsEditing(false);
    if (label.trim()) {
      updateNodeLabel(node.id, label);
    } else {
      setLabel(node.label);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  // Subtler border colors for pro look
  const getBorderColor = () => {
    switch (node.type) {
      case NODE_TYPES.START: return '#6366f1';
      case NODE_TYPES.END: return '#ef4444';
      case NODE_TYPES.CONDITION: return '#f97316';
      default: return 'transparent'; // Let hover state handle it or default border
    }
  };

  return (
    <div
      className="node-card"
      style={{
        borderLeft: `4px solid ${getBorderColor()}`
      }}
    >
      <div className="node-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
          {ICONS[node.type]}
          <span className="node-type-label">{node.type}</span>
        </div>

        {node.type !== NODE_TYPES.START && (
          <button
            className="delete-btn"
            onClick={() => deleteNode(node.id)}
            title="Delete Step"
          >
            <LuX />
          </button>
        )}
      </div>
      <div className="node-content">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          title="Click to rename"
          placeholder="Step Name"
        />
      </div>
    </div>
  );
}
