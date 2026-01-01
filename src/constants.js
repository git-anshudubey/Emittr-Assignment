export const NODE_TYPES = {
    START: 'start',
    ACTION: 'action',
    CONDITION: 'condition',
    END: 'end',
};

export const INITIAL_NODES = {
    'start-node': {
        id: 'start-node',
        type: NODE_TYPES.START,
        label: 'Start',
        connections: { default: null },
    },
};

export const ROOT_ID = 'start-node';
