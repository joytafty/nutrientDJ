var keyboard = new THREEx.KeyboardState();

window.movement = {};

movement = {
  'up': function() { console.log('forward') },
  'down': function() { console.log('back') },
  'left': function() { console.log('left') },
  'right': function() { console.log('right') },
};

function check_keyboard() {
  for ( key in movement )
    if( keyboard.pressed(key) )  movement[key]();
}
