var initDefaults = {
  year: 2011,
  vote_key: {
    0: 'Nay',
    1: 'Yea',
    3: 'Not Voting',
    4: 'Present'
  },
  colors: {
    null: '#777',
    undefined: '#777',
    0: '#e30',
    1: '#0b0',
    3: '#2be',
    4: 'yellow'
  }
}
function initHeat(options) {
  var options = options || {},
      data = [],
      legislators = [],
      votes = [];

  var vote_key = _.extend(initDefaults.vote_key, options),
      colors = _.extend(initDefaults.colors, options),
      year = _.extend(d=initDefaults.year, options);

  //Init options in dom
  $('.date').each(function() {
    $(this).text(year);
  });
  _.each(colors, function(c, k) {
    if (k == "null" || k == "undefined") {
      $('.color5').css({"color":c});
    } else {
      $('.color'+k).css({"color":c});
    } 
  }); 

  $.getJSON('data/congress-' + year + '.json', function(raw_data) {
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

    $('#heatmap').attr('height', _.size(legislators)*5);
    $('#heatmap').attr('width', _.size(votes[0])*5);

    var b = heatmap('heatmap', votes, {
      colorize: function(val) {
        return colors[val];
      },
      dotsize: 4,
      gutsize: 1,
    });

    b.render();

    b.canvas.onmousemove = function(e) {
      $('#stats').offset({top: e.pageY-70, left: e.pageX-20});
      $('#stats').show();
      var pos = indices(5, e);
      var val = lookup(pos, votes);
      document.getElementById('legislator').innerHTML = legislators[pos.i];
      document.getElementById('j').innerHTML = pos.j+1;
      document.getElementById('val').innerHTML = vote_key[val];
    };

    b.canvas.onclick = function(e) {
      var pos = indices(5, e);
      var val = lookup(pos, votes);

      $('#heatmap-wrap').fadeOut('slow');

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
      $('#heatmap-wrap').fadeIn();
    };

    $('#hires').click(function() {
      // resize
      $('#heatmap').attr('height', _.size(legislators)*2);
      $('#heatmap').attr('width', _.size(votes[0])*2);

      b = heatmap('heatmap', votes, {
        colorize: function(val) {
          return colors[val];
        },
        dotsize: 2,
        gutsize: 0.00001,
      });

      // rerender
      b.render();

      // REFACTOR
      b.canvas.onmousemove = function(e) {
        $('#stats').offset({top: e.pageY-70, left: e.pageX-20});
        $('#stats').show();
        var pos = indices(2, e);
        var val = lookup(pos, votes);
        document.getElementById('legislator').innerHTML = legislators[pos.i];
        document.getElementById('j').innerHTML = pos.j+1;
        document.getElementById('val').innerHTML = vote_key[val];
      };

      b.canvas.onclick = function(e) {
        var pos = indices(2, e);
        var val = lookup(pos, votes);

        $('#heatmap-wrap').fadeOut(1.6);

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
        $('#heatmap-wrap').fadeIn(0.7);
      };
      return false;
    });
    
    $('#loading').hide();
    $('#heatmap-wrap').fadeIn();
  });
};
