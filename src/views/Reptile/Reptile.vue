<template>
	<div class="Reptile">
		<div class="filter" v-show="filterShow">
			<el-form ref="novelFilter" :model="filter" label-width="100px" inline>
				<el-form-item label="网址">
					<el-input v-model="filter.site"></el-input>
				</el-form-item>
				<el-form-item label="页面">
					<el-input v-model="filter.main"></el-input>
				</el-form-item>
				<el-form-item label="列表区域元素">
					<el-input v-model="filter.mainEl"></el-input>
				</el-form-item>
				<el-form-item label="小说区域">
					<el-input v-model="filter.content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleFetch">获取</el-button>
					<el-button type="primary" @click="catalogShow = !catalogShow ">目录</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="catalog" v-show="catalogShow">
			<div
				class="chapter"
				v-for="(item, index) of catalog"
				:key="item.url"
				@click="handleSelectChapter(item, index)"
			>{{item.name}}</div>
		</div>

		<div
			class="content"
			v-html="novel"
			@click="catalogShow = !catalogShow"
			@dblclick.prevent="filterShow = !filterShow"
		></div>
		<div class="operates">
			<el-button @click="handleNext">上一章</el-button>
			<el-button @click="handlePrev">下一章</el-button>
		</div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({})
	export default class Reptile extends Vue {
		filter: any = {
			site: 'https://www.soxs.cc',
			main: 'ZheTianJi',
			mainEl: '#novel83685',
			content: '.content',
		};
		filterShow: boolean = true;
		fetchUrl: string = '';
		loading: boolean = false;
		catalog: any[] = []; //目录
		novel: string = '';
		chapter: number = 1;
		catalogShow: boolean = false;

		mounted() {
			let filter = localStorage.getItem('filter');
			let chapter = localStorage.getItem('chapter');
			let catalog = localStorage.getItem('catalog');
			if (filter) {
				this.filter = JSON.parse(filter);
			}

			if (catalog) {
				this.catalog = JSON.parse(catalog);
				if (chapter) {
					this.chapter = +chapter;
					this.jumpTo();
				}
			}



			document.documentElement.requestFullscreen();
		}

		destroyed() {
			localStorage.setItem('chapter', this.chapter.toString());
			localStorage.setItem('chapter', JSON.stringify(this.filter));
			localStorage.setItem('catalog', JSON.stringify(this.catalog));

			document.exitFullscreen();
		}

		async handleFetch() {
			try {
				this.loading = true;
				const { site, main } = this.filter;
				const catalog = await this.$http.request('getCatalog', this.filter);
				this.fetchUrl = `${site}/${main}`;
				this.catalog = catalog;
				this.jumpTo();
			} finally {
				this.loading = false;
			}
		}

		handleSelectChapter(item: any, index: number) {
			this.chapter = index;
			this.jumpTo();
		}

		handleNext() {
			this.chapter += 1;
			this.jumpTo();
		}

		handlePrev() {
			this.chapter += 1;
			this.jumpTo();
		}

		jumpTo(chapter: number = this.chapter) {
			this.fetchNovel(this.catalog[chapter].href);
		}

		async fetchNovel(href: string) {
			try {
				const url = `${this.filter.site}${href}`
				this.loading = true;
				let novel = await this.$http.request('getNovel', { url, content: this.filter.content });
				novel = novel.replace(/<p>.*<\/p>/g, '');
				novel = novel.replace(/##.*/g, '');
				this.novel = novel;
				window.scrollTo(0, 0);
			} finally {
				this.loading = false;
			}
		}

		handleCancel() {

		}
	}
</script>

<style lang="scss">
	.Reptile {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		background: white;
		z-index: 1000;
		.filter {
			position: absolute;
			top: 0;
			left: 0;
			padding: 20px 50px;
		}
		.content {
			padding: 20px;
			width: 100%;
			min-height: 100%;
		}
		.catalog {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			width: 250px;
			overflow-y: scroll;
			background: seashell;
			z-index: 1000;
			.chapter {
				width: 100%;
				padding: 5px 10px;
			}
		}

		.operates {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px 0;
		}
	}
</style>