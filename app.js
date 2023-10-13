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
        const _insertRec = function(root, value) {
            if (root === null) {
                const newNode = new Node(value);
                return newNode;
            }

            if (value < root.data) {
                root.left = _insertRec(root.left, value);
            } else if (value > root.data) {
                root.right = _insertRec(root.right, value);
            }

            return root;
        }

        return _insertRec(this.root, value);
    }

    delete(value) {

        const _deleteRec = function(root, value) {
            if (root === null) return root;
    
            if (value < root.data) {
                root.left = _deleteRec(root.left, value);
            } else if (value > root.data) {
                root.right = _deleteRec(root.right, value);
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
                root.right = _deleteRec(root.right, minValueNode.data)
            }
            return root;
        }

        this.root = _deleteRec(this.root, value);
    }

    find(value) {

        const _findRec = function(root, value) {
            if (value < root.data) {
                root = _findRec(root.left, value);
            } else if (value > root.data) {
                root = _findRec(root.right, value);
            }
            
            return root;
        }

        return _findRec(this.root, value)
    }

    levelOrder(func) {
        if (this.root === null) return [];
        
        let queue = [this.root];
        let values = [];

        while (queue.length !== 0) {
            let temp = queue.shift();

            if (func) {
                func(temp);
            } else {
                values.push(temp.data);
            }

            if (temp.left !== null) queue.push(temp.left);
            if (temp.right !== null) queue.push(temp.right);
        }

        if (!func) return values;
    }

    preOrder(func) {
        const values = [];

        const _preOrderRec = function(root) {
            if (root === null) return;

            if (func) {
                func(root);
            } else {
                values.push(root.data);
            }
    
            _preOrderRec(root.left);
            _preOrderRec(root.right);
        };

        _preOrderRec(this.root);
        if (!func) return values;
    }

    inOrder(func) {
        const values = [];

        const _inOrderRec = function(root) {
            if (root === null) return;

            _inOrderRec(root.left);

            if (func) {
                func(root);
            } else {
                values.push(root.data);
            }

            _inOrderRec(root.right);
        }

        _inOrderRec(this.root);
        if (!func) return values;
    }

    postOrder(func) {
        const values = [];

        const _postOrderRec = function(root) {
            if (root === null) return;

            _postOrderRec(root.left);
            _postOrderRec(root.right);

            if (func) {
                func(root);
            } else {
                values.push(root.data);
            }
        }

        _postOrderRec(this.root);
        if (!func) return values;
    }

    height(node) {
        if (node === null) return 0;    
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(node) {
        let level = 0;
        let temp = this.root;

        while (node !== null) {

            if (node.data === temp.data) {
                return level;
            } else if (node.data < temp.data) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }

            level++;
        }

        return -1; // node not in tree
    }

    isBalanced() {
        const leftHeight = this.height(this.root.left);
        const rightHeight = this.height(this.root.right);

        if (leftHeight === rightHeight || leftHeight + 1 === rightHeight || leftHeight - 1 === rightHeight) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const resorted = this.inOrder();
        this.root = buildTree(resorted); 
    }
 }

// Build the tree
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

// Function provided by The Odin Project to visualize the BST
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

// Generate an array of random integers
const getRandomArray = function(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 100))
    }
    return array;
}


// Console.log "tests"

// Create the tree
const BST = new Tree(getRandomArray(10));
prettyPrint(BST.root);
console.log('Is the tree balanced?', BST.isBalanced() ? 'Yes' : 'False'); // 'Yes'
console.log('Level Order: ' + BST.levelOrder().join(', '));
console.log('Preorder: ' + BST.preOrder().join(', '));
console.log('Inorder: ' + BST.inOrder().join(', '));
console.log('Postorder: ' + BST.postOrder().join(', '));

// Unbalance the tree
BST.insert(140);
BST.insert(120);
BST.insert(110);
BST.insert(130);
prettyPrint(BST.root);
console.log('Is the tree balanced?', BST.isBalanced() ? 'Yes' : 'No'); // 'No'

// Rebalance the tree
BST.rebalance();
prettyPrint(BST.root);
console.log('Is the tree balanced?', BST.isBalanced() ? 'Yes' : 'False'); // 'Yes'
console.log('Level Order: ' + BST.levelOrder().join(', '));
console.log('Preorder: ' + BST.preOrder().join(', '));
console.log('Inorder: ' + BST.inOrder().join(', '));
console.log('Postorder: ' + BST.postOrder().join(', '));


