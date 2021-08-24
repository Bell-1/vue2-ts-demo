<template>
	<div class="Reptile">
		<el-button @click="handleToNovel">看小说</el-button>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({
		components: {
		}
	})
	export default class Reptile extends Vue {
		novelShow: boolean = false;

		handleToNovel() {
			this.$router.push('/novel');
		}

	}
</script>

<style lang="scss">
	.Reptile {
	}
</style>