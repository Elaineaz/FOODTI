// ============================================================
// 像素风袋鼠绘制器 v2 — 美团风圆润大耳朵袋鼠
// 0=透明 1=主色 2=深色轮廓 3=浅色肚皮 4=眼睛 5=腮红
// ============================================================

// 20列 × 28行，正面站立，大圆耳朵美团风
const KG = [
  "00011100011100000000",  // 0  两只大耳朵
  "00111110111110000000",  // 1
  "01122101122110000000",  // 2  耳朵内色
  "01122101122110000000",  // 3
  "00111110111110000000",  // 4
  "00011111111100000000",  // 5  头顶
  "00111111111111000000",  // 6
  "01111111111111100000",  // 7
  "01141111111141100000",  // 8  眼睛
  "01111111111111100000",  // 9
  "01155111111551100000",  // 10 腮红
  "00111111111111000000",  // 11
  "00011111111100000000",  // 12 脖子
  "00111333333111000000",  // 13 身体开始
  "01113333333311100000",  // 14
  "01113333333311100000",  // 15
  "01113333333311100000",  // 16
  "01113333333311100000",  // 17
  "00113333333311000000",  // 18
  "00011333333110000000",  // 19
  "00001111111100000000",  // 20 腰
  "00011100011100000000",  // 21 腿
  "00011100011100000000",  // 22
  "00011100011100000000",  // 23
  "00011110011110000000",  // 24 脚掌
  "00001110001110000000",  // 25
  "00000110000110000000",  // 26 尾巴苗头
  "00000111111000000000",  // 27
];

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function darkenColor(hex, f) {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`;
}

function lightenColor(hex, f) {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.round(r+(255-r)*f)},${Math.round(g+(255-g)*f)},${Math.round(b+(255-b)*f)})`;
}

function blushColor(hex) {
  // 腮红：主色加深一点点再偏粉
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${Math.min(255,r+30)},${Math.round(g*0.7)},${Math.round(b*0.7)},0.5)`;
}

function drawKangaroo(canvas, mainColor, scale) {
  scale = scale || 5;
  mainColor = mainColor || "#FF6B6B";
  const cols = KG[0].length;
  const rows = KG.length;
  canvas.width  = cols * scale;
  canvas.height = rows * scale;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const colorMap = {
    "1": mainColor,
    "2": darkenColor(mainColor, 0.55),   // 耳朵内深色
    "3": lightenColor(mainColor, 0.52),  // 肚皮浅色
    "4": "#2d2d2d",                       // 眼睛
    "5": blushColor(mainColor),           // 腮红
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = KG[r][c];
      if (v === "0") continue;
      ctx.fillStyle = colorMap[v];
      ctx.fillRect(c * scale, r * scale, scale, scale);
    }
  }

  // 眼睛高光（白色小点）
  const eyeScale = Math.max(1, Math.floor(scale / 3));
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(3 * scale, 8 * scale, eyeScale, eyeScale);
  ctx.fillRect(12 * scale, 8 * scale, eyeScale, eyeScale);
}
