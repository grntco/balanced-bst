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

    insert(value) {
        const node = new Node(value);
        const root = this.root;

        if (!root) {
            root = node;
            return;
        }

        let prev = null;
        let temp = root;
        while (temp) {
            if (node.data < temp.data) {
                prev = temp;
                temp = temp.left;
            } else {
                prev = temp;
                temp = temp.right;
            }
        }

        if (node.data < prev.data) {
            prev.left = node;
        } else if (node.data > prev.data) {
            prev.right = node;
        }
    }

    delete(value) {
        this.root = this._deleteRec(this.root, value);
    }

    _deleteRec(root, value) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = this._deleteRec(root.left, value);
        } else if (value > root.data) {
            root.right = this._deleteRec(root.right, value);
        } else { // if equal

            // one child or no child
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            // two children
            let minValueNode = root.right;
            while(minValueNode.left !== null) {
                minValueNode = minValueNode.left;
            }

            root.data = minValueNode.data;
            root.right = this._deleteRec(root.right, minValueNode.data)
        }
        return root;
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

const globalArray = [1, 2, 3, 4, 5, 6];
// const globalArray = [1, 9, 3, 2, 4, 6, 5, 8, 7];
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
BST.delete(3)
prettyPrint(BST.root);
