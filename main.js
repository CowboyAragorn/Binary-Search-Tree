const Node = function (value = null, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
};

class Tree {
  constructor() {
    this.root = null;
    this.buildtree = this.buildtree.bind(this);
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

const arr1 = [1, 3, 4, 5, 7, 8, 9, 10];

let tree = new Tree();

console.log(tree.buildtree(arr1));
console.log(tree);
prettyPrint(tree.root);
