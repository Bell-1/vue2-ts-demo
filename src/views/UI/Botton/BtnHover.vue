 <template>
	<div class="btn-hover-wrapper">
		<div class="row">
			<div class="title"></div>
			<div class="btn-hover h-solid top">
				<span>top</span>
			</div>
			<div class="btn-hover h-solid left">
				<span>left</span>
			</div>
			<div class="btn-hover h-solid right">
				<span>right</span>
			</div>
			<div class="btn-hover h-solid bottom">
				<span>bottom</span>
			</div>
			<div class="btn-hover h-solid center">
				<span>center</span>
			</div>
		</div>

		<div class="row">
			<div class="btn-hover border top to-right">
				<span>top right</span>
			</div>
			<div class="btn-hover border top to-left">
				<span>top left</span>
			</div>
			<div class="btn-hover border top to-center">
				<span>top center</span>
			</div>
		</div>

		<div class="row">
			<div class="btn-hover border bottom to-right">
				<span>bottom right</span>
			</div>
			<div class="btn-hover border bottom to-left">
				<span>bottom left</span>
			</div>
			<div class="btn-hover border bottom to-center">
				<span>bottom center</span>
			</div>
		</div>

		<div class="row">
			<div class="btn-hover circle">
				<span>bottom circle</span>
			</div>

			<div class="btn-hover across-corners">
				<span>across corners</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class BBotton extends Vue {

	}
</script>

<style lang="scss">
	.btn-hover-wrapper {
		margin-top: 50px;
		.row {
			display: flex;
			margin-bottom: 20px;
			.btn-hover {
				position: relative;
				margin: 10px;
				padding: 0;
				width: 160px;
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 6px;
				background: #6f87b4;
				color: white;
				font-size: 22px;
				overflow: hidden;
				cursor: pointer;
				box-shadow: 6px 6px 12px #818a9b, -6px -6px 12px #d1d7e2;
				box-sizing: border-box;

				span {
					z-index: 1;
				}

				&.h-solid {
					&::before {
						content: '';
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						position: absolute;
						background: #5777b1;
						transition: all 0.2s linear;
						z-index: 0;
					}
					&.top {
						&::before {
							top: -100%;
						}
						&:hover {
							&::before {
								top: 0;
							}
						}
					}

					&.left {
						&::before {
							left: -100%;
						}
						&:hover {
							&::before {
								left: 0;
							}
						}
					}

					&.right {
						&::before {
							left: 100%;
						}
						&:hover {
							&::before {
								left: 0;
							}
						}
					}

					&.bottom {
						&::before {
							top: 100%;
						}
						&:hover {
							&::before {
								top: 0;
							}
						}
					}

					&.center {
						&::before {
							top: 50%;
							left: 50%;
							width: 0;
							height: 0;
						}
						&:hover {
							&::before {
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
							}
						}
					}
				}

				&.border {
					&::before {
						position: absolute;
						content: '';
						background-color: rgb(199, 252, 199);
						transition: all 0.3s linear;
					}
					&.top {
						&::before {
							height: 2px;
							top: 0;
						}
					}
					&.bottom {
						&::before {
							height: 2px;
							bottom: 0;
						}
					}
					&.top,
					&.bottom {
						&.to-right {
							&::before {
								left: 0;
								right: 100%;
							}
							&:hover {
								&::before {
									left: 0;
									right: 0;
								}
							}
						}

						&.to-left {
							&::before {
								left: 100%;
								right: 0;
							}
							&:hover {
								&::before {
									left: 0;
									right: 0;
								}
							}
						}

						&.to-center {
							&::before {
								left: 50%;
								right: 50%;
							}
							&:hover {
								&::before {
									left: 0;
									right: 0;
								}
							}
						}
					}
				}

				&.circle {
					&::before,
					&::after {
						border-radius: 6px;
						box-sizing: border-box;
						content: '';
						position: absolute;
						border: 2px solid transparent;
						width: 0;
						height: 0;
					}

					&::before {
						top: 0;
						left: 0;
					}
					&::after {
						bottom: 0;
						right: 0;
					}

					&:hover {
						&::before {
							border-top-color: rgb(199, 252, 199);
							border-right-color: rgb(199, 252, 199);
							width: 100%;
							height: 100%;
							transition: width 0.25s ease-out,
								height 0.25s ease-out 0.25s;
						}
						&::after {
							border-bottom-color: rgb(199, 252, 199);
							border-left-color: rgb(199, 252, 199);
							width: 100%;
							height: 100%;
							transition: border-color 0s ease-out 0.5s,
								width 0.25s ease-out 0.5s,
								height 0.25s ease-out 0.75s;
						}
					}
				}

				&.across-corners {
					&::before,
					&::after {
						border-radius: 6px;
						box-sizing: border-box;
						content: '';
						position: absolute;
						border: 2px solid transparent;
						width: 0;
						height: 0;
						transition: all 0.25s ease-out;
					}

					&::before {
						top: 0;
						left: 0;
					}
					&::after {
						bottom: 0;
						right: 0;
					}

					&:hover {
						&::before,
						&::after {
							width: 100%;
							height: 100%;
						}
						&::before {
							border-top-color: rgb(199, 252, 199);
							border-left-color: rgb(199, 252, 199);
						}
						&::after {
							border-bottom-color: rgb(199, 252, 199);
							border-right-color: rgb(199, 252, 199);
						}
					}
				}
			}
		}
	}
</style>