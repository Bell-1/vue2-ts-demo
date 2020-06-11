
let el: any = null;
let width: number = 0;
let height: number = 0;
let ctx: any = null;
let type: string = 'text';
let steps: any[] = [];
let active: any = null;
let keys: number[] = [];
let delStep: any[] = [];
let mouseType = 'crosshair';
let changeMouseType: any;
let activeMoveStep: any = {
	start: null,
	end: null,
	step: null,
};
let isMove: boolean = false;
let size: string = 'default';
let color: string = '#000000';
let sizes: any = {
	mini: 2,
	small: 4,
	default: 6,
	large: 8,
};

const createMethods: any = {
	pencil: createPencil,
	arrow: createArrow,
	circle: createCircle,
	rect: createRect,
	line: createLine,
}
const changeMethods: any = {
	pencil: changePencil,
	arrow: changeArrow,
	circle: changeCircle,
	rect: changeRect,
	line: changeLine,
}
const moveMethods: any = {
	pencil: movePencil,
	arrow: moveArrow,
	circle: moveCircle,
	rect: moveRect,
	line: moveLine,
}
const drawMethods: any = {
	pencil: drawPencil,
	arrow: drawArrow,
	circle: drawCircle,
	rect: drawRect,
	line: drawLine,
}

function getOptions() {
	let options: any = {
		lineWidth: sizes[size],
		fillStyle: '#FFF',
		strokeStyle: color,
		lineCap: 'round',
	}

	return options;
}

/**
 * 更新参数
 * @param obj 
 */
export function updateOptions(obj: any) {
	if (obj.size !== undefined) size = obj.size;
	if (obj.color !== undefined) color = obj.color;
}

export function init(id: string) {
	el = document.getElementById(id);
	if (el.getContext) {
		ctx = el.getContext("2d");
	} else {
		throw new Error(`元素id:${id}该元素不是canvas`)
		return
	}

	el.addEventListener('mousedown', mouseDown);
	el.addEventListener('mousemove', mousemove);
	el.addEventListener('mouseup', mouseup);
	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUP);
	window.addEventListener('resize', resize);
	steps = [];
	resize();
}

function resize() {
	width = el.offsetWidth;
	height = el.offsetHeight;
	el.width = width;
	el.height = height;
	draw();
}

export function destory() {
	if (el) {
		el.removeEventListener('mousedown', mouseDown);
		el.removeEventListener('mousemove', mousemove);
		el.removeEventListener('mouseup', mouseup);
	}
	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUP);
	window.removeEventListener('resize', resize);
}

/**
 * 切换鼠标状态 （是否在某个路径上面）
 * @param cb 
 */
export function mouseTypeCb(cb: any) {
	changeMouseType = cb;
}

/**
 * 改变画笔类型
 * @param t 
 */
export function changeType(t: string) {
	switch (t) {
		case 'repeal':
			repeal();
			break;
		case 'recover':
			recover();
			break;
		default:
			type = t;
			break;
	}
}

function keyDown(e: any) {
	if (e.keyCode === 17) {
		keys = [];
	}
	if (e.keyCode !== keys[keys.length - 1]) {
		keys.push(e.keyCode);
	}
	if (keys.join('') === '1790') {
		repeal();
	}
}

/**
 * 监听keyup
 * @param e 
 */
function keyUP(e: any) {
	keys.pop();
}

/**
 * 撤销
 */
function repeal() {
	let step = steps.pop(); //撤销
	if (step) {
		delStep.push(step); //存入撤销列表
		draw();
	}
}

/**
 * 重做
 */
function recover() {
	let step = delStep.pop(); //取出一个
	if (step) {
		steps.push(step); //存入列表
		draw();
	}
}



function mouseDown(e: any) {
	if (type === 'text') return;
	if (mouseType === 'move') {
		isMove = true;
		return
	}
	delStep = [];

	createMethods[type] && createMethods[type](e);
}

function mousemove(e: any) {
	if (active) {
		changeMethods[active.type](e);
	} else if (isMove && activeMoveStep.step) {
		moveMethods[activeMoveStep.step.type](e);
	} else {
		searchHover(e)
	}
}

function mouseup() {
	active = null;
	isMove = false;
	activeMoveStep.step = null;
	activeMoveStep.start = null;
}


