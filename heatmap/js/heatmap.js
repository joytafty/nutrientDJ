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

  self.canvas.onmousemove = function(e) { showValues(e, self.data) };

  return self;
};

/* utility functions */

// colorize based on value
function colorize(val) {
  return 'hsla(0,' + (100*val) +'%,50%,' + val + ')';
};

// invert mapping to get indices
function indices(totsize, e) {
  var x = e.offsetX;
  var y = e.offsetY;
  var j = Math.floor(x/totsize);
  var i = Math.floor(y/totsize);
  return {
    x: x,
    y: y,
    i: i,
    j: j
  };
};

// lookup value with indices
function lookup(pos, data) {
  if (_.isArray(data)) {
    return data[pos.i][pos.j];      // 2d array
  } else {
    if (pos.i in data) {
      if (pos.j in data[row]) {
        return data[pos.i][pos.j];  // nested object
      }
    }
  }
  return undefined;                 // couldn't find anything
};

// display indices and value
function showValues(e, data) {
  var pos = indices(totsize, e);
  var val = lookup(pos, data);
  document.getElementById('x').innerHTML = pos.x;
  document.getElementById('y').innerHTML = pos.y;
  document.getElementById('i').innerHTML = pos.i;
  document.getElementById('j').innerHTML = pos.j;
  document.getElementById('val').innerHTML = val;
};

