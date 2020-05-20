/**
 * 实现两点间画箭头的功能
 * @author mapleque@163.com
 * @version 1.0
 * @date 2013.05.23
 */
mapleque = {};

/**
 * 组件对外接口
 */
var proc = {

};

var init = function(a, sp, ep, st) {
    a.sp = sp; //起点
    a.ep = ep; //终点
    a.st = st; //强度
};
var paint = function(a, context) {
    var sp = a.sp;
    var ep = a.ep;
    if (context == undefined)
        return;
    //画箭头主线
    context.beginPath();
    context.moveTo(sp.x, sp.y);
    context.lineTo(ep.x, ep.y);
    //画箭头头部
    var h = _calcH(a, sp, ep, context);
    context.moveTo(ep.x, ep.y);
    context.lineTo(h.h1.x, h.h1.y);
    context.moveTo(ep.x, ep.y);
    context.lineTo(h.h2.x, h.h2.y);
    context.stroke();
};
//计算头部坐标
var _calcH = function(a, sp, ep, context) {
    var theta = Math.atan((ep.x - sp.x) / (ep.y - sp.y));
    var cep = _scrollXOY(ep, -theta);
    var csp = _scrollXOY(sp, -theta);
    var ch1 = { x: 0, y: 0 };
    var ch2 = { x: 0, y: 0 };
    var l = cep.y - csp.y;
    ch1.x = cep.x + l * (a.sharp || 0.025);
    ch1.y = cep.y - l * (a.size || 0.05);
    ch2.x = cep.x - l * (a.sharp || 0.025);
    ch2.y = cep.y - l * (a.size || 0.05);
    var h1 = _scrollXOY(ch1, theta);
    var h2 = _scrollXOY(ch2, theta);
    return {
        h1: h1,
        h2: h2
    };
};
//旋转坐标
var _scrollXOY = function(p, theta) {
    return {
        x: p.x * Math.cos(theta) + p.y * Math.sin(theta),
        y: p.y * Math.cos(theta) - p.x * Math.sin(theta)
    };
};

class arrow {
    /**
     * 设置箭头起止点
     * @param sp起点
     * @param ep终点
     * @param st强度
     */
    constructor(a, sp, ep, st) {
        a.sp = sp; //起点
        a.ep = ep; //终点
        a.st = st; //强度
    }

    /**
     * 接收canvas对象，并在此上画箭头（箭头起止点已经设置）
     * @param context
     */
    paint(context) { paint(this, context); }

        set(sp, ep, st) { init(this, sp, ep, st); }
        /**
         * 设置箭头外观
         * @param args
         */
        setPara(args) {
            this.size = args.arrow_size; //箭头大小
            this.sharp = args.arrow_sharp; //箭头锐钝
        }


}

export default arrow;