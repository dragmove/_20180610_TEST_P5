import p5 from 'p5';

(function() {
  'use strict';

  let w = 1000,
    h = 800,
    scl = 20,
    columns = w / scl,
    rows = h / scl,
    flying = 0,
    perlinNoiseOffsetX = 0.3,
    perlinNoiseOffsetY = 0.3,
    terrain = [];

  let p5Env = function(p) {
    window.p = p;

    p.setup = () => {
      for (let x = 0; x < columns; x++) {
        terrain[x] = [];
      }

      p.createCanvas(500, 500, p.WEBGL);
    };

    p.draw = () => {
      flying -= 0.01;

      let offsetY = flying;
      for (let y = 0; y < rows; y++) {
        let offsetX = 0;

        for (let x = 0; x < columns; x++) {
          terrain[x][y] = p.map(p.noise(offsetX, offsetY), 0, 1, -50, 50);
          offsetX += perlinNoiseOffsetX;
        }

        offsetY += perlinNoiseOffsetY;
      }

      p.background(0);
      p.stroke(255);
      p.noFill();

      p.rotateX(p.PI / 3);
      p.translate(-w / 2, -h / 2);

      for (let y = 0; y < rows - 1; y++) {
        p.beginShape(p.TRIANGLE_STRIP);

        for (let x = 0; x < columns; x++) {
          p.vertex(x * scl, y * scl, terrain[x][y]);
          p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }

        p.endShape();
      }
    };
  };

  function init() {
    const myP5 = new p5(p5Env, 'root');
  }

  init();
})();
