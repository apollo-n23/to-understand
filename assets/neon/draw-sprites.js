/* Neon Dash Imagine sprite loader. Browser-only; no Node require. */
(function (global) {
  var BASE = 'assets/neon/';
  var images = {};

  function load(key, file) {
    var img = new Image();
    img.src = BASE + file;
    images[key] = img;
  }

  function drawSprite(ctx, key, x, y, w, h) {
    var img = images[key];
    if (!img || !img.complete || !img.naturalWidth) return false;
    ctx.drawImage(img, x, y, w, h);
    return true;
  }

  var THEMES = {
    void: { player: 'player-void.png', hazard: 'hazard-void.png', portal: 'portal-void.png', enemy: 'blob.png', sky: 'sky-void.jpg', plat: 'plat-void.png' },
    octo: { player: 'player-octo.png', hazard: 'hazard-octo.png', portal: 'portal-void.png', enemy: 'blob.png', npc: 'octopoop.png', sky: 'sky-octo.jpg', plat: 'plat-octo.png' },
    industrial: { player: 'player-industrial.png', hazard: 'hazard-industrial.png', portal: 'portal-industrial.png', enemy: 'blob.png', sky: 'sky-industrial.jpg', plat: 'plat-industrial.png' },
    lava: { player: 'player-lava.png', hazard: 'hazard-lava.png', portal: 'portal-lava.png', enemy: 'blob-lava.png', ptero: 'ptero.png', boss: 'boss.png', sky: 'sky-lava.jpg', plat: 'plat-lava.png' },
    pink: { player: 'player-pink.png', hazard: 'hazard-pink.png', portal: 'portal-pink.png', enemy: 'blob-pink.png', ptero: 'drone.png', sky: 'sky-pink.jpg', plat: 'plat-pink.png' },
    water: { player: 'player-water.png', hazard: 'hazard-coral.png', portal: 'portal-water.png', enemy: 'blob-water.png', bubble: 'bubble.png', sky: 'sky-water.jpg', plat: 'plat-water.png' }
  };

  function theme(name) {
    var t = THEMES[name] || THEMES.void;
    load('player', t.player);
    load('hazard', t.hazard);
    load('portal', t.portal);
    load('enemy', t.enemy);
    load('orb', 'orb.png');
    load('orbGreen', 'orb-green.png');
    load('sky', t.sky);
    load('plat', t.plat);
    if (t.npc) load('npc', t.npc);
    if (t.ptero) load('ptero', t.ptero);
    if (t.boss) load('boss', t.boss);
    if (t.bubble) load('bubble', t.bubble);
    var i;
    for (i = 1; i <= 8; i++) {
      load('boss' + i, 'boss-0' + i + '.png');
    }
  }

  function drawSky(ctx, W, H, groundY, scrollX, frame) {
    var img = images.sky;
    if (!img || !img.complete || !img.naturalWidth) return false;
    var drift = ((scrollX * 0.12) + frame * 0.18) % img.naturalWidth;
    if (drift < 0) drift += img.naturalWidth;
    var destH = groundY;
    ctx.drawImage(img, drift, 0, img.naturalWidth - drift, img.naturalHeight, 0, 0, W * (1 - drift / img.naturalWidth), destH);
    if (drift > 2) {
      ctx.drawImage(img, 0, 0, drift, img.naturalHeight, W * (1 - drift / img.naturalWidth), 0, W * (drift / img.naturalWidth), destH);
    }
    return true;
  }

  function drawGround(ctx, W, groundY, H, scrollX) {
    var img = images.plat;
    if (!img || !img.complete || !img.naturalWidth) return false;
    var visH = Math.min(72, H - groundY + 8);
    var tileW = Math.max(96, visH * (img.naturalWidth / img.naturalHeight));
    var step = tileW * 0.86;
    var off = (scrollX * 1.0) % step;
    if (off < 0) off += step;
    var x;
    for (x = -off; x < W + tileW; x += step) {
      ctx.drawImage(img, x, groundY - 4, tileW, visH);
    }
    return true;
  }

  function drawPlatform(ctx, x, y, w, hitH) {
    var img = images.plat;
    if (!img || !img.complete || !img.naturalWidth) return false;
    var visH = Math.max(hitH * 2.6, 18);
    ctx.drawImage(img, x, y - 2, w, visH);
    return true;
  }

  function drawBoss(ctx, x, y, w, h, frame) {
    var idx = (Math.floor(frame / 5) % 8) + 1;
    var img = images['boss' + idx] || images.boss;
    if (!img || !img.complete || !img.naturalWidth) return false;
    ctx.drawImage(img, x, y, w, h);
    return true;
  }

  global.NeonDashSprites = {
    load: load,
    drawSprite: drawSprite,
    drawSky: drawSky,
    drawGround: drawGround,
    drawPlatform: drawPlatform,
    drawBoss: drawBoss,
    theme: theme,
    images: images
  };
})(typeof window !== 'undefined' ? window : this);
