const Node = function (value = null, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
};

class Tree {
  constructor() {
    this.root = null;
    this.buildtree = this.buildtree.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.find = this.find.bind(this);
    this.levelOrder = this.levelOrder.bind(this);
    this.inorder = this.inorder.bind(this);
    this.preorder = this.preorder.bind(this);
    this.postorder = this.postorder.bind(this);
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
      return console.log("value not in tree");
    } else if (currentRoot.value === val) {
      return [
        console.log("FOUND: "),
        console.log(currentRoot),
        console.log(currentRoot.value),
      ];
    }
    //recursion to find value
    if (val > currentRoot.value) {
      tree.find(val, currentRoot.right, currentRoot);
    } else if (val < currentRoot.value) {
      tree.find(val, currentRoot.left, currentRoot);
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
    values.push(node);
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
    values.push(node);
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
    values.push(node);
    return values;
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

console.log(tree.buildtree(arr1));
console.log(tree);
prettyPrint(tree.root);
tree.insert(15);
tree.insert(12);
tree.insert(17);
tree.insert(2);
prettyPrint(tree.root);
tree.remove(21);
console.log(" ");
prettyPrint(tree.root);
tree.find(15);
tree.levelOrder();
console.log("inorder");
console.log(tree.inorder());
console.log("preorder");
console.log(tree.preorder());
console.log("postorder");
console.log(tree.postorder());
