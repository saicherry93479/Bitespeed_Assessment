import { CustomNode } from "../Components/CustomeNode";


let id = 0;

export const getId = () => `dndnode_${id++}`;

export const nodeTypes = { 'customNode': CustomNode };