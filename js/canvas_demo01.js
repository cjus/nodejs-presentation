var canvasDemo01 = {};

(function(app) {
  'use strict';

  var canvas
    , ctx
    , sphereSize = 32
    , offsetX = 0
    , offsetY = 0;

  app.init = function() {
    app.prepareCanvas();
    app.mainloop();
  };

  app.prepareCanvas = function() {
    canvas = document.querySelector('#canvas-demo-01');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  app.mainloop = function() {
    var i;
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < 20; i += 1) {
      app.displaySphere(Math.floor(Math.random() * canvas.width + 1),
        Math.floor(Math.random() * canvas.height + 1),
        Math.floor(Math.random() + 0.5));
    }
    requestAnimationFrame(app.mainloop);
  };

  app.displaySphere = function(x, y, c) {
    var radgrad = ctx.createRadialGradient(offsetX + x,
      offsetY + y,
      0.5,
      offsetX + x,
      offsetY + y,
      sphereSize * 0.5);
    if (c === 0) {
      radgrad.addColorStop(0, '#FF0000');
      radgrad.addColorStop(0.9, '#990000');
      radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else {
      radgrad.addColorStop(0, '#0000FF');
      radgrad.addColorStop(0.9, '#000099');
      radgrad.addColorStop(1, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = radgrad;
    ctx.fillRect(offsetX + x - sphereSize * 0.5,
      offsetY + y - sphereSize * 0.5,
      sphereSize,
      sphereSize);
  };
})(canvasDemo01);

canvasDemo01.init();

