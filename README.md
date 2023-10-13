# Balanced Binary Search Tree
This is a project for [The Odin Project](https://www.theodinproject.com/lessons/javascript-binary-search-trees#assignment) to build a balanced binary search tree (BST) with various methods (listed below).

The JS file includes two classes, `Node`, which is used to create the individual nodes of the tree, and `Tree`, which is used to create a tree. 

Also included is a global function `buildTree`, which takes an array, sorts it, and returns a BST.

The `Tree` class includes the folloing methods:

1. `insert` accepts a value and adds a new leaf node with that value to the correct location on the tree.
2. `delete` accepts a value and removes the node with that corresponding value from the tree.
3. `find` accepts a value and returns the node with the given value.
4. `levelOrder` accepts a callback function as a parameter, traverses the tree "breadth first" (i.e., level order) and calls the callback function with each node as a parameter. If no callback function is provided, `levelOrder` returns an array of values listed in level order.
5. `preOrder` accepts a callback function as a parameter, traverses the tree "depth first" in a pre-order approach (i.e., root, left, right), and calls the callback function with each node as a parameter. If no callback function is provided, `preOrder` returns an array of values listed in pre-order.
6. `inOrder` accepts a callback function as a parameter, traverses the tree "depth first" in an in-order approach (i.e., left, root, right), and calls the callback function with each node as a parameter. If no callback function is provided, `inOrder` returns an array of values listed in in-order.
7. `postOrder` accepts a callback function as a parameter, traverses the tree "depth first" in a post-order approach (i.e., left, right, root), and calls the callback function with each node as a parameter. If no callback function is provided, `postOrder` returns an array of values listed in post-order.
8. `height` accepts a node and returns its height, which is defined as the number of edges in longest path from a given node to a leaf node. A leaf node has a height of 0.
9. `depth` accepts a node and returns its depth, which is defined as the number of edges in path from a given node to the tree's root node. A tree's root node has a depth of 0. 
10. `isBalanced` returns a Boolean value expressing whether the tree is balanced or not. A balanced tree is one where the difference between heights of the left subtree and right subtree is no more than 1.
11. `reblance` rebalances an unbalanced tree. An unbalanced tree can occur if multiple values are inserted after the tree is already created.

The script also includes a provided `prettyPrint` function by The Odin Project that helps visualize the tree in the console, as well as some of my own informal "tests" that output the `Tree`'s methods' return values to the console.
