//Performance Stats
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()


//raycasting        
        
const FLOOR_HEIGHT = 20;
const NUM_FLOORS = 7;
const UNIT = 2;
const FLOOR_MAT = {color: 0xFF0000, side: THREE.DoubleSide};
var WALL_HEIGHT = NUM_FLOORS * FLOOR_HEIGHT;

var items = [
// [x, y, z, width, height, depth, material],
//  [9, 15, 0, 100, 10, 1, {color: 0xFF0000, side: THREE.DoubleSide}],
  //the E
];

var floors = ['Current/array0.csv','Current/array1.csv','Current/array2.csv','Current/array4.csv','Current/array5.csv','Current/array6.csv','Current/array7.csv'];
let new_map;

function build_newmap(filename) {
  //vars for csv -> array
  var request = new XMLHttpRequest();
  request.open('GET', filename, false);
  request.send();
  var text = request.responseText;
  let map = text.split(",");
  new_map = [[1001]];
  //Converts CSV File into Array
  for (i = 0; i < map.length; i ++) {
    let solution = Math.floor(map[i]);
    if(map[i].startsWith("end")) {
      console.log(map[i]);
      new_map.push([map[i].substr(3)]); 
    }
    else {
      new_map[new_map.length - 1].push(solution);
    } 
  }
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
var velocity = new THREE.Vector3(0,0,0);
var raycaster = new THREE.Raycaster();
var vector = new THREE.Vector3( 0, 0, 0 ); // instead of event.client.x and event.client.y
var direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( camera.matrixWorld );
raycaster.setFromCamera( new THREE.Vector2(), camera );  

var intersects = raycaster.intersectObjects(items);
if (intersects==false) camera.position.x - 10;

/*
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;
*/

var rotate = 0;
var currentX = 0;
var lastX = 0;
var currentY = 0;
var lastY = 0;

const backgroundcolor = "#00ffff";

var block_width = 5;
var block_length = 5;
var block_height = 10;


function build_blocks() {
  for (let i = 0; i < new_map.length; i ++) {
    for (let j = 0; j < new_map[0].length; j ++) {

    let f = Math.floor(new_map[i][j] / 1000);
    if (f == "NaN") f = 0;

    if(new_map[i][j] % 1000 == 1) {
      // [x, y, z, width, height, depth, material],
      items.push([j*UNIT*block_length, f*UNIT*block_height+2, i*UNIT*block_width, UNIT*block_width, UNIT*block_height, UNIT*block_length, {color: 0x00FF00, side: THREE.DoubleSide}]);
      
    }
    if(new_map[i][j] % 1000 == 2) {
      // [x, y, z, width, height, depth, material],
      items.push([j*UNIT*block_length, (f*UNIT*block_height+2)-9, i*UNIT*block_width, UNIT*block_width, 0*UNIT*block_height, UNIT*block_length, {color: 0x0000FF, side: THREE.DoubleSide}]);
      
    }
  }
  }
}
          

/*
function build_floors() {
  for (let i = -1; i < NUM_FLOORS; i ++) {
    items.push([-10*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 0*UNIT, 12*UNIT, 0*UNIT, 50*UNIT, {color: 0x00FF00, side: THREE.DoubleSide}]);
    items.push([11.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, -20*UNIT, 31*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
    items.push([11.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 20*UNIT, 31*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
    items.push([8.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 0*UNIT, 25*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
  }
}

function build_walls() {
  for (let i = 0; i < 5; i ++) {
    items.push([-19*UNIT, 73.5*UNIT, -1*UNIT, 5*UNIT, (WALL_HEIGHT*UNIT)+1, 50*UNIT, FLOOR_MAT]);
      //back
      items.push([3.5*UNIT, 73.5*UNIT, -26*UNIT, 50*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, FLOOR_MAT]);
    //front
    items.push([3.5*UNIT, 73.5*UNIT, 26*UNIT, 50*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, FLOOR_MAT]);
    items.push([8.5*UNIT, 73.5*UNIT, -7*UNIT, 25*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, {color: 0x0000FF, side: THREE.DoubleSide}]);
    items.push([8.5*UNIT, 73.5*UNIT, 7*UNIT, 25*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, {color: 0x0000FF, side: THREE.DoubleSide}]);
  }
}
*/
        //https://www.youtube.com/watch?v=5bc9AN87QtM
let controls = new THREE.PointerLockControls( camera, renderer.domElement );
        let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click',()=> {
    controls.lock();
})

controls.addEventListener('lock',()=>{
    btn1.innerHTML = "Locked";
})

controls.addEventListener('unlock',()=>{
    btn1.innerHTML = "Unlocked";
})


let keyboard = [];
addEventListener('keydown',(e)=>{
    keyboard[e.key] = true;
})
addEventListener('keyup',(e)=>{
    keyboard[e.key] = false;
})

function processKeyboard(delta) {
  let speed = 50;
  let actualSpeed = speed * delta;
  if (keyboard['w']){
      controls.moveForward(actualSpeed);
  }
  if (keyboard['s']){
      controls.moveForward(-actualSpeed);
  }
  if (keyboard['a']){
      controls.moveRight(-actualSpeed);
  }
  if (keyboard['d']){
      controls.moveRight(actualSpeed);
  }
  if (keyboard[' ']){
    velocity.y = 0.5;
  }
  if (keyboard['Shift']){
      velocity.y = -0.5;
  }
}

