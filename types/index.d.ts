import Vue from 'vue'
import './route'
import './BinaryTree'


declare module 'vue/types/vue' {
	interface Vue {
		$moment: any,
	}
}

interface Window {
	loadlive2d: any;
}