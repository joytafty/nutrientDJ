function initHeat(opts) {

  var options = _.extend({
    year: 1990,
    mapEl: '#heatmap-wrap',
    loadingEl: '#loading'
  }, opts);

  options.vote_key = _.extend({
    0: 'Nay',
    1: 'Yea',
    3: 'Not Voting',
    4: 'Present'
  }, opts.vote_key);

  options.colors = _.extend({
    null: '#777',
    undefined: '#777',
    0: '#e30',
    1: '#0b0',
    3: '#2be',
    4: 'yellow'
  }, opts.colors);

  options.size = _.extend({
    width: 5,
    height: 5,
    dotsize: 4,
    gutsize: 1
  }, opts.size);
  
  var data = [],
      legislators = [],
      votes = [];

  //Init options in dom
  _.each(options.colors, function(c, k) {
    if (k == "null" || k == "undefined") {
      $('.color5').css({"color":c});
    } else {
      $('.color'+k).css({"color":c});
    } 
  }); 

  $.getJSON('data/congress-' + options.year + '.json', function(raw_data) {
    _(raw_data).each(function(v,k) {
      legislators.push(k);
      votes.push(v);
    });

    // reorganize data into [{}, {}, {}]
    data = _(raw_data).map(function(v,k) {
      return {
        legislator: k,
        votes: v
      }
    });

    draw();   

    $('#hires').click(function() {
      $(options.mapEl).hide();
      if (options.size.width == 5) {
        options.size = {
          width:2,
          height:2,
          dotsize:2,
          gutsize:0.00001
        };
        draw();
        $('#hires').text('Zoom In');      
      } else {
        options.size = {
          width: 5,
          height: 5,
          dotsize: 4,
          gutsize: 1
        };
        draw();      
        $('#hires').text('Zoom Out');      
      } 
      return false;
    });  
  });

  function draw() {
    $('#heatmap').attr('height', _.size(legislators)*options.size.height);
    $('#heatmap').attr('width', _.size(votes[0])*options.size.width);

    var b = heatmap('heatmap', votes, {
      colorize: function(val) {
        return options.colors[val];
      },
      dotsize: options.size.dotsize,
      gutsize: options.size.gutsize
    });

    b.render();
    bindEvents(b);
    $(options.loadingEl).hide();
    $(options.mapEl).fadeIn();
  };
  
  function bindEvents(b) {
    b.canvas.onmousemove = function(e) {
      $('#stats').offset({top: e.pageY-70, left: e.pageX-20});
      $('#stats').show();
      var pos = indices(5, e);
      var val = lookup(pos, votes);
      document.getElementById('legislator').innerHTML = legislators[pos.i];
      document.getElementById('j').innerHTML = pos.j+1;
      document.getElementById('val').innerHTML = options.vote_key[val];
    };

    b.canvas.onclick = function(e) {
      var pos = indices(5, e);
      var val = lookup(pos, votes);

      $(options.mapEl).fadeOut('slow');

      // alphabetical sort
      //var sorted_data = _(data).sortBy(function(d,v) { return d['legislator'] });

      // sort data by that column
      var sorted_data = _(data).sortBy(function(d,v) {
        var vote = d['votes'][pos.j + 1]
        if (_.isNull(vote)) {
          return -1;
        } else {
          return vote;
        }
      });

      legislators = _(sorted_data).pluck('legislator');
      votes = _(sorted_data).pluck('votes');
      data = sorted_data;
      b.update(votes);
      b.render();
      $(options.mapEl).fadeIn();
    };
  };
};
