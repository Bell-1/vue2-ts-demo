/**
 * 画五角星
 * @param {number} x  
 * @param {number} y  
 * @param {number} maxr 外圈半径  
 * @param {number} minr  内圈半径
 * @param {number} angle 起始角度
 */
export function fivePointStar(ctx, x = 0, y = 0, maxr = 0, minr = 0, angle = 0) {
    if (!ctx) return;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        let outX = Math.cos((18 + angle + i * 72) / 180 * Math.PI) * maxr + x;
        let outY = -Math.sin((18 + angle + i * 72) / 180 * Math.PI) * maxr + y;
        let inX = Math.cos((54 + angle + i * 72) / 180 * Math.PI) * minr + x;
        let inY = -Math.sin((54 + angle + i * 72) / 180 * Math.PI) * minr + y;
        ctx.lineTo(outX, outY);
        ctx.lineTo(inX, inY);
    }
    ctx.closePath();
}

export function ellipse(ctx, sx, sy, ex, ey) {
    let x = sx > ex ? sx - Math.abs(sx - ex) / 2 : Math.abs(sx - ex) / 2 + sx;
    let y = sy > ey ? sy - Math.abs(sy - ey) / 2 : Math.abs(sy - ey) / 2 + sy;;
    var lineX = Math.abs(sx - ex) / 2;
    var lineY = Math.abs(sy - ey) / 2;

    ctx.beginPath();
    ctx.ellipse(x, y, lineX, lineY, 0, 0, 2 * Math.PI);
    ctx.closePath();

}

export function circle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();

}