const Node = function (value = null, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
};

class Tree {
  constructor() {
    this.root = null;
  }
  buildtree(array) {
    if (array.length === 1) {
      return new Node(array[0]);
    } else if (array.length === 0) {
      return null;
    }
    //Initialize start = 0, end = length of array - 1
    let start = 0;
    let end = array.length - 1;
    //mid = start+end/2
    let mid = Math.floor((start + end) / 2);
    //create left and right subArray
    let leftSubArray = [];
    let justLeft = mid - 1;
    for (let i = start; i <= justLeft; i++) {
      leftSubArray.push(array[i]);
    }
    let rightSubArray = [];
    let justRight = mid + 1;
    for (let i = justRight; i <= end; i++) {
      rightSubArray.push(array[i]);
    }
    //create a tree node with mid as root
    const newNode = new Node(array[mid]);

    newNode.left = this.buildtree(leftSubArray);
    newNode.right = this.buildtree(rightSubArray);
    return (this.root = newNode);
  }
  insert(val, cRoot = tree.root) {
    let currentRoot = cRoot;
    if (val > currentRoot.value) {
      if (currentRoot.right === null) {
        const newNode = new Node(val);
        currentRoot.right = newNode;
        return;
      } else {
        tree.insert(val, currentRoot.right);
      }
    } else if (val < currentRoot.value) {
      if (currentRoot.left === null) {
        const newNode = new Node(val);
        currentRoot.left = newNode;
        return;
      } else {
        tree.insert(val, currentRoot.left);
      }
    } else if (val === currentRoot.value) {
      return console.log("value already in search tree");
    }
  }
  remove(val, cRoot = tree.root, preNode = null) {
    let prevNode = preNode;
    let currentRoot = cRoot;
    if (currentRoot === null) {
      return console.log("value not in tree");
    }
    //if the value is found//
    if (val === currentRoot.value) {
      //if the node has no leaves, remove path from prevNode
      if (currentRoot.left === null && currentRoot.right === null) {
        currentRoot.value > preNode.value
          ? (prevNode.right = null)
          : (preNode.left = null);
        return;
        //if the node has only one leaf, copy the leaf, delete parent, reassign copied leaf to prevnode
      } else if (
        (currentRoot.left === null && currentRoot.right != null) ||
        (currentRoot.left != null && currentRoot.right === null)
      ) {
        currentRoot.left === null
          ? (prevNode.left = currentRoot.right)
          : (preNode.right = currentRoot.left);
        return;
      }
      //else if node has two leaves, switch with next best candidate
      else {
        //Initialize variables to traverse the loop and keep track of prev node
        let loopRoot = currentRoot.right;
        let prevLoopRoot = currentRoot;
        //loop through to find the lowest value leaf on the right side
        while (loopRoot.left != null) {
          prevLoopRoot = loopRoot;
          loopRoot = loopRoot.left;
        }
        //update value for currentRoot
        currentRoot.value = loopRoot.value;
        loopRoot.value = loopRoot.value;
        prevLoopRoot.value = prevLoopRoot.value;
        //erase location of value to be switched from its previous node.
        // If there are right hand nodes of the value to be switched, assign them to the left of the previous node, otherwise null
        if (loopRoot.value < prevLoopRoot.value) {
          loopRoot.right != null
            ? (prevLoopRoot.left = loopRoot.right)
            : (prevLoopRoot.left = loopRoot.left);
        } else {
          loopRoot.right != null
            ? (prevLoopRoot.right = loopRoot.right)
            : (prevLoopRoot.right = loopRoot.left);
        }
        return;
      }

      //recursion to find value
    } else if (val > currentRoot.value) {
      tree.remove(val, currentRoot.right, currentRoot);
    } else if (val < currentRoot.value) {
      tree.remove(val, currentRoot.left, currentRoot);
    }
  }
  find(val, croot = this.root, preNode = null) {
    let prevNode = preNode;
    let currentRoot = croot;
    if (currentRoot === null) {
      console.log("value not in tree");
      return null;
    } else if (currentRoot.value === val) {
      console.log(currentRoot);
      return currentRoot;
    }
    //recursion to find value
    if (val > currentRoot.value) {
      return tree.find(val, currentRoot.right, currentRoot);
    } else if (val < currentRoot.value) {
      return tree.find(val, currentRoot.left, currentRoot);
    }
  }
  levelOrder(queue = [this.root], values = []) {
    if (queue.length === 0) {
      return console.log(values);
    }
    let tempQueue = [];
    //unload current queue values into total values
    for (let i = 0; i < queue.length; i++) {
      values.push(queue[i]);
    }
    //load tempQueue with new values
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left != null) {
        tempQueue.push(queue[i].left);
      }
      if (queue[i].right != null) {
        tempQueue.push(queue[i].right);
      }
    }
    //dequeue followed by enqueue
    queue = [];
    queue = tempQueue;
    //recursively call level order with updated queue and values
    tree.levelOrder(queue, values);
  }
  inorder(node = this.root, values = []) {
    //never visiting this one, need to find final exit condition
    if (node === null) {
      return values;
    }
    //visit the left subtree
    this.inorder(node.left, values);
    //visit the node
    values.push(node.value);
    // console.log(values);
    //visit the right subtree
    return this.inorder(node.right, values);
  }
  preorder(node = this.root, values = []) {
    //never visiting this one, need to find final exit condition
    if (node === null) {
      return values;
    }

    //visit the node
    values.push(node.value);
    //visit the left subtree
    this.preorder(node.left, values);
    //visit the right subtree
    return this.preorder(node.right, values);
  }
  postorder(node = this.root, values = []) {
    //never visiting this one, need to find final exit condition
    if (node === null) {
      return values;
    }

    //visit the left subtree
    this.postorder(node.left, values);
    //visit the right subtree
    this.postorder(node.right, values);
    //visit the node
    values.push(node.value);
    return values;
  }
  height(node, h = 0) {
    //return height
    if (node == null) {
      return -1;
    }
    //check the left subtree for length recursively
    let leftHeight = this.height(node.left, h);
    //check the right subtree for length recursively
    let rightHeight = this.height(node.right, h);

    let answer = Math.max(leftHeight, rightHeight) + 1;
    return answer;
  }
  depth(origNode, node = this.root, d = 0) {
    if (origNode == null) {
      return null;
    }
    if (node == null) {
      return -1;
    }
    let val = origNode.value;
    if (val > node.value) {
      d++;
      return this.depth(origNode, node.right, d);
    } else if (val < node.value) {
      d++;
      return this.depth(origNode, node.left, d);
    } else {
      return d;
    }
  }
  isBalanced(node = this.root) {
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    let heightDifference;
    if (leftHeight >= rightHeight) {
      heightDifference = leftHeight - rightHeight;
    } else {
      heightDifference = rightHeight - leftHeight;
    }

    if (heightDifference > 1) {
      return false;
    } else {
      return true;
    }
  }
  rebalance() {
    this.buildtree(this.inorder());
  }
  randArray() {
    let array = [];
    let randNum = Math.floor(Math.random() * 100);
    for (let i = 0; i < randNum; i++) {
      let randNum2 = Math.floor(Math.random() * 100);
      array.push(randNum2);
    }
    array.sort(function (a, b) {
      return a - b;
    });
    let uniqueInts = [...new Set(array)];

    return uniqueInts;
  }

  driver() {
    //rand array provides a random array of 1-100 length of values 1-100
    this.buildtree(this.randArray());
    console.log("visualization of first tree");
    prettyPrint(this.root);
    console.log("Is this tree balanced?");
    console.log(this.isBalanced());
    console.log("inorder traversal");
    console.log(this.inorder());
    console.log("preorder traversal");
    console.log(this.preorder());
    console.log("postorder traversal");
    console.log(this.postorder());
    console.log("insert several values to unbalance the tree");
    this.insert(101);
    this.insert(102);
    this.insert(103);
    this.insert(104);
    this.insert(105);
    this.insert(106);
    console.log("visualization of unbalanced tree");
    prettyPrint(this.root);
    console.log("Is this tree balanced now?");
    console.log(this.isBalanced());
    console.log("Ok then, rebalance the tree");
    this.rebalance();
    console.log("rebalancing complete");
    prettyPrint(this.root);
    console.log("Is the tree balanced now?");
    console.log(this.isBalanced());
    console.log("inorder traversal");
    console.log(this.inorder());
    console.log("preorder traversal");
    console.log(this.preorder());
    console.log("postorder traversal");
    console.log(this.postorder());
    console.log("Nice");
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr1 = [
  1, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 40, 60, 74, 85, 90, 100, 110, 133,
  134, 155, 185, 190, 200,
];

let tree = new Tree();
//tree.driver creates a new tree from a randomized sorted array, checks for balance, prints in, pre, and post order
//deliberately unbalances the tree, checks for balance, rebalances, confirms rebalance, then prints rebalanced tree in pre, post, and in order traversals
tree.driver();

//various testing used in creation of methods, left in to turn on or off for individual methods
/*
console.log(tree.buildtree(arr1));
console.log(tree);
prettyPrint(tree.root);
tree.insert(15);
tree.insert(12);
tree.insert(17);
tree.insert(2);
tree.insert(400);
tree.insert(500);
tree.insert(600);
tree.insert(700);
tree.insert(800);
tree.insert(50);
tree.insert(65);
tree.insert(28);
tree.insert(76);
prettyPrint(tree.root);
tree.remove(21);
console.log(" ");
prettyPrint(tree.root);
tree.levelOrder();
console.log("inorder");
console.log(tree.inorder());
console.log("preorder");
console.log(tree.preorder());
console.log("postorder");
console.log(tree.postorder());
console.log("height");
console.log(tree.height(tree.find(14)));
console.log("depth");
console.log(tree.depth(tree.find(20)));
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
console.log(tree.randArray());
*/
