<template>
	<div class="b-botton">
		<div class="row">
			<el-button type="primary">primary</el-button>
			<el-button type="success">success</el-button>
			<el-button type="warning">warning</el-button>
			<el-button type="info">info</el-button>
			<el-button type="danger">danger</el-button>
			<el-button type="text">text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" size="medium">medium primary</el-button>
			<el-button type="success" size="medium">medium success</el-button>
			<el-button type="warning" size="medium">medium warning</el-button>
			<el-button type="info" size="medium">medium info</el-button>
			<el-button type="danger" size="medium">medium danger</el-button>
			<el-button type="text" size="medium">medium text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" size="small">small primary</el-button>
			<el-button type="success" size="small">small success</el-button>
			<el-button type="warning" size="small">small warning</el-button>
			<el-button type="info" size="small">small info</el-button>
			<el-button type="danger" size="small">small danger</el-button>
			<el-button type="text" size="small">small text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" size="mini">mini primary</el-button>
			<el-button type="success" size="mini">mini success</el-button>
			<el-button type="warning" size="mini">mini warning</el-button>
			<el-button type="info" size="mini">mini info</el-button>
			<el-button type="danger" size="mini">mini danger</el-button>
			<el-button type="text" size="mini">mini text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" :plain="true">plain primary</el-button>
			<el-button type="success" :plain="true">plain success</el-button>
			<el-button type="warning" :plain="true">plain warning</el-button>
			<el-button type="info" :plain="true">plain info</el-button>
			<el-button type="danger" :plain="true">plain danger</el-button>
			<el-button type="text" :plain="true">plain text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" :round="true">round primary</el-button>
			<el-button type="success" :round="true">round success</el-button>
			<el-button type="warning" :round="true">round warning</el-button>
			<el-button type="info" :round="true">round info</el-button>
			<el-button type="danger" :round="true">round danger</el-button>
			<el-button type="text" :round="true">round text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" icon="el-icon-edit" :round="true">icon primary</el-button>
			<el-button type="success" icon="el-icon-share" :round="true">icon success</el-button>
			<el-button type="warning" icon="el-icon-delete" :round="true">icon warning</el-button>
			<el-button type="info" icon="el-icon-search" :round="true">icon info</el-button>
			<el-button type="danger" icon="el-icon-download" :round="true">icon danger</el-button>
			<el-button type="text" icon="el-icon-share" :round="true">icon text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" icon="el-icon-edit" :circle="true"></el-button>
			<el-button type="success" icon="el-icon-share" :circle="true"></el-button>
			<el-button type="warning" icon="el-icon-delete" :circle="true"></el-button>
			<el-button type="info" icon="el-icon-search" :circle="true"></el-button>
			<el-button type="danger" icon="el-icon-download" :circle="true"></el-button>
			<el-button type="text" icon="el-icon-share" :circle="true"></el-button>
		</div>

		<div class="row">
			<el-button type="primary" :loding="true">loding primary</el-button>
			<el-button type="success" :loding="true">loding success</el-button>
			<el-button type="warning" :loding="true">loding warning</el-button>
			<el-button type="info" :loding="true">loding info</el-button>
			<el-button type="danger" :loding="true">loding danger</el-button>
			<el-button type="text" :loding="true">loding text</el-button>
		</div>

		<div class="row">
			<el-button type="primary" :disabled="true">disabled primary</el-button>
			<el-button type="success" :disabled="true">disabled success</el-button>
			<el-button type="warning" :disabled="true">disabled warning</el-button>
			<el-button type="info" :disabled="true">disabled info</el-button>
			<el-button type="danger" :disabled="true">disabled danger</el-button>
			<el-button type="text" :disabled="true">disabled text</el-button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class BBotton extends Vue {

	}
</script>

<style lang="scss" scoped>
	.b-botton {
		.row {
			display: flex;
			margin-bottom: 20px;
		}
	}
</style>