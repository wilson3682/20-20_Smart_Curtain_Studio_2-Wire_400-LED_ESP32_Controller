/**
 * WCLUMIERE GIF LIBRARY (gifs.js)
 * Place this file in the same folder as wled-matrix-studio.html.
 * All animations are tuned for 20x20 pixel LED matrices.
 */

window.WCLUMIERE_GIF_LIBRARY = [
  // --- GAMING & RETRO ---
  {
    id: "pacman",
    name: "🟡 Pac-Man",
    category: "Gaming",
    frames: 16,
    delay: 80,
    render: (ctx, f, total, w, h) => {
      const px = ((f / total) * (w + 10)) - 5;
      const py = h / 2;
      ctx.fillStyle = "#ffffff";
      for (let dx = 2; dx < w; dx += 4) {
        if (dx > px) ctx.fillRect(dx, Math.floor(py), 1, 1);
      }
      ctx.fillStyle = "#ffea00";
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (Math.hypot(x - px, y - py) < w * 0.35) {
            const angle = Math.abs(Math.atan2(y - py, x - px));
            if (angle > 0.25 + 0.25 * Math.sin(f * 1.5)) ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  },
  {
    id: "ghost",
    name: "👻 Red Ghost",
    category: "Gaming",
    frames: 8,
    delay: 110,
    render: (ctx, f, total, w, h) => {
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2);
      ctx.fillStyle = "#ff0000";
      // Body dome
      for (let y = cy - 6; y <= cy + 5; y++) {
        for (let x = cx - 6; x <= cx + 5; x++) {
          const dx = x - cx, dy = y - (cy - 1);
          if (y <= cy - 1) {
            if (dx * dx + dy * dy <= 30) ctx.fillRect(x, y, 1, 1);
          } else {
            // Skirt waves
            const skirt = (x + f) % 4 < 2;
            if (y < cy + 5 || skirt) ctx.fillRect(x, y, 1, 1);
          }
        }
      }
      // Eyes
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx - 4, cy - 3, 3, 4);
      ctx.fillRect(cx + 1, cy - 3, 3, 4);
      // Pupils moving
      const lookOffset = f % 4 < 2 ? 0 : 1;
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(cx - 3 + lookOffset, cy - 2, 2, 2);
      ctx.fillRect(cx + 2 + lookOffset, cy - 2, 2, 2);
    }
  },
  {
    id: "star",
    name: "⭐ Super Star",
    category: "Gaming",
    frames: 8,
    delay: 90,
    render: (ctx, f, total, w, h) => {
      const colors = ["#ffff00", "#ff8800", "#ffffff", "#ffcc00"];
      ctx.fillStyle = colors[f % colors.length];
      const cx = w / 2, cy = h / 2;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = Math.abs(x - cx + 0.5), dy = Math.abs(y - cy + 0.5);
          if (dx < 7 && dy < 7 && dx + dy < 9) ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = "#000000";
      ctx.fillRect(Math.floor(cx - 3), Math.floor(cy - 2), 2, 4);
      ctx.fillRect(Math.floor(cx + 1), Math.floor(cy - 2), 2, 4);
    }
  },
  {
    id: "mushroom",
    name: "🍄 Super Mushroom",
    category: "Gaming",
    frames: 8,
    delay: 120,
    render: (ctx, f, total, w, h) => {
      const bob = Math.round(Math.sin(f / total * Math.PI * 2) * 1.5);
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2) + bob;
      // Red Cap
      ctx.fillStyle = "#ff1100";
      for (let y = cy - 6; y <= cy + 1; y++) {
        for (let x = cx - 7; x <= cx + 6; x++) {
          if (Math.hypot(x - cx + 0.5, y - cy + 1) <= 6.5) ctx.fillRect(x, y, 1, 1);
        }
      }
      // White Spots
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx - 2, cy - 5, 4, 3);
      ctx.fillRect(cx - 6, cy - 3, 2, 3);
      ctx.fillRect(cx + 4, cy - 3, 2, 3);
      // Stem
      ctx.fillStyle = "#ffe4b5";
      ctx.fillRect(cx - 4, cy + 2, 8, 4);
      ctx.fillStyle = "#000000";
      ctx.fillRect(cx - 3, cy + 3, 1, 2);
      ctx.fillRect(cx + 2, cy + 3, 1, 2);
    }
  },
  {
    id: "coin",
    name: "🪙 Spinning Coin",
    category: "Gaming",
    frames: 10,
    delay: 85,
    render: (ctx, f, total, w, h) => {
      const cx = w / 2, cy = h / 2;
      const xRadius = Math.abs(Math.cos(f / total * Math.PI * 2)) * 6.5;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = (x - cx + 0.5) / Math.max(1, xRadius);
          const dy = (y - cy + 0.5) / 7;
          if (dx * dx + dy * dy <= 1.0) {
            ctx.fillStyle = (dx > -0.2 && dx < 0.3) ? "#ffffff" : "#ffbb00";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  },
  {
    id: "invader",
    name: "👾 Space Invader",
    category: "Gaming",
    frames: 8,
    delay: 130,
    render: (ctx, f, total, w, h) => {
      const pose = f % 2 === 0;
      ctx.fillStyle = pose ? "#00ffcc" : "#33ff77";
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2);
      const sprite = [
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,1,1,0,1,1,0,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,1,0,1],
        pose ? [1,0,1,0,0,0,0,1,0,1] : [0,0,0,1,1,1,1,0,0,0],
        pose ? [0,0,0,1,1,1,1,0,0,0] : [0,1,1,0,0,0,0,1,1,0]
      ];
      for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
          if (sprite[r][c]) ctx.fillRect(cx - 5 + c, cy - 4 + r, 1, 1);
        }
      }
    }
  },
  {
    id: "triforce",
    name: "⚔️ Golden Triforce",
    category: "Gaming",
    frames: 10,
    delay: 95,
    render: (ctx, f, total, w, h) => {
      const glow = Math.sin(f / total * Math.PI * 2);
      ctx.fillStyle = glow > 0 ? "#ffd700" : "#ffaa00";
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2);
      for (let y = -6; y <= 6; y++) {
        for (let x = -8; x <= 8; x++) {
          const inBig = y >= -6 && y <= 6 && Math.abs(x) <= (y + 6);
          const inHole = y >= 0 && Math.abs(x) < (6 - y);
          if (inBig && !inHole) ctx.fillRect(cx + x, cy + y, 1, 1);
        }
      }
    }
  },

  // --- NATURE & ELEMENTS ---
  {
    id: "fire",
    name: "🔥 Fire Flame",
    category: "Elements",
    frames: 12,
    delay: 75,
    render: (ctx, f, total, w, h) => {
      for (let x = 0; x < w; x++) {
        const flameH = Math.floor(h * (0.35 + 0.6 * Math.abs(Math.sin(x * 1.3 + f * 1.5))));
        for (let y = h - 1; y >= h - flameH; y--) {
          const ratio = (h - y) / flameH;
          ctx.fillStyle = ratio < 0.4 ? "#ffff00" : (ratio < 0.75 ? "#ff6600" : "#ff0000");
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  },
  {
    id: "rain",
    name: "🌧️ Rainstorm",
    category: "Elements",
    frames: 10,
    delay: 85,
    render: (ctx, f, total, w, h) => {
      // Dark Cloud
      ctx.fillStyle = "#555566";
      for (let x = 3; x < w - 3; x++) {
        for (let y = 2; y < 8; y++) {
          if (Math.hypot(x - 9, y - 5) < 4.5 || Math.hypot(x - 13, y - 5) < 3.5) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
      // Rain drops
      ctx.fillStyle = "#00ccff";
      for (let col = 3; col < w - 3; col += 3) {
        const dropY = 8 + ((f * 3 + col * 4) % (h - 8));
        ctx.fillRect(col, dropY, 1, 2);
      }
    }
  },
  {
    id: "lightning",
    name: "⚡ Lightning Bolt",
    category: "Elements",
    frames: 8,
    delay: 90,
    render: (ctx, f, total, w, h) => {
      if (f % 4 === 0) {
        ctx.fillStyle = "#220044";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.fillStyle = (f % 2 === 0) ? "#ffffff" : "#ffee00";
      const path = [[11,1],[10,3],[9,5],[8,7],[7,9],[12,9],[10,11],[9,13],[8,15],[7,17],[6,19]];
      path.forEach(([x, y]) => {
        ctx.fillRect(x, y, 2, 1);
      });
    }
  },
  {
    id: "wave",
    name: "🌊 Ocean Waves",
    category: "Elements",
    frames: 12,
    delay: 90,
    render: (ctx, f, total, w, h) => {
      for (let x = 0; x < w; x++) {
        const waveY = Math.floor(h * 0.55 + Math.sin((x * 0.4) + (f / total * Math.PI * 2)) * 3.5);
        for (let y = waveY; y < h; y++) {
          ctx.fillStyle = (y === waveY) ? "#ffffff" : (y < waveY + 3 ? "#00aaff" : "#0033aa");
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  },
  {
    id: "flower",
    name: "🌸 Blooming Flower",
    category: "Elements",
    frames: 10,
    delay: 110,
    render: (ctx, f, total, w, h) => {
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2) - 1;
      // Stem
      ctx.fillStyle = "#00aa22";
      for (let y = cy + 2; y < h - 1; y++) ctx.fillRect(cx, y, 2, 1);
      // Leaves
      ctx.fillRect(cx - 3, h - 5, 3, 1);
      ctx.fillRect(cx + 2, h - 7, 3, 1);
      // Petals expanding
      const radius = 2.5 + 2.5 * Math.sin(f / total * Math.PI);
      ctx.fillStyle = "#ff0077";
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        const px = Math.round(cx + Math.cos(a) * radius);
        const py = Math.round(cy + Math.sin(a) * radius);
        ctx.fillRect(px, py, 2, 2);
      }
      // Center
      ctx.fillStyle = "#ffff00";
      ctx.fillRect(cx, cy, 2, 2);
    }
  },

  // --- EMOTICONS & SYMBOLS ---
  {
    id: "heart",
    name: "❤️ Beating Heart",
    category: "Symbols",
    frames: 12,
    delay: 85,
    render: (ctx, f, total, w, h) => {
      const scale = 0.35 + 0.12 * Math.sin(f / total * Math.PI * 2);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const nx = (x - (w - 1) / 2) / (w * scale);
          const ny = - (y - (h - 1) / 2 - 1) / (h * scale);
          if (Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * Math.pow(ny, 3) <= 0) {
            ctx.fillStyle = (f % 2 === 0) ? "#ff0044" : "#ff3366";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  },
  {
    id: "skull",
    name: "💀 Glowing Skull",
    category: "Symbols",
    frames: 8,
    delay: 110,
    render: (ctx, f, total, w, h) => {
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2) - 1;
      // White cranium
      ctx.fillStyle = "#e0e0e0";
      for (let y = cy - 6; y <= cy + 2; y++) {
        for (let x = cx - 6; x <= cx + 5; x++) {
          if (Math.hypot(x - cx + 0.5, y - cy + 2) <= 5.8) ctx.fillRect(x, y, 1, 1);
        }
      }
      // Jaw
      ctx.fillRect(cx - 3, cy + 3, 6, 3);
      // Eye sockets (glowing green/red)
      ctx.fillStyle = (f % 2 === 0) ? "#00ff44" : "#ff0033";
      ctx.fillRect(cx - 4, cy - 2, 2, 3);
      ctx.fillRect(cx + 2, cy - 2, 2, 3);
      // Nose
      ctx.fillStyle = "#000000";
      ctx.fillRect(cx - 1, cy + 1, 2, 1);
    }
  },
  {
    id: "hourglass",
    name: "⏳ Sand Hourglass",
    category: "Symbols",
    frames: 12,
    delay: 90,
    render: (ctx, f, total, w, h) => {
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2);
      ctx.fillStyle = "#888899";
      // Outline frame
      for (let y = -7; y <= 7; y++) {
        const spread = Math.round(Math.abs(y) * 0.8) + 1;
        ctx.fillRect(cx - spread, cy + y, 1, 1);
        ctx.fillRect(cx + spread, cy + y, 1, 1);
      }
      ctx.fillRect(cx - 7, cy - 8, 15, 1);
      ctx.fillRect(cx - 7, cy + 8, 15, 1);
      // Sand falling
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(cx, cy, 1, 1); // stream
      ctx.fillRect(cx, cy + 1, 1, 1);
      // Falling sand pile
      const fillH = Math.floor((f / total) * 4);
      for (let y = 7; y >= 7 - fillH; y--) {
        ctx.fillRect(cx - (7 - y), cy + y, (7 - y) * 2 + 1, 1);
      }
    }
  },

  // --- TECH & MUSIC ---
  {
    id: "rainbow",
    name: "🌈 Rainbow Wave",
    category: "Tech",
    frames: 14,
    delay: 75,
    render: (ctx, f, total, w, h) => {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const hue = (x * 18 + y * 18 + (f * 360 / total)) % 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  },
  {
    id: "pulse",
    name: "⚡ Cyber Pulse",
    category: "Tech",
    frames: 12,
    delay: 80,
    render: (ctx, f, total, w, h) => {
      const barCount = 6;
      const barW = Math.floor(w / barCount);
      for (let b = 0; b < barCount; b++) {
        const hVal = Math.floor(h * (0.3 + 0.65 * Math.abs(Math.sin(b * 1.8 + f * 0.9))));
        for (let y = h - 1; y >= h - hVal; y--) {
          ctx.fillStyle = `hsl(${b * 55}, 100%, 55%)`;
          ctx.fillRect(b * barW + 1, y, barW - 1, 1);
        }
      }
    }
  },
  {
    id: "vortex",
    name: "🌀 Hypno Vortex",
    category: "Tech",
    frames: 14,
    delay: 70,
    render: (ctx, f, total, w, h) => {
      const cx = w / 2, cy = h / 2;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dist = Math.hypot(x - cx, y - cy);
          const angle = Math.atan2(y - cy, x - cx);
          const spiral = (angle + dist * 0.7 + (f / total * Math.PI * 2)) % (Math.PI * 2);
          if (spiral < Math.PI) {
            ctx.fillStyle = `hsl(${dist * 25 + f * 20}, 100%, 50%)`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  },
  {
    id: "rocket",
    name: "🚀 Rocket Ship",
    category: "Tech",
    frames: 8,
    delay: 85,
    render: (ctx, f, total, w, h) => {
      const shake = (f % 2 === 0) ? 0 : 1;
      const cx = Math.floor(w / 2) + shake, cy = Math.floor(h / 2) - 1;
      // Rocket Body
      ctx.fillStyle = "#e6e6e6";
      ctx.fillRect(cx - 2, cy - 4, 4, 8);
      // Nose cone
      ctx.fillStyle = "#ff2200";
      ctx.fillRect(cx - 1, cy - 6, 2, 2);
      ctx.fillRect(cx, cy - 7, 1, 1);
      // Fins
      ctx.fillRect(cx - 4, cy + 1, 2, 3);
      ctx.fillRect(cx + 2, cy + 1, 2, 3);
      // Window
      ctx.fillStyle = "#00ccff";
      ctx.fillRect(cx - 1, cy - 2, 2, 2);
      // Flame trail
      const flameH = (f % 2 === 0) ? 5 : 7;
      ctx.fillStyle = (f % 2 === 0) ? "#ffff00" : "#ff6600";
      ctx.fillRect(cx - 1, cy + 4, 2, flameH);
    }
  },

  // --- EMBEDDED SAMPLE ---
  {
    id: "sample_gif",
    name: "🎞️ Pipplee Classic",
    category: "Retro",
    b64: "R0lGODlhDwAPALMPAMrKygwMDJOTkz09PZWVla+vr3p6euTk5M7OzuXl5TMzMwAAAJmZmWZmZszMzP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAPACwAAAAADwAPAAAEQvDJaZaZOIcV8iQK8VRX4iTYoAwZ4iCYoAjZ4RxejhVNoT+mRGP4cyF4Pp0N98sBGIBMEMOotl6YZ3S61Bmbkm4mAgAh+QQFCgAPACwAAAAADQANAAAENPDJSRSZeA418itN8QiK8BiLITVsFiyBBIoYqnoewAD4xPw9iY4XLGYSjkQR4UAUD45DLwIAIfkEBQoADwAsAAAAAA8ACQAABC/wyVlamTi3nSdgwFNdhEJgTJoNyoB9ISYoQmdjiZPcj7EYCAeCF1gEDo4Dz2eIAAAh+QQFCgAPACwCAAAADQANAAAEM/DJBxiYeLKdX3IJZT1FU0iIg2RNKx3OkZVnZ98ToRD4MyiDnkAh6BkNC0MvsAj0kMpHBAAh+QQFCgAPACwGAAAACQAPAAAEMDC59KpFDll73HkAA2wVY5KgiK5b0RRoI6MuzG6EQqCDMlSGheEhUAgqgUUAFRySIgAh+QQFCgAPACwCAAIADQANAAAEM/DJKZNLND/kkKaHc3xk+QAMYDKsiaqmZCxGVjSFFCxB1vwy2oOgIDxuucxAMTAJFAJNBAAh+QQFCgAPACwAAAYADwAJAAAEMNAs86q1yaWwwv2Ig0jUZx3OYa4XoRAfwADXoAwfo1+CIjyFRuEho60aSNYlOPxEAAAh+QQFCgAPACwAAAIADQANAAAENPA9s4y8+IUVcqaWJ4qEQozSoAzoIyhCK2NFU2SJk0hNnyEOhKR2AzAAj4Pj4GE4W0bkJQIAOw=="
  }
];