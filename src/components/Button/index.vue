<template>
	<div
		class="b-btn"
		:class="[typeClass, sizeClass, roundClass, radiusClass]"
		@click="$emit('click')"
	>
		<i v-if="icon" class="b-btn-icon" :class="icon"></i>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	const types = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
	const sizes = ['mini', 'small', 'large'];

	@Component({})
	export default class BBtn extends Vue {
		@Prop({ default: 'default' }) type!: string
		@Prop({ default: 'default' }) size!: string
		@Prop() round!: string
		@Prop() radius!: string
		@Prop() icon!: string

		get roundClass() {
			return this.round !== undefined ? 'round' : '';
		}

		get radiusClass() {
			return this.radius !== undefined ? 'radius' : '';
		}

		get typeClass() {
			return types.includes(this.type) ? `b-btn-${this.type}` : 'b-btn-default';
		}

		get sizeClass() {
			return sizes.includes(this.size) ? `b-btn-${this.size}` : '';
		}
	}
</script>

<style lang="scss" src="./index.scss"></style>