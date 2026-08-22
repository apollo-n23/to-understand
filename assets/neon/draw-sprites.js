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
    void: { player: 'player-void.png', hazard: 'hazard-void.png', portal: 'portal-void.png', enemy: 'blob.png' },
    octo: { player: 'player-octo.png', hazard: 'hazard-octo.png', portal: 'portal-void.png', enemy: 'blob.png', npc: 'octopoop.png' },
    industrial: { player: 'player-industrial.png', hazard: 'hazard-industrial.png', portal: 'portal-industrial.png', enemy: 'blob.png' },
    lava: { player: 'player-lava.png', hazard: 'hazard-lava.png', portal: 'portal-lava.png', enemy: 'blob-lava.png', ptero: 'ptero.png', boss: 'boss.png' },
    pink: { player: 'player-pink.png', hazard: 'hazard-pink.png', portal: 'portal-pink.png', enemy: 'blob-pink.png', ptero: 'drone.png' },
    water: { player: 'player-water.png', hazard: 'hazard-coral.png', portal: 'portal-water.png', enemy: 'blob-water.png', bubble: 'bubble.png' }
  };

  function theme(name) {
    var t = THEMES[name] || THEMES.void;
    load('player', t.player);
    load('hazard', t.hazard);
    load('portal', t.portal);
    load('enemy', t.enemy);
    load('orb', 'orb.png');
    load('orbGreen', 'orb-green.png');
    if (t.npc) load('npc', t.npc);
    if (t.ptero) load('ptero', t.ptero);
    if (t.boss) load('boss', t.boss);
    if (t.bubble) load('bubble', t.bubble);
  }

  global.NeonDashSprites = { load: load, drawSprite: drawSprite, theme: theme, images: images };
})(typeof window !== 'undefined' ? window : this);
