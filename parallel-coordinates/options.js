$(function() {
  if (localStorage['hidden'] === "true") {
	$('.intro').hide();
	$('#show_instructions').show();
  }
  
  $('#hide_instructions').click(function() {
	if (localStorage)
	  localStorage['hidden'] = "true";
    $('.intro').hide();
	$('#show_instructions').show();
	return false;
  });
    
  $('#show_instructions').click(function() {
	if (localStorage)
	  localStorage['hidden'] = "false";
    $('.intro').fadeIn();
	$('#show_instructions').hide();
	return false; 
  });
  
  if (localStorage['inverted'] === "true") {
    $('body').addClass('invert');
  }
  
  $('#invert_colors').click(function() {
    if (localStorage && localStorage['inverted'] != "true") {
	  localStorage['inverted'] = "true";
      $('body').addClass('invert');
	} else {
	  if (localStorage)
	  	localStorage['inverted'] = "false";
      $('body').removeClass('invert');
	}
	return false;
  });
  
  $('#toggle_labels').toggle(function() {
    $('#parallel .axis g').hide();
  }, function() {
    $('#parallel .axis g').show();
  });
  
  $('#toggle_background').toggle(function() {
    $('#parallel').addClass('no_background');
  }, function() {
    $('#parallel').removeClass('no_background');
  });
});