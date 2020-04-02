class LoadAnimation {
	constructor() {
		this.canvas = null;
		this.context = null; //获取画图环境，指明为2d
		this.center = [0, 0]; //Canvas中心点x轴坐标
		this.rad = Math.PI * 2 / 100; // 1% === 1rad
		this.options = {
			circleColor: 'white',
			progressColor: '#1890ff',
			textColor: 'white',
			circleWidth: 1,
			progressWidth: 5,
		}
	}

	create(id, options = {}) {
		this.canvas = document.getElementById(id); //获取canvas元素
		Object.assign(this.options, options);
		if (this.canvas) {
			this.context = this.canvas.getContext('2d'); //获取画图环境，指明为2d
			this.center = [this.canvas.width / 2, this.canvas.height / 2];
		}
		this.changePercent(0);
	}

	drawProgress(prevent) {
		const [centerX, centerY] = this.center;
		const {progressColor, progressWidth} = this.options;
		this.context.strokeStyle = progressColor; //设置描边样式
		this.context.lineWidth = progressWidth; //设置线宽
		this.context.beginPath(); //路径开始
		this.context.arc(centerX, centerY, 100, -Math.PI / 2, -Math.PI / 2 + prevent * this.rad, false); //用于绘制圆弧this.context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
		this.context.stroke(); //绘制
	}

	drawCircle() {
		const [centerX, centerY] = this.center;
		const {circleColor, circleWidth} = this.options;
		this.context.strokeStyle = circleColor;
		this.context.lineWidth = circleWidth; //设置线宽
		this.context.beginPath();
		this.context.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
		this.context.stroke();
	}

	text(percent = 0) {
		const [centerX, centerY] = this.center;
		this.context.restore();
		this.context.beginPath();
		this.context.fillStyle = this.options.textColor; //设置描边样式
		this.context.font = "30px Arial"; //设置字体大小和字体
		percent = percent.toFixed(0) + '%';
		let offsetLeft = (percent.length + 1) * 7;
		this.context.fillText(percent, centerX - offsetLeft, centerY + 10); //绘制字体，并且指定位置
		this.context.fill(); //执行绘制
	}

	changePercent(percent = 0) {
		const {
			width,
			height
		} = this.canvas;
		this.context.clearRect(0, 0, width, height);
		this.drawCircle();
		this.drawProgress(percent);
		this.text(percent);
	}
}

export default new LoadAnimation();