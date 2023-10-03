class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

function buildTree(array) {

    function sortArray(array) {
        return [ ...new Set([...array].sort((a, b) => a - b))]
    };

    function createNode(array, start = 0, end = array.length - 1) {

        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);
        node.left = createNode(array, start, mid - 1)
        node.right = createNode(array, mid + 1, end)

        return node;
    };

    return createNode(sortArray(array));
}

// const globalArray = [1, 2, 3, 4, 5];
const globalArray = [1, 9, 3, 2, 4, 6, 5, 8, 7];
// const globalArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = new Tree(globalArray);


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

prettyPrint(BST.root);