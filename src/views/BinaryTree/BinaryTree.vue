<template>
	<div class="BinaryTree">
		<div class="">
			<el-input
				class="add"
				v-model.number="val"
			>
				<el-button
					slot="append"
					@click="handleAddNode"
				>添加节点</el-button>
			</el-input>
			<el-input
				type="textarea"
				v-model="NodeTreeStr"
			></el-input>
		</div>
		<div class="show-list">

			<div class=" flex start">
				<label for="">输入顺序</label>
				<p>{{nodeList}}</p>
			</div>
			<div class="flex start">
				<label for="">深度</label>
				<p>{{depth}}</p>
			</div>
			<div class="flex start">
				<label for="">先序遍历</label>
				<p>{{preListRec}}</p>
			</div>
			<div class="flex start">
				<label for="">后序遍历</label>
				<p>{{postListRec}}</p>
			</div>
			<div class="flex start">
				<label for="">广度遍历</label>
				<p>{{breadthList}}</p>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import { treeNode } from 'element-ui/types/table';

	@Component({})
	export default class MyComponent extends Vue {
		val: number = 0;
		depth: number = 0;
		nodeTree: TreeNode | null = null;
		nodeList: number[] = [];
		preListRec: number[] = [];
		postListRec: number[] = [];
		breadthList: number[] = [];

		get NodeTreeStr() {
			return JSON.stringify(this.nodeTree, null, 4);
		}

		mounted() {
		}

		createNode(val: number) {
			return {
				val,
				left: null,
				right: null,
			}
		}

		handleAddNode() {
			if (this.val >= 0) {
				this.addNode(this.val)

			}
		}

		addNode(val: number) {
			let { nodeTree } = this;
			let node: TreeNode = this.createNode(val);
			if (nodeTree === null) {
				this.nodeTree = node; 
				this.nodeList.push(val)
			} else {
				this.insetNode(nodeTree, node);
				this.preListRec = [];
				this.postListRec = [];
				this.breadthList = [];
				this.preOrderRec(nodeTree);
				this.postOrderRec(nodeTree);
				this.breadthTraversal(nodeTree);
			}
			this.depth = this.calcDepth(this.nodeTree);
		}

		insetNode(node: TreeNode, newNode: TreeNode) {
			if (newNode.val < node.val) {
				if (node.left === null) {
					node.left = newNode;
					this.nodeList.push(newNode.val)
				} else {
					this.insetNode(node.left, newNode);
				}
			} else if (newNode.val > node.val) {
				if (node.right === null) {
					node.right = newNode;
					this.nodeList.push(newNode.val)
				} else {
					this.insetNode(node.right, newNode);
				}
			} else {
				this.$message.warning(newNode.val + '值已存在')
			}
		}

		preOrderRec(node: TreeNode | null) {
			if (node) { //判断二叉树是否为空
				this.preListRec.push(node.val); //将结点的值存入数组中
				this.preOrderRec(node.left); //递归遍历左子树
				this.preOrderRec(node.right); //递归遍历右子树
			}
		}

		postOrderRec(node: TreeNode | null) {
			if (node) { //判断二叉树是否为空
				this.postOrderRec(node.left); //递归遍历左子树
				this.postOrderRec(node.right); //递归遍历右子树
				this.postListRec.push(node.val); //将结点的值存入数组中
			}
		}

		breadthTraversal(node: TreeNode | null) {
			let list = [];
			if (node) {
				let que = [node];
				while (que.length) {
					let nowNode = que.shift();
					nowNode && list.push(nowNode.val);
					if (nowNode?.left) que.push(nowNode.left);
					if (nowNode?.right) que.push(nowNode.right);
				}
			}
			this.breadthList = list;
		}

		calcDepth(node: TreeNode | null): number {
			if (!node) return 0;
			return Math.max(this.calcDepth(node?.left), this.calcDepth(node.right)) + 1;
		}
	}
</script>

<style lang="scss">
	.BinaryTree {
		.add {
			width: 150px;
			margin: 20px 0;
		}

		textarea {
			min-height: 200px !important;
		}

		.show-list {
			padding: 10px 20px;
			margin-top: 30px;
			box-shadow: inset 4px 4px 6px rgba(148, 148, 148, 0.5), inset -4px -4px 6px rgba(231, 236, 236, 0.8);
			border-radius: 4px;
			label {
				margin-right: 20px;
			}
		}
	}
</style>