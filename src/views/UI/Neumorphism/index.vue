<template>
	<div class="Neumorphism">
		<section class="btn-block">
			<div class="mimic-btn">default</div>
			<div class="mimic-btn inset">inset</div>
			<div class="mimic-btn hover">hover</div>
			<div class="mimic-btn active">active</div>
		</section>

		<section class="btn-block white">
			<div class="mimic-btn">default</div>
			<div class="mimic-btn inset">inset</div>
			<div class="mimic-btn hover">hover</div>
			<div class="mimic-btn active">active</div>
		</section>

		<section class="card-block">
			<div class="mimic-card">card</div>
		</section>

		<section class="progress-block col">
			<div class="mimic-progress-wrapper horizontal">
				<div class="mimic-progress" style="--percent: 20%"></div>
			</div>

			<div class="mimic-progress-wrapper horizontal">
				<div class="mimic-progress" style="--percent: 50%; --color: #bde0e0"></div>
			</div>

			<div class="mimic-progress-wrapper horizontal">
				<div class="mimic-progress" style="--percent: 80%; --color: #ceb4ce"></div>
			</div>

			<div class="mimic-progress-wrapper horizontal">
				<div class="mimic-progress" style="--percent: 100%; --color: #f3c9c9"></div>
			</div>
		</section>

		<section class="progress-block">
			<div class="mimic-progress-wrapper vertical">
				<div class="mimic-progress" style="--percent: 20%; --color: #b6bf6f"></div>
			</div>

			<div class="mimic-progress-wrapper vertical">
				<div class="mimic-progress" style="--percent: 50%"></div>
			</div>

			<div class="mimic-progress-wrapper vertical">
				<div class="mimic-progress" style="--percent: 70%; --color: #7396b9"></div>
			</div>

			<div class="mimic-progress-wrapper vertical">
				<div class="mimic-progress" style="--percent: 100%; --color: #e079ad"></div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Mimic extends Vue {

	}
</script>


<style lang="scss" >
	.Neumorphism {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		section {
			margin: 50px 0 0 30px;
			padding: 50px 20px;
			border-radius: 20px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
		.btn-block {
			background: #ff8040;
			box-shadow: 0px 0px 1px #d16934, -0px -0px 0px #ff974c,
				inset 6px 6px 12px #d16934, inset -6px -6px 12px #ff974c;

			.mimic-btn {
				margin: 20px 30px;
				width: 100px;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				border-radius: 20px;
				background: #ff8040;
				box-shadow: 6px 6px 12px #d16934, -6px -6px 12px #ff974c;
				cursor: pointer;
				transition: all 0.2s;
				&.inset {
					box-shadow: 0px 0px 1px #d16934, -0px -0px 0px #ff974c,
						inset 6px 6px 12px #d16934, inset -6px -6px 12px #ff974c;
				}
				&.active:active {
					box-shadow: 0px 0px 1px #d16934, -0px -0px 0px #ff974c,
						inset 6px 6px 12px #d16934, inset -6px -6px 12px #ff974c;
				}

				&.hover:hover {
					box-shadow: 0px 0px 1px #d16934, -0px -0px 0px #ff974c,
						inset 6px 6px 12px #d16934, inset -6px -6px 12px #ff974c;
				}
			}

			&.white {
				background: #f3f8fc;
				box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
					inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;

				.mimic-btn {
					background: #f3f8fc;
					color: #111;
					box-shadow: 6px 6px 12px #e0e3e6, -6px -6px 12px #f1f5f8;
					&.inset {
						box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
							inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
					}
					&.active:active {
						box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
							inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
					}

					&.hover:hover {
						box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
							inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
					}
				}
			}
		}
		.card-block {
			background: #f3f8fc;
			box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
				inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
			.mimic-card {
				margin: 20px 30px;
				width: 300px;
				height: 200px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #f3f8fc;
				border-radius: 20px;
				color: #f3f8fc;
				font-size: 60px;
				font-weight: bold;
				text-shadow: -4px -4px 6px rgba(#f3f3f3, 0.5),
					4px 4px 6px rgba(#b3b5b8, 0.8);
				box-shadow: -6px -6px 12px rgba(#f3f3f3, 0.5),
					6px 6px 12px rgba(#e2e7ec, 0.5);
				cursor: pointer;
				transition: all 0.2s;
			}
		}
		.progress-block {
			&.col {
				flex-direction: column;
			}
			background: #f3f8fc;
			box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
				inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
			.mimic-progress-wrapper {
				margin: 20px;
				background: #f3f8fc;
				box-shadow: 0px 0px 1px #e0e3e6, -0px -0px 0px #f1f5f8,
					inset 6px 6px 12px #e0e3e6, inset -6px -6px 12px #f1f5f8;
				.mimic-progress {
					background: #bcd3e5;
				}

				&.horizontal {
					width: 200px;
					height: 20px;
					border-radius: 20px;
					.mimic-progress {
						width: var(--percent);
						height: 100%;
						border-radius: 20px;
						background: var(--color, #bcd3e5);
					}
				}

				&.vertical {
					height: 200px;
					width: 20px;
					border-radius: 20px;
					display: flex;
					align-items: flex-end;
					.mimic-progress {
						height: var(--percent);
						width: 100%;
						border-radius: 20px;
						background: var(--color, #bcd3e5);
					}
				}
			}
		}
	}
</style>