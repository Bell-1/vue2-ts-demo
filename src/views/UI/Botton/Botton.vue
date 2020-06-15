 <template>
	<div class="b-botton">
		<btn-list></btn-list>
		<btn-hover></btn-hover>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'
	import Btns from './Btns.vue'
	import BtnHover from './BtnHover.vue'

	@Component({
		components: {
			BtnList: Btns,
			BtnHover,
		}
	})
	export default class BBotton extends Vue {

	}
</script>

<style lang="scss">
	.b-botton {
		
	}
</style>