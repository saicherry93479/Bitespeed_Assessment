import { useState, useRef, useCallback, createContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  Node,
  Connection,
  Edge,
} from "reactflow";

import Sidebar from "./Components/Sidebar";
import SettingsPanel from "./Components/SettingsPanel";
import { getId, nodeTypes } from "./Utils/utils";
import {
  BACKGROUND_COLOR,
  CUSTOME_NODE,
  DEFAULT_NODE_MESSAGE,
  DROP_EFFECT,
  EDGE_TYPE,
} from "./Utils/Constants";

import "reactflow/dist/style.css";
import "./App.css";
import TopBar from "./Components/TopBar";

type CurrentNodeContextType = {
  selectedNode: Node | null;
} | null;

export const CurrentNodeContext = createContext<CurrentNodeContextType>(null);

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [currentNodeText, setCurrentNodeText] =
    useState<string>(DEFAULT_NODE_MESSAGE);
  const [modal, setModal] = useState<{
    show: boolean;
    message: string;
    type: number;
  }>({
    show: false,
    message: "",
    type: 0,
  });

  const onConnect = useCallback(
    (params: Connection) => {
      const alreadyConnected = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (alreadyConnected) {
      } else {
        const newEdge = {
          ...params,
          type: EDGE_TYPE,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        setEdges((edges) => addEdge(newEdge, edges));
      }
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = DROP_EFFECT;
    },
    []
  );

  const onDrop = useCallback(
    (event: { preventDefault: () => void; clientX: any; clientY: any }) => {
      event.preventDefault();

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let id = getId();
      console.log("text is ", currentNodeText);
      const newNode = {
        id: id,
        type: CUSTOME_NODE,
        position,

        data: { label: currentNodeText, value: id },
      };

      setNodes((nds) => nds.concat(newNode));
      setCurrentNodeText(DEFAULT_NODE_MESSAGE);
    },
    [reactFlowInstance, setNodes, currentNodeText]
  );

  const onElementClick = useCallback((_event: any, element: any) => {
    setSelectedNode(element);
  }, []);

  const updateNodeText = useCallback(
    (text: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode?.id) {
            let Final = {
              ...node,
              data: { ...node.data, label: text },
            };
            setSelectedNode(Final);
            return Final;
          }

          return node;
        })
      );
    },
    [selectedNode, setNodes]
  );

  const onSaveFlow = useCallback(() => {
    if (nodes.length <= 1) {
      console.log("Flow saved successfully."); // Not enough nodes to check the condition
      return;
    }
    const nodeIncomingEdges = edges.reduce((acc: any, edge: Edge) => {
      acc[edge.target] = (acc[edge.target] || 0) + 1;
      return acc;
    }, {});
    const nodesWithEmptyTargetHandles = nodes.filter(
      (node) => !nodeIncomingEdges[node.id]
    ).length;

    if (nodesWithEmptyTargetHandles > 1) {
      setModal({
        show: true,
        message: "cannot save flow",
        type: 1,
      });
      setTimeout(() => {
        setModal({
          show: false,
          message: "",
          type: 0,
        });
      }, 2000);
    } else {
      setModal({
        show: true,
        message: "successfully saved flow",
        type: 2,
      });
      setTimeout(() => {
        setModal({
          show: false,
          message: "",
          type: 0,
        });
      }, 2000);
    }
  }, [nodes, edges]);

  const onNodesDelete = () => setSelectedNode(null);

  return (
    <CurrentNodeContext.Provider
      value={{
        selectedNode: selectedNode,
      }}
    >
      <div className="h-screen w-screen">
        <TopBar modal={modal} onSaveFlow={onSaveFlow}></TopBar>
        <div className="flex  h-full">
          <ReactFlowProvider>
            <div className=" !w-screen !h-[94vh] grow-1" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onElementClick}
                fitView
                nodeTypes={nodeTypes}
                onNodesDelete={onNodesDelete}
              >
                <Controls />
                <Background color={BACKGROUND_COLOR} gap={20} />
              </ReactFlow>
            </div>
            {selectedNode ? (
              <SettingsPanel
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                updateNodeText={updateNodeText}
              ></SettingsPanel>
            ) : (
              <Sidebar
                setCurrentNodeText={setCurrentNodeText}
                currentNodeText={currentNodeText}
              />
            )}
          </ReactFlowProvider>
        </div>
      </div>
    </CurrentNodeContext.Provider>
  );
};

export default FlowBuilder;
