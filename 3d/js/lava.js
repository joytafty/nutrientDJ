if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var clock = new THREE.Clock();

var camera, scene, renderer, composer;

var uniforms, material, mesh;

var mouseX = 0, mouseY = 0,
lat = 0, lon = 0, phy = 0, theta = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

container = document.getElementById( 'container' );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 35, windowHalfX / windowHalfY, 1, 3000 );
camera.position.z = 4;
scene.add( camera );

uniforms = {

  fogDensity: { type: "f", value: 0.45 },
  fogColor: { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
  time: { type: "f", value: 1.0 },
  resolution: { type: "v2", value: new THREE.Vector2() },
  uvScale: { type: "v2", value: new THREE.Vector2( 3.0, 1.0 ) },
  texture1: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "textures/lava/cloud.png" ) },
  texture2: { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture( "textures/lava/lavatile.jpg" ) }

};

uniforms.texture1.texture.wrapS = uniforms.texture1.texture.wrapT = THREE.Repeat;
uniforms.texture2.texture.wrapS = uniforms.texture2.texture.wrapT = THREE.Repeat;

var size = 0.65;

material = new THREE.ShaderMaterial( {

  uniforms: uniforms,
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );

mesh = new THREE.Mesh( new THREE.TorusGeometry( size, 0.3, 30, 30 ), material );
mesh.rotation.x = 0.3;
scene.add( mesh );

//

renderer = new THREE.WebGLRenderer( { antialias: true } );
container.appendChild( renderer.domElement );
renderer.autoClear = false;

//

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
//container.appendChild( stats.domElement );

//

var renderModel = new THREE.RenderPass( scene, camera );
var effectBloom = new THREE.BloomPass( 1.25 );
var effectFilm = new THREE.FilmPass( 0.35, 0.95, 2048, false );

effectFilm.renderToScreen = true;

composer = new THREE.EffectComposer( renderer );

composer.addPass( renderModel );
composer.addPass( effectBloom );
composer.addPass( effectFilm );

//

onWindowResize();

window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize( event ) {

uniforms.resolution.value.x = window.innerWidth;
uniforms.resolution.value.y = window.innerHeight;

renderer.setSize( window.innerWidth, window.innerHeight );

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

composer.reset();

}

//

function animate() {

requestAnimationFrame( animate );

check_keyboard();
render();
stats.update();

}

function render() {

var delta = 5 * clock.getDelta();

uniforms.time.value += 0.2 * delta;

mesh.rotation.y += 0.0125 * delta;
mesh.rotation.x += 0.05 * delta;

renderer.clear();
composer.render( 0.01 );

}

/* Keyboard */

var keyboard = new THREEx.KeyboardState();

var movement = {};
var x = 0;

camera.lookAt({
  x: 0,
  y: 0,
  z: 1
});

movement = {
  'up': function() {
    camera.position.z -= 0.03;
  },
  'down': function() {
    camera.position.z += 0.03;
  },
  'left': function() {
    x -= 0.07;
    camera.lookAt({
      x: x,
      y: 0,
      z: 1
    });
  },
  'right': function() {
    x += 0.07;
    camera.lookAt({
      x: x,
      y: 0,
      z: 1
    });
  },
};

function check_keyboard() {
  for ( key in movement )
    if( keyboard.pressed(key) )  movement[key]();
}
