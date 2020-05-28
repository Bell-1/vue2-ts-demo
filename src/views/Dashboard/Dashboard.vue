<template>
	<div class="dashboard">
		<LineChart></LineChart>
		<BarChart></BarChart>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import LineChart from './charts/Line.vue'
	import BarChart from './charts/Bar.vue'
	import Fund from './charts/Fund.vue'

	@Component({
		components: {
			Fund,
			LineChart,
			BarChart,
		}
	})
	export default class Dashboard extends Vue {

		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.dashboard {
		.lineChart {
			height: 300px;
		}
	}
</style>