function connect_walls(){
  for (let i = 0; i < new_map.length; i ++) {
    for (let j = 0; j < new_map[0].length; j ++) {
      
      
    }
  }
}

function init() {
    build_newmap('Current/array1.csv');
    build_blocks();
    build_newmap('Current/array2.csv');
    build_blocks();
    build_newmap('Current/array3.csv');
    build_blocks();
    build_newmap('Current/array4.csv');
    build_blocks();
    build_newmap('Current/array5.csv');
    build_blocks();
    
    camera.position.set( 0, 20, 100 );
    camera.position.z = 50;
    renderer.setClearColor(backgroundcolor);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); 
    });
    addFeatures();
    //controls.update();
    
    //window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    //window.addEventListener('mousemove', onMouseMove);
    render();
    

}

function addCords(){
  var cords = ["X",parseInt(camera.position.x),"Y",parseInt(camera.position.y),"Z",parseInt(camera.position.z)];
  document.getElementById("cords").innerHTML = cords;
  }


function addFeatures() {
  for (let i = 0; i < items.length; i ++) {
    var geometry = new THREE.BoxGeometry(items[i][3], items[i][4], items[i][5]);
    var material = new THREE.MeshLambertMaterial(items[i][6]);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = items[i][0];
    mesh.position.y = items[i][1];
    mesh.position.z = items[i][2];
    //material.wireframe = true;
    scene.add(mesh);

    
        }


            
            
            
            const color = backgroundcolor;
            const density = 0.01;
            //scene.fog = new THREE.FogExp2(color, density);

            var light = new THREE.PointLight(0xFFFFFF, 1, 500);
            light.position.set(10, 0, 25);
            scene.add(light);
            var light = new THREE.AmbientLight(0x555555);
            scene.add(light);
            
        }
        

        var render = function () {
            let delta = clock.getDelta();
            processKeyboard(delta); 
            requestAnimationFrame(render);
            camera.position.y += velocity.y;
            camera.position.y = Math.max(0, camera.position.y);
            addCords();
            //gravity
            //velocity.y -= 0.05;

            var direction = new THREE.Vector3();
            camera.getWorldDirection( direction );
            camera.position.add( direction.multiplyScalar(-velocity.z) );
            
            //camera.position.x +=
            //camera.position.z += 

            camera.rotation.y += rotate;
            rotate *= 0.95;
            camera.position.z += velocity.z;
            camera.position.x += velocity.x;

            //Slow down 5%
            velocity.z *= 0.95;
            velocity.x *= 0.95;
            //controls.update();

            renderer.render(scene, camera);

            //test
            //console.log(velocity.y);
            
        }

        function onKeyUp(event) {
                  velocity.y = 0;
                }



/*
function onMouseMove(event) {
    if (event.buttons == 0) return;
    currentX = event.pageX;
    currentY = event.pageY;
    
    if (currentX - lastX < 0)
        rotate -= 0.001;
    if (currentX - lastX > 0)
        rotate += 0.001;

    lastX = currentX;
    lastY = currentY;
        }

        

        function onKeyDown(event) {
            event.preventDefault();

            while (camera.rotation.y < 0) camera.rotation.y += 2*Math.PI;
            while (camera.rotation.y > 2*Math.PI) camera.rotation.y -= 2*Math.PI;

            if (event.key=='w') {
              if (camera.rotation.y > 3*Math.PI/2) {
                console.log("a");
                velocity.z += 0.1*Math.sin(camera.rotation.y - 3*Math.PI/2);
                velocity.x += 0.1*Math.cos(camera.rotation.y - 3*Math.PI/2);
              }
              else if (camera.rotation.y > Math.PI) {
                console.log("b");
                velocity.z += 0.1*Math.cos(camera.rotation.y - Math.PI);
                velocity.x -= 0.1*Math.sin(camera.rotation.y - Math.PI);
              }
              else if (camera.rotation.y > Math.PI/2) {
                console.log("c");
                velocity.z -= 0.1*Math.cos(camera.rotation.y - Math.PI/2);
                velocity.x -= 0.1*Math.sin(camera.rotation.y - Math.PI/2);
              }
              else {
                console.log("d");
                velocity.z -= 0.1*Math.sin(camera.rotation.y);
                velocity.x -= 0.1*Math.cos(camera.rotation.y);
              }
            }
            if (event.key=='s') {
              if (camera.rotation.y > 3*Math.PI/2) {
                velocity.z -= 0.1*Math.sin(camera.rotation.y);
                velocity.x -= 0.1*Math.cos(camera.rotation.y);
              }
              else if (camera.rotation.y > Math.PI) {
                velocity.z -= 0.1*Math.cos(camera.rotation.y);
                velocity.x -= 0.1*Math.sin(camera.rotation.y);
              }
              else if (camera.rotation.y > Math.PI/2) {
                velocity.z += 0.1*Math.cos(camera.rotation.y);
                velocity.x += 0.1*Math.sin(camera.rotation.y);
              }
              else {
                velocity.z += 0.1*Math.sin(camera.rotation.y);
                velocity.x += 0.1*Math.cos(camera.rotation.y);
              }
            }
            if (event.key=='a') {
                rotate += 0.01;
            }
            if (event.key=='d') {
                rotate -= 0.01;
            }
            if (event.key==' ') {//Fly Up
              velocity.y = 1.0;
                //if (camera.position.y == 0) //Only jump if on ground
                    //velocity.y = 0.5;
            }
            if (event.key== 'Shift') {//Fly Down
              velocity.y = -1.0;
            }
        }
*/

        
        init();