function searchHover(e: any) {
	const { offsetX, offsetY } = e;

	function setActiveMove(step: any) {
		if (mouseType !== 'move') {
			mouseType = 'move';
			changeMouseType(mouseType);
			activeMoveStep.step = step;
			activeMoveStep.start = [offsetX, offsetY];
		}
		if (mouseType === 'move') {
			activeMoveStep.step = step;
			activeMoveStep.start = [offsetX, offsetY];
		}
	}

	let isHover = false;
	for (let step of [...steps].reverse()) {
		const [top, bottom, left, right] = step.area;
		// if (step.type === 'pencil' && (isHover = step.path.some((item: any) => offsetX === item[0] && offsetY === item[1]))) {
		// 	console.log(isHover);
		// 	setActiveMove(step);
		// } else 
		if (isHover = offsetX >= left && offsetX <= right && offsetY >= top && offsetY <= bottom) {
			setActiveMove(step);
			break;
		}
	}

	if (!isHover) {
		let t = type === 'text' ? 'text' : 'crosshair';
		if (mouseType !== t) {
			mouseType = t;
			activeMoveStep.step = null;
			activeMoveStep.start = null;
			changeMouseType(t);
			console.log(t)
		}
	}
}


function draw() {
	ctx.clearRect(0, 0, width, height);
	for (let step of steps) {
		for (let [k, v] of Object.entries(step.options)) {
			ctx[k] = v;
		}
		drawMethods[step.type] && drawMethods[step.type](step);
		ctx.save();
		ctx.stroke();
	}
}

function createPencil(e: any) {
	const { offsetX, offsetY } = e;
	let arrow = {
		options: getOptions(),
		type: 'pencil',
		start: [offsetX, offsetY],
		path: [[offsetX, offsetY]],
		area: [offsetX, offsetY, offsetX, offsetY],
	}
	active = arrow;
	steps.push(active);
}


function changePencil(e: any) {
	const { offsetX, offsetY } = e;
	if (active.type !== 'pencil') return;
	active.path.push([offsetX, offsetY]);
	let [top, bottom, left, right] = active.area;
	active.area[0] = Math.min(top, offsetY);
	active.area[1] = Math.max(bottom, offsetY);
	active.area[2] = Math.min(left, offsetX);
	active.area[3] = Math.max(right, offsetX);
	draw();
}

function movePencil(e: any) {
	const { step } = activeMoveStep;
	if (!step || step.type !== 'pencil') return;
	const [x, y] = activeMoveStep.start;
	const diffX = e.offsetX - x;
	const diffY = e.offsetY - y;
	activeMoveStep.start = [x + diffX, y + diffY];
	let [top, bottom, left, right] = [-1, -1, -1, -1];

	for (let path of step.path) {
		const [x, y] = path;
		path[0] = x + diffX;
		path[1] = y + diffY;
		step.area[0] = top = top === - 1 ? path[1] : Math.min(top, y);
		step.area[1] = bottom = bottom === - 1 ? path[1] : Math.max(bottom, y);
		step.area[2] = left = left === - 1 ? path[0] : Math.min(left, x);
		step.area[3] = right = right === - 1 ? path[0] : Math.max(right, x);
	}
	draw();

}

function drawPencil(step: any) {
	if (step.type !== 'pencil') return;
	ctx.beginPath();
	let path = [...step.path];
	ctx.moveTo(...path.shift());
	for (let v of path) {
		ctx.lineTo(...v)
	}
}

function createArrow(e: any) {
	const { offsetX, offsetY } = e;
	let arrow = {
		options: getOptions(),
		type: 'arrow',
		start: [offsetX, offsetY],
		end: [offsetX, offsetY],
		p1: [offsetX, offsetY],
		p2: [offsetX, offsetY],
		area: [offsetX, offsetY, offsetX, offsetY],
	}
	active = arrow;
	steps.push(active);
}

function changeArrow(e: any) {
	const { offsetX, offsetY } = e;
	if (active.type !== 'arrow') return;
	active.end = [offsetX, offsetY];
	const { p1, p2 } = clacArrow(active);
	const { start, end } = active;
	active.p1 = p1;
	active.p2 = p2;
	let left: number = Math.min(start[0], end[0], p1[0], p2[0]);
	let right: number = Math.max(start[0], end[0], p1[0], p2[0]);
	let top: number = Math.min(start[1], end[1], p1[1], p2[1]);
	let bottom: number = Math.max(start[1], end[1], p1[1], p2[1]);
	active.area = [top, bottom, left, right];
	draw();
}

