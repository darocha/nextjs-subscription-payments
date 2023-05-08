import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions
} from '@minoru/react-dnd-treeview';
import { CustomData } from './types';
import { CustomNode } from './CustomNode';
import { theme } from './theme';
import styles from './App.module.css';
import SampleData from './sample_data.json';

function App() {
  const [treeData, setTreeData] = useState<NodeModel[]>(SampleData);
  const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <Tree
            tree={treeData}
            rootId={0}
            render={(
              node: NodeModel<CustomData>,
              { depth, isOpen, onToggle }
            ) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
              />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
