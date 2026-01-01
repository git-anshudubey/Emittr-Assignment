# Workflow Builder UI

A professional, interactive, and visual workflow builder application developed with React and Vite. This application allows users to design logic flows with Actions and Conditions, featuring a premium UI, undo/redo capabilities, and robust state management.

###  [Live Demo](https://workflow-builder-mu.vercel.app/)

![Workflow Builder](./public/screenshot.png)

##  Features

- **Visual Canvas**: Interactive infinite-like canvas with a professional dot-grid background.
- **Node Management**:
  - **Add Nodes**: Insert "Action" or "Condition" (Branching) nodes at any point.
  - **Delete Nodes**: Remove specific steps while intelligently reconnecting the flow.
  - **Edit Labels**: Rename steps directly on the canvas.
- **Branching Logic**: Handle sophisticated "True/False" condition flows visually.
- **History Management**: Full **Undo** and **Redo** support for all actions.
- **Premium UI/UX**:
  - Polished aesthetic using CSS Variables and refined shadows.
  - Clean iconography using `react-icons` (Lucide set).
  - Smooth hover states and transitions.
- **Save Functionality**: "Save" button logs the serialized workflow JSON to the console (extensible for backend integration).

##  Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Modules approach with global variables)
- **Icons**: React Icons (Lucide)
- **State Management**: React Context API (with custom History stack)
- **UUID**: Native `crypto.randomUUID()` for unique node IDs

##  Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or unzip the project folder):
   ```bash
   cd Emittr-Assignment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` to start building workflows.

##  Usage Guide

1. **Adding Steps**: Click the **(+)** button on any empty connector line. Select **Action** (linear step) or **Condition** (branches into True/False).
2. **Editing**: Click on any node's text label to rename it. Press Enter or click away to save.
3. **Deleting**: Hover over a node and click the **(x)** icon (top right) to delete it. The "Start" node cannot be deleted.
4. **Undo/Redo**: Use the toolbar buttons at the top to revert or re-apply changes.
5. **Saving**: Click the **Save Workflow** button to output the current JSON structure to the browser developer console (F12).

##  Project Structure

```
src/
├── components/
│   ├── AddNodeButton.jsx  # Interactive menu to add new steps
│   ├── Canvas.jsx         # Main workspace container
│   ├── Node.jsx           # Individual card UI (with editing/delete)
│   ├── NodeRenderer.jsx   # Recursive component to draw the tree
│   └── Toolbar.jsx        # Undo/Redo/Save controls
├── context/
│   └── WorkflowContext.jsx # Global state & logic (Add, Delete, History)
├── assets/                # Static assets
├── Canvas.css             # Specific styles for the visual graph
├── index.css              # Global styles & variables
├── App.jsx                # Main Layout
└── main.jsx               # Entry point
```

##  Data Structure

The workflow is stored as a normalized flat object for O(1) lookups:

```javascript
{
  "uuid-1": {
    id: "uuid-1",
    type: "start",
    label: "Start",
    connections: { default: "uuid-2" }
  },
  "uuid-2": {
    id: "uuid-2",
    type: "condition",
    label: "Check Login",
    connections: { true: "uuid-3", false: "uuid-4" }
  },
  // ...
}
```