function moveArrow(e: any) {
	const { step } = activeMoveStep;
	if (!step || step.type !== 'arrow') return;
	const [x, y] = activeMoveStep.start;
	const diffX = e.offsetX - x;
	const diffY = e.offsetY - y;
	let { start, end } = step;

	activeMoveStep.start = [x + diffX, y + diffY];
	start = [start[0] + diffX, start[1] + diffY];
	end = [end[0] + diffX, end[1] + diffY];
	step.start = start;
	step.end = end;

	const { p1, p2 } = clacArrow(step);
	step.p1 = p1;
	step.p2 = p2;
	let left: number = Math.min(start[0], end[0], p1[0], p2[0]);
	let right: number = Math.max(start[0], end[0], p1[0], p2[0]);
	let top: number = Math.min(start[1], end[1], p1[1], p2[1]);
	let bottom: number = Math.max(start[1], end[1], p1[1], p2[1]);
	step.area = [top, bottom, left, right];
	draw();
}

//计算头部坐标
function clacArrow(active: any) {
	let { start, end } = active;
	var theta = Math.atan((end[0] - start[0]) / (end[1] - start[1]));
	var cep = _scrollXOY(end, -theta);
	var csp = _scrollXOY(start, -theta);
	var ch1 = [0, 0];
	var ch2 = [0, 0];
	var l = cep[1] - csp[1];
	ch1[0] = cep[0] + l * (0.2);
	ch1[1] = cep[1] - l * (0.3);
	ch2[0] = cep[0] - l * (0.2);
	ch2[1] = cep[1] - l * (0.3);
	var p1 = _scrollXOY(ch1, theta);
	var p2 = _scrollXOY(ch2, theta);
	return {
		p1,
		p2
	}
};

//旋转坐标
var _scrollXOY = function ([x, y]: any, theta = 45) {
	return [
		x * Math.cos(theta) + y * Math.sin(theta),
		y * Math.cos(theta) - x * Math.sin(theta)
	];
};

function drawArrow(step: any) {
	ctx.beginPath();
	ctx.moveTo(step.start[0], step.start[1])
	ctx.lineTo(step.end[0], step.end[1])

	ctx.moveTo(step.end[0], step.end[1])
	ctx.lineTo(step.p1[0], step.p1[1])

	ctx.moveTo(step.end[0], step.end[1])
	ctx.lineTo(step.p2[0], step.p2[1])

}


function createCircle(e: any) {
	const { offsetX, offsetY } = e;
	let arrow = {
		options: getOptions(),
		type: 'circle',
		start: [offsetX, offsetY],
		end: [offsetX, offsetY],
		area: [offsetX, offsetY, offsetX, offsetY],
		point: [offsetX, offsetY],
		lineSize: [0, 0],
	}
	active = arrow;
	steps.push(active);
}

function changeCircle(e: any) {
	if (active.type !== 'circle') return;
	const { offsetX, offsetY } = e;
	active.end = [offsetX, offsetY];
	const { start, end } = active;
	const [sx, sy] = start;
	const [ex, ey] = end;
	let pointX = sx > ex ? sx - Math.abs(sx - ex) / 2 : Math.abs(sx - ex) / 2 + sx;
	let pointY = sy > ey ? sy - Math.abs(sy - ey) / 2 : Math.abs(sy - ey) / 2 + sy;;
	var lineX = Math.abs(sx - ex) / 2;
	var lineY = Math.abs(sy - ey) / 2;

	let left: number = pointX - lineX;
	let right: number = pointX + lineX;
	let top: number = pointY - lineY;
	let bottom: number = pointY + lineY;
	active.area = [top, bottom, left, right];
	active.point = [pointX, pointY];
	active.lineSize = [lineX, lineY];
	draw();
}

