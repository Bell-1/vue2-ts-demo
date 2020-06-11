import Vue from 'vue'
import './route'


declare module 'vue/types/vue' {
	interface Vue {
		$moment: any,
	}
}