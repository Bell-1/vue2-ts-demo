<template>
	<div class="Novel">
		<div class="filter" v-show="filterShow">
			<el-form ref="novelFilter" :model="filter">
				<el-form-item>
					<h3>填写信息</h3>
				</el-form-item>
				<el-form-item label="主网址">
					<el-input v-model="filter.site" placeholder="例：https://xxxx.xxx.xxx"></el-input>
				</el-form-item>
				<el-form-item label="页面路由">
					<el-input v-model="filter.main" placeholder="例：1234"></el-input>
				</el-form-item>
				<el-form-item label="目录选择器">
					<el-input v-model="filter.mainEl" placeholder="例：#list | .list"></el-input>
				</el-form-item>
				<el-form-item label="小说内容选择器">
					<el-input v-model="filter.content" placeholder="例：#content | .content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleFetch" v-loading="loading">获取目录</el-button>
					<el-button v-if="catalog.length" type="primary" @click="showNovel">继续看</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="novel-container" v-show="!filterShow">
			<div class="__header" v-show="menuShow">
				<div class="operates">
					<div class="back" @click="handleBack">
						<i class="iconfont icon-back"></i>
					</div>
				</div>
				<div class="title">{{title}}</div>
			</div>
			<div class="__catalog" v-show="catalogShow">
				<div
					class="chapter"
					v-for="(item, index) of catalog"
					:key="item.url"
					@click="handleSelectChapter(item, index)"
				>{{item.name}}</div>
			</div>

			<div ref="novelList" class="__content" @click="handleClickContent">
				<div
					class="__content-item"
					:ref="novel.id"
					v-for="(novel, index) of novels"
					:key="novel.id"
					:data-index="index"
				>
					<div class="title">{{novel.name}}</div>
					<div class="data" v-html="novel.content"></div>
				</div>
			</div>
			<div class="__footer" v-show="menuShow">
				<!-- <div class="operates">
					<span @click="handleNext">上一章</span>
					<span @click="handlePrev">下一章</span>
				</div>-->
				<div class="btns">
					<div class="menu-btn" @click="handleShowMenu">
						<i class="iconfont icon-menu"></i>
						<span>目录</span>
					</div>
					<div class="menu-btn">
						<i class="iconfont icon-light"></i>
						<span>亮度</span>
					</div>
					<div class="menu-btn">
						<i class="iconfont icon-font-size"></i>
						<span>字体</span>
					</div>
				</div>
			</div>
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
		chapter: number = 1;
		novels: any[] = [];
		novelShow: boolean = false;
		catalogShow: boolean = false;
		IO: any = null;
		title: string = '';
		menuShow: boolean = false;
		currentIndex: number = 1;

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
					this.showNovel();
					this.jumpTo();
				}
			}
			let novelContent: any = this.$refs['novelContent'];
			this.IO = new IntersectionObserver(this.intersectionCb, {
				root: novelContent,
			});

			console.warn(this.filterShow)

			// document.documentElement.requestFullscreen();
		}


		destroyed() {
			this.chapter = this.chapter - (this.novels.length - this.currentIndex - 1);
			this.chapter && localStorage.setItem('chapter', this.chapter.toString());
			localStorage.setItem('filter', JSON.stringify(this.filter));
			this.catalog.length && localStorage.setItem('catalog', JSON.stringify(this.catalog));
			// document.exitFullscreen();
		}

		intersectionCb(entries: any) {
			if (entries[0].isIntersecting) {
				const { currentIndex } = this;
				this.currentIndex = entries[0].target.dataset.index;
				if (this.currentIndex > currentIndex) {
					//每一章预加载一章
					this.handleNext();
				}
			}
		}

		addIntersection(id: number) {
			let ele: any = this.$refs[id];
			if (ele && this.IO) {
				this.IO.observe(ele[0])
			}
		}

		handleBack() {
			this.filterShow = true;
			// this.chapter = this.chapter - (this.novels.length - this.currentIndex - 1);
			// this.currentIndex = 0;
		}

		showNovel() {
			this.filterShow = false;
			this.menuShow = false;
		}

		handleClickContent() {
			this.menuShow = !this.menuShow;
			this.catalogShow = false;
		}

		handleShowMenu() {
			this.catalogShow = true;
		}

		async handleFetch() {
			try {
				this.loading = true;
				const { site, main } = this.filter;
				const catalog = await this.$http.request('getCatalog', this.filter);
				this.showNovel();
				this.fetchUrl = `${site}/${main}`;
				this.catalog = catalog;
				this.jumpTo();
			} finally {
				this.loading = false;
			}
		}

		clearNovel() {
			this.novels = [];
			this.currentIndex = 0;
		}

		handleSelectChapter(item: any, index: number) {
			this.chapter = index;
			this.clearNovel();
			this.jumpTo();
			this.catalogShow = false;
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
			if (chapter >= this.catalog.length) {
				this.$message.error('没有更多了！');
				return
			}
			this.fetchNovel(this.catalog[chapter]);
		}

		/**
		 * 增加novel
		 */
		addNovel(content: string, name: string) {
			let id = +new Date();
			this.novels.push({
				id,
				content,
				name,
			});
			if (this.novels.length < 10) {
				this.handleNext();
			}
			this.$nextTick(() => {
				this.addIntersection(id);
			})
		}

		async fetchNovel({ href = '', name }: any = {}) {
			try {
				const url = `${this.filter.site}${href}`
				this.loading = true;
				let novel = await this.$http.request('getNovel', { url, content: this.filter.content });
				novel = unescape(novel.replace(/(&#x)/g,'%u').replace(/;/g,''))
				novel = novel.replace(/%uA0/g, '&nbsp;');
				novel = novel.replace(/<p>.*<\/p>/g, '');
				novel = novel.replace(/<script.*<\/script>/g, '');
				novel = novel.replace(/您可以在百度.*(&nbsp;*)/g, '');
				this.addNovel(novel, name);
			} finally {
				this.loading = false;
			}
		}

		handleCancel() {

		}
	}
</script.*>

<style lang="scss">
	.Novel {
		.filter {
			padding: 20px 50px;
		}
		.novel-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			overflow-y: scroll;
			background: seashell;
			.__header {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				height: 50px;
				background: rgba(#666, 0.8);
				display: flex;
				align-items: center;
				justify-content: center;
				color: #eee;
				z-index: 100;
				.operates {
					height: 100%;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.back {
						padding: 0 15px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
						i {
							font-size: 30px;
						}
					}
				}
			}
			.__footer {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				height: 100px;
				color: #eee;
				background: rgba(#666, 0.8);
				font-size: 16px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				z-index: 100;
				.operates {
					padding: 10px 30px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.btns {
					padding: 0 50px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					& > div {
						width: 50px;
						height: 50px;
						padding: 15px 10px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						i {
							font-size: 30px;
						}
						span {
							font-size: 14px;
						}
					}
				}
			}

			.__content {
				padding: 0 10px;
				width: 100%;
				min-height: 100%;
				font-size: 18px;
				line-height: 30px;
				.title {
					position: sticky;
					top: 0;
					height: 20px;
					background: seashell;
					font-size: 12px;
				}
			}

			.__catalog {
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				width: 85vw;
				overflow-y: scroll;
				background: rgb(247, 234, 226);
				z-index: 1000;
				box-shadow: 0 0 50px rgba(#333, 0.6);
				.chapter {
					width: 100%;
					padding: 5px 10px;
					cursor: pointer;
				}
			}
		}
	}
</style>