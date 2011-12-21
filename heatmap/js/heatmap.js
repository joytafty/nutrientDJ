var dotsize = 5;
var gutsize = 1;
var totsize = dotsize + gutsize;

function heatmap(id, data) {
  var self = {};
  self.data = data || [];
  self.canvas = document.getElementById(id);
  self.ctx = self.canvas.getContext('2d');

  // render heatmap
  _(data).each(function(row,j) {
    _(row).each(function(val,i) {
      self.ctx.fillStyle = colorize(val);
      self.ctx.fillRect(totsize*i,totsize*j,dotsize,dotsize);
    });
  });

  return self;
};

function linegraph(id, data) {
  var self = {};
  self.data = data || [];
  self.bg = $('#' + id + ' .background')[0];
  self.bgctx = self.bg.getContext('2d');
  self.fg = $('#' + id + ' .foreground')[0];
  self.fgctx = self.fg.getContext('2d');

  // render
  self.bgctx.strokeStyle = 'hsla(0,0%,50%,0.4)';
  self.bgctx.beginPath();
  _(data).each(function(row) {
    _(row).each(function(val,j) {
      if (j == 0)
        self.bgctx.moveTo(totsize*j,120-val*120);
      else
        self.bgctx.lineTo(totsize*j,120-val*120);
    });
  });
  self.bgctx.stroke();

  self.highlight = function(pos) {
    self.fgctx.strokeStyle = '#fb5';
    self.fgctx.lineWidth = 2.2;
    self.fgctx.clearRect(0,0,900,120);
    self.fgctx.beginPath();
     _(data[pos.i]).each(function(val,j) {
      if (j == 0)
        self.fgctx.moveTo(totsize*j,120-val*120);
      else
        self.fgctx.lineTo(totsize*j,120-val*120);
    });   
    self.fgctx.stroke();
    self.fgctx.beginPath();
    self.fgctx.strokeStyle = '#6f9';
    self.fgctx.lineWidth = 1;
    self.fgctx.moveTo(totsize*pos.j, 0);
    self.fgctx.lineTo(totsize*pos.j, 120);
    self.fgctx.stroke();
  };

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
