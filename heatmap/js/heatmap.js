var dotsize = 5;
var gutsize = 1;
var totsize = dotsize + gutsize;

function heatmap(id, data) {
  var self = {};
  self.data = data || [];
  self.canvas = document.getElementById(id);
  self.ctx = self.canvas.getContext('2d');

  _(data).each(function(row,j) {
    _(row).each(function(val,i) {
      self.ctx.fillStyle = colorize(val);
      self.ctx.fillRect(totsize*i,totsize*j,dotsize,dotsize);
    });
  });

  self.canvas.onmousemove = position;

  function position(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var j = Math.floor(x/totsize);
    var i = Math.floor(y/totsize);
    var val = self.data[i][j];
    document.getElementById('x').innerHTML = x;
    document.getElementById('y').innerHTML = y;
    document.getElementById('i').innerHTML = i;
    document.getElementById('j').innerHTML = j;
    document.getElementById('val').innerHTML = val;
  };

  return self;
};

function colorize(val) {
  //return 'rgb(' + Math.round(255*val) + ',0,0)';
  return 'hsla(0,' + (100*val) +'%,50%,' + val + ')';
};
