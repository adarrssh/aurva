const checkForViewDetailsNode = (nodesArr: Node[]): boolean => {
    // @ts-ignore
    return nodesArr.some(node => node.type === "viewDetailsNode");
  };

export {checkForViewDetailsNode}