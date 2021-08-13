<template>
	<div class="Calculate">
		<calc class="calc" :defaultValue="amount"></calc>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Calc from '@/components/Calc/index.vue'

@Component({
	components: {
		Calc
	}
})
export default class Calculate extends Vue {
	amount: string = '';
}
</script>
