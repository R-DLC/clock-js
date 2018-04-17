export default function drawArc(c, s, e, ctx) {
  let π2 = 2 * Math.PI;
  ctx.beginPath();
  ctx.strokeStyle = c;
  ctx.arc(250, 250, 200, s * π2 - 1.57, e * π2 - 1.57);
  ctx.stroke();
};