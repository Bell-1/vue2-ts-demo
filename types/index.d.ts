import Vue from 'vue'
import './route'
import './BinaryTree'


declare module 'vue/types/vue' {
	interface Vue {
		[propName: string]: any;
	}
}

declare global {
	interface Window {
		loadlive2d: any;
	}
}