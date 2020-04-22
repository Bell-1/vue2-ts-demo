<template>
	<div class="dashboard">
		<fund></fund>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import LineChart from './charts/Line.vue'
	import LineChart1 from './charts/Line1.vue'
	import BarChart from './charts/Bar.vue'
	import Fund from './charts/Fund.vue'

	@Component({
		components: {
			Fund,
			LineChart,
			LineChart1,
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