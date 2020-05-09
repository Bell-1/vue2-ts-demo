function newTreeNode(value) {
    return {
        value,
        left: null,
        right: null,
    }
}

const tree = newTreeNode(1);
const t2 = newTreeNode(2);
const t3 = newTreeNode(3);
const t4 = newTreeNode(4);
const t5 = newTreeNode(5);
const t6 = newTreeNode(6);
const t7 = newTreeNode(7);
const t8 = newTreeNode(8);
const t9 = newTreeNode(9);

tree.left = t2;
tree.right = t3;
t2.left = t4;
t2.right = t5;
t3.left = t6;
t3.right = t7;
t4.left = t8;
t4.right = t9;

console.log('tree', tree);


function treeDeep(node) {
    if (node) {
        const left = treeDeep(node.left)
        const right = treeDeep(node.right)
        return Math.max(left, right) + 1;
    }

    return 0
}

console.log('tree deep', treeDeep(tree));


export function twoSum(nums, target) {
    let s = -1;
    while (nums.length - 1) {
        s++;
        const v = target - nums.shift();
        console.log(s, v)
        for (let j = 0; j < nums.length; j++) {
            console.log(j)
            if (nums[j] === v) {
                return [s, s + 1 + j];
            }
        }

    }
};



export default {}