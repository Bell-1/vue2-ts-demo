<template>
	<div class="b-btn" :class="[typeClass, sizeClass, roundClass, radiusClass]">
		<i v-if="icon" :class="icon"></i>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	const types = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
	const sizes = ['default', 'mini', 'small', 'large'];

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
			return types.includes(this.type) ? this.type : 'default';
		}

		get sizeClass() {
			return sizes.includes(this.size) ? this.size : 'default';
		}
	}
</script>

<style lang="scss">
	$default: rgb(240, 240, 240);
	$primary: rgb(164, 187, 250);
	$danger: rgba(245, 125, 117, 0.781);
	$warning: rgba(240, 199, 86, 0.781);
	$info: rgba(113, 221, 224, 0.781);
	$success: rgba(121, 223, 111, 0.781);
	.b-btn {
		position: relative;
		margin: 10px;
		padding: 12px 30px;
		overflow: hidden;
		font-size: 14px;
		border-radius: 6px;
		color: #333;
		background: #fff;
		border: 1px solid transparent;
		box-sizing: border-box;
		cursor: pointer;
		transition: color 0.5s, background-color 0.5s;

		i {
			font-size: 18px;
		}

		&.round {
			border-radius: 50px;
		}

		&.radius {
			padding: 0;
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}

		&.mini {
			padding: 6px 18px;
			font-size: 12px;
		}

		&.small {
			padding: 8px 22px;
			font-size: 13px;
		}

		&.large {
			padding: 16px 36px;
			font-size: 18px;
		}

		&:before,
		&:after {
			height: 2px;
			content: '';
			position: absolute;
			transition: all 0.5s;
			width: 0;
		}

		&:before {
			top: 0;
			left: 0;
		}
		&:after {
			bottom: 0;
			right: 0;
		}

		&:hover {
			&:not(.round):not(.radius) {
				&:before,
				&:after {
					width: 100%;
				}
			}
		}

		&.default {
			background: $default;

			&:before,
			&:after {
				background: $default;
			}
			&:hover {
				background: white;
				&.round,
				&.radius {
					border-color: $default;
				}
			}
		}

		&.primary {
			color: white;
			background: $primary;
			&:before,
			&:after {
				background: $primary;
			}
			&:hover {
				background: white;
				color: $primary;
				&.round,
				&.radius {
					border-color: $primary;
				}
			}
		}

		&.success {
			color: white;
			background: $success;
			&:before,
			&:after {
				background: $success;
			}
			&:hover {
				background: white;
				color: $success;
				&.round,
				&.radius {
					border-color: $success;
				}
			}
		}

		&.info {
			color: white;
			background: $info;
			&:before,
			&:after {
				background: $info;
			}
			&:hover {
				background: white;
				color: $info;
				&.round,
				&.radius {
					border-color: $info;
				}
			}
		}

		&.warning {
			color: white;
			background: $warning;
			&:before,
			&:after {
				background: $warning;
			}
			&:hover {
				background: white;
				color: $warning;
				&.round,
				&.radius {
					border-color: $warning;
				}
			}
		}

		&.danger {
			color: white;
			background: $danger;
			&:before,
			&:after {
				background: $danger;
			}
			&:hover {
				background: white;
				color: $danger;
				&.round,
				&.radius {
					border-color: $danger;
				}
			}
		}
	}
</style>