function moveCircle(e: any) {

	const { step } = activeMoveStep;
	if (!step || step.type !== 'circle') return;
	const [x, y] = activeMoveStep.start;
	const diffX = e.offsetX - x;
	const diffY = e.offsetY - y;
	let { start, end } = step;

	activeMoveStep.start = [x + diffX, y + diffY];
	start = [start[0] + diffX, start[1] + diffY];
	end = [end[0] + diffX, end[1] + diffY];
	step.start = start;
	step.end = end;

	const [sx, sy] = start;
	const [ex, ey] = end;
	let pointX = sx > ex ? sx - Math.abs(sx - ex) / 2 : Math.abs(sx - ex) / 2 + sx;
	let pointY = sy > ey ? sy - Math.abs(sy - ey) / 2 : Math.abs(sy - ey) / 2 + sy;;
	var lineX = Math.abs(sx - ex) / 2;
	var lineY = Math.abs(sy - ey) / 2;

	let left: number = pointX - lineX;
	let right: number = pointX + lineX;
	let top: number = pointY - lineY;
	let bottom: number = pointY + lineY;
	step.area = [top, bottom, left, right];
	step.point = [pointX, pointY];
	step.lineSize = [lineX, lineY];
	draw();

}

function drawCircle(step: any) {
	const { point, lineSize } = step;
	ctx.beginPath();
	ctx.ellipse(...point, ...lineSize, 0, 0, 2 * Math.PI);
}

function createRect(e: any) {
	const { offsetX, offsetY } = e;
	let arrow = {
		options: getOptions(),
		type: 'rect',
		start: [offsetX, offsetY],
		end: [offsetX, offsetY],
		area: [offsetX, offsetY, offsetX, offsetY],
	}
	active = arrow;
	steps.push(active);
}

function changeRect(e: any) {
	if (active.type !== 'rect') return;
	const { offsetX, offsetY } = e;
	active.end = [offsetX, offsetY];
	const { start, end } = active;

	let left: number = Math.min(start[0], end[0]);
	let right: number = Math.max(start[0], end[0]);
	let top: number = Math.min(start[1], end[1]);
	let bottom: number = Math.max(start[1], end[1]);
	active.area = [top, bottom, left, right];
	draw();
}

function moveRect(e: any) {
	const { step } = activeMoveStep;
	if (!step || step.type !== 'rect') return;
	const [x, y] = activeMoveStep.start;
	const diffX = e.offsetX - x;
	const diffY = e.offsetY - y;
	let { start, end } = step;

	activeMoveStep.start = [x + diffX, y + diffY];
	start = [start[0] + diffX, start[1] + diffY];
	end = [end[0] + diffX, end[1] + diffY];
	step.start = start;
	step.end = end;

	let left: number = Math.min(start[0], end[0]);
	let right: number = Math.max(start[0], end[0]);
	let top: number = Math.min(start[1], end[1]);
	let bottom: number = Math.max(start[1], end[1]);
	step.area = [top, bottom, left, right];
	draw();
}

function drawRect(step: any) {
	const [top, bottom, left, right] = step.area;
	ctx.beginPath();
	ctx.rect(left, top, right - left, bottom - top);
}


function createLine(e: any) {
	const { offsetX, offsetY } = e;
	let arrow = {
		options: getOptions(),
		type: 'line',
		start: [offsetX, offsetY],
		end: [offsetX, offsetY],
		area: [offsetX, offsetY, offsetX, offsetY],
	}
	active = arrow;
	steps.push(active);
}

function changeLine(e: any) {
	const { offsetX, offsetY } = e;
	if (active.type !== 'line') return;
	active.end = [offsetX, offsetY];
	const { start, end } = active;
	let left: number = Math.min(start[0], end[0]);
	let right: number = Math.max(start[0], end[0]);
	let top: number = Math.min(start[1], end[1]);
	let bottom: number = Math.max(start[1], end[1]);
	active.area = [top, bottom, left, right];
	draw();
}

function moveLine(e: any) {
	const { step } = activeMoveStep;
	if (!step || step.type !== 'line') return;
	const [x, y] = activeMoveStep.start;
	const diffX = e.offsetX - x;
	const diffY = e.offsetY - y;
	let { start, end } = step;
	activeMoveStep.start = [x + diffX, y + diffY];
	start = [start[0] + diffX, start[1] + diffY];
	end = [end[0] + diffX, end[1] + diffY];
	step.start = start;
	step.end = end;
	let left: number = Math.min(start[0], end[0]);
	let right: number = Math.max(start[0], end[0]);
	let top: number = Math.min(start[1], end[1]);
	let bottom: number = Math.max(start[1], end[1]);
	step.area = [top, bottom, left, right];
	draw();
}

function drawLine(step: any) {
	ctx.beginPath();
	ctx.moveTo(step.start[0], step.start[1]);
	ctx.lineTo(step.end[0], step.end[1]);
}