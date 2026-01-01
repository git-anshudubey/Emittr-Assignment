import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_NODES, ROOT_ID, NODE_TYPES } from '../constants';

export const WorkflowContext = createContext(null);

export default function WorkflowContextProvider({ children }) {
  // Main State
  const [nodes, setNodes] = useState(INITIAL_NODES);

  // History State
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  // Helper to push state to history before changing it
  const pushToHistory = (currentNodes) => {
    setHistory(prev => [...prev, currentNodes]);
    setFuture([]); // Clear future on new action
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setFuture(prev => [nodes, ...prev]);
    setNodes(previous);
    setHistory(newHistory);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setHistory(prev => [...prev, nodes]);
    setNodes(next);
    setFuture(newFuture);
  };

  const saveWorkflow = () => {
    console.log("Workflow Saved:", JSON.stringify(nodes, null, 2));
    alert("Workflow saved to console!");
  };

  const addNode = useCallback((parentId, portId = 'default', type) => {
    const newNodeId = crypto.randomUUID();

    setNodes((prev) => {
      pushToHistory(prev); // Save current state

      const parentNode = prev[parentId];
      if (!parentNode) return prev;

      const existingChildId = parentNode.connections[portId];

      let newNode = {
        id: newNodeId,
        type,
        label: type === NODE_TYPES.ACTION ? 'Action' : type === NODE_TYPES.CONDITION ? 'Condition' : 'End',
        connections: {},
      };

      if (type === NODE_TYPES.ACTION) {
        newNode.connections = { default: existingChildId };
      } else if (type === NODE_TYPES.CONDITION) {
        newNode.connections = { true: existingChildId, false: null };
      } else if (type === NODE_TYPES.END) {
        newNode.connections = {};
      }

      return {
        ...prev,
        [newNodeId]: newNode,
        [parentId]: {
          ...parentNode,
          connections: {
            ...parentNode.connections,
            [portId]: newNodeId,
          },
        },
      };
    });
  }, []);

  const deleteNode = useCallback((nodeId) => {
    if (nodeId === ROOT_ID) return;

    setNodes((prev) => {
      let parentId = null;
      let parentPort = null;

      for (const [id, node] of Object.entries(prev)) {
        for (const [port, target] of Object.entries(node.connections)) {
          if (target === nodeId) {
            parentId = id;
            parentPort = port;
            break;
          }
        }
        if (parentId) break;
      }

      if (!parentId) return prev;

      pushToHistory(prev); // Save state

      const nodeToDelete = prev[nodeId];

      let childToConnect = null;
      const children = Object.values(nodeToDelete.connections).filter(Boolean);

      if (children.length === 1) {
        childToConnect = children[0];
      } else if (children.length > 1) {
        childToConnect = nodeToDelete.connections['true'] || children[0];
      }

      const newNodes = { ...prev };
      delete newNodes[nodeId];

      newNodes[parentId] = {
        ...newNodes[parentId],
        connections: {
          ...newNodes[parentId].connections,
          [parentPort]: childToConnect
        }
      };

      return newNodes;
    });
  }, []);

  const updateNodeLabel = useCallback((nodeId, newLabel) => {
    setNodes(prev => {
      if (prev[nodeId].label === newLabel) return prev;

      pushToHistory(prev);

      return {
        ...prev,
        [nodeId]: { ...prev[nodeId], label: newLabel }
      };
    });
  }, []);

  const value = {
    nodes,
    rootId: ROOT_ID,
    addNode,
    deleteNode,
    updateNodeLabel,
    undo,
    redo,
    saveWorkflow,
    canUndo: history.length > 0,
    canRedo: future.length > 0
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}
