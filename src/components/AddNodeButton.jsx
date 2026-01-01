import React, { useState, useRef, useEffect } from 'react';
import { NODE_TYPES } from '../constants';
import { LuPlus, LuZap, LuGitBranch, LuSquare } from "react-icons/lu";

export default function AddNodeButton({ parentId, portId = 'default', onAdd }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAdd = (type) => {
        onAdd(parentId, portId, type);
        setIsOpen(false);
    };

    return (
        <div className="add-node-wrapper" style={{ position: 'relative' }}>
            <button
                className={`placeholder-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Add Node"
            >
                <LuPlus />
            </button>

            {isOpen && (
                <div className="add-node-menu" ref={menuRef}>
                    <div className="menu-title">Add Step</div>
                    <button onClick={() => handleAdd(NODE_TYPES.ACTION)}>
                        <span className="icon"><LuZap color="#eab308" /></span> Action
                    </button>
                    <button onClick={() => handleAdd(NODE_TYPES.CONDITION)}>
                        <span className="icon"><LuGitBranch color="#f97316" /></span> Condition
                    </button>
                    <button onClick={() => handleAdd(NODE_TYPES.END)}>
                        <span className="icon"><LuSquare color="#ef4444" /></span> End
                    </button>
                </div>
            )}
        </div>
    );
}
