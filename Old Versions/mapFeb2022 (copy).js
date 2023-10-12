//scaling of width, height, depth, x, y, z
const UNIT = 2; 
const canvas = document.getElementById('Palumbo');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const backgroundcolor = "#ccbea9";
const loader = new THREE.TextureLoader();

//2D array that holds items and creates the map
let new_map;
//let items = [];

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
let vector = new THREE.Vector3( 0, 0, 0 ); // instead of event.client.x and event.client.y
let direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( camera.matrixWorld );
//raycaster.setFromCamera( new THREE.Vector2(), camera );  

let block_width = 5;
let block_length = 5;
let block_height = 10;

        //https://www.youtube.com/watch?v=5bc9AN87QtM
let controls = new THREE.PointerLockControls( camera, renderer.domElement );
let clock = new THREE.Clock();
let btn1 = document.querySelector("#button1");
let down = false;
let keyboard = [];
let a = true;

addEventListener('mousedown',(e)=>{
    controls.lock();
})

addEventListener('mouseup',(e)=>{
    controls.unlock();
})

addEventListener('keydown',(e)=>{
    keyboard[e.key] = true;
})
addEventListener('keyup',(e)=>{
    keyboard[e.key] = false;
})

function render() {
  let delta = clock.getDelta();
  processKeyboard(delta); 
  addCords();
  renderer.render( scene, camera );
  requestAnimationFrame(render);

  
  THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    console.log("test");
};
  
}

//Performance Stats
(function(){let script=document.createElement('script');script.onload=function(){let stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

function build_newmap(filename) {
  //lets for csv -> array
  let request = new XMLHttpRequest();
  request.open('GET', filename, false);
  request.send();
  let text = request.responseText;
  let map = text.split(",");
  new_map = [[]];
  //Converts CSV File into Array
  for (i = 0; i < map.length; i ++) {
    let solution = Math.floor(map[i]);
    if(map[i].startsWith("end")) {
      new_map.push([map[i].substr(3)]); 
    }
    else {
      new_map[new_map.length - 1].push(solution);
    } 
  }
}

function load_data(filename) {
  //lets for csv -> array
  //read the file
  //walls fed from csv into items array
  let mapData = [];

  let request = new XMLHttpRequest();
  request.open('GET', filename, false);
  request.send();
  let data = request.responseText;
  
  //split up the file
  let rows = data.split("\r");
  let textures = [];

  //loop through the file
  for (i = 0; i < rows.length; i ++) { 
    let temp = rows[i].split(",");
    //map data without position
    mapData[parseInt(temp[0])] = 
    {
      height: parseInt(temp[1]), 
      width: parseInt(temp[2]), 
      depth: parseInt(temp[3]), 
      texture: [temp[4],temp[5],temp[6],temp[7],temp[8],temp[9]]
    };
    //load each texture only once
    for (let i = 4; i <= 9; i ++)
      if (textures[temp[i]] == null)
        textures[temp[i]] = loader.load(temp[i]);
  }
  for (let i = 0; i < new_map.length; i ++) {
    for (let j = 0; j < new_map[0].length; j ++) {

    let f = Math.floor(new_map[i][j]);
    if (f == "NaN") f = 0;

    if(new_map[i][j] != 0) {
      
      let w = UNIT*block_width * mapData[f].width;
      let d = UNIT*block_length * mapData[f].depth;
      let h = UNIT*block_height * mapData[f].height;

      let geometry = new THREE.BoxBufferGeometry(w, h, d);
      let cubeMaterial = [
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[0]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[1]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[2]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[3]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[4]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[5]]})];
      const mesh = new THREE.Mesh(geometry, cubeMaterial);
      mesh.position.x = j*UNIT*block_length + w / 2;
      mesh.position.y = UNIT*block_height + h / 2;
      mesh.position.z = i*UNIT*block_width + d / 2;
      //material.wireframe = true;
      scene.add(mesh);

/*
      items.push(
        {
          x: j*UNIT*block_length + w / 2, 
          y: UNIT*block_height + h / 2, 
          z: i*UNIT*block_width + d / 2, 
          width: w, 
          height: h, 
          depth: d, 
          material: [
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[0]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[1]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[2]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[3]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[4]]}), 
            new THREE.MeshBasicMaterial({map: textures[mapData[f].texture[5]]})]
        });*/
      }
    }
  }
}

function cast(direction) {
    // update the picking ray with the camera and mouse position
    if (direction == 0) //forward
      raycaster.setFromCamera( mouse, camera );
    if (direction == 1) { //right
      //mess with mouse or camera (probably add pi/2 to some angle)
      camera.rotation.y += Math.PI / 2;
      raycaster.setFromCamera( mouse, camera );
      camera.rotation.y -= (Math.PI / 2);
      //fix the camera or mouse
    }
    if (direction == 2) { //behind you
      //mess with mouse or camera (probably add pi to some angle)
      //camera.rotation.y += Math.PI;
      raycaster.setFromCamera( mouse, camera );
      //camera.rotation.y += Math.PI;
      //fix the camera or mouse
    }
    if (direction == 3) { //left of you
      //mess with mouse or camera (probably subtract pi to some angle)
      camera.rotation.y -= (Math.PI / 2);
      raycaster.setFromCamera( mouse, camera );
      camera.rotation.y += (Math.PI / 2);
      //fix the camera or mouse
    }
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    if (a && intersects.length > 0) {
      a = false;
    }

    for ( let i = 0; i < intersects.length; i ++ ) {
    if (intersects[i].distance <  10)
      return true;
    		  //intersects[ i ].object.material.color.set( 0xff0000 );

    }  
    return false;
}

function processKeyboard(delta) {
  let speed = 50;
  let actualSpeed = speed * delta;

  if (keyboard['ArrowRight']) {
    controls.getObject().rotation.y -=0.05;
  }
  if (keyboard['ArrowLeft']) {
    controls.getObject().rotation.y +=0.05;
  }
  if (keyboard['w'] || keyboard['ArrowUp']){
      controls.moveForward(actualSpeed);
      if (cast(0)) controls.moveForward(-actualSpeed);
  }
  if (keyboard['s'] || keyboard['ArrowDown']){
      controls.moveForward(-actualSpeed);
      if (cast(2)) {
        
        controls.moveForward(actualSpeed);
      }
  }
  if (keyboard['a']){
      controls.moveRight(-actualSpeed);
      if (cast(3)){
        controls.moveRight(actualSpeed);
    }
  }
  if (keyboard['d']){
      controls.moveRight(actualSpeed);
      if (cast(1)) controls.moveRight(-actualSpeed);
  }
  if (keyboard[' ']){
      camera.position.y += actualSpeed;
  }
  if (keyboard['Shift']){
      camera.position.y -= actualSpeed;
  }
}

function init() {
    build_newmap('Current/csv/map5.csv');
    load_data('Current/csv/data5.csv');
    
    camera.position.set( 90, 30, 116 );
    camera.rotation.y = 180*Math.PI/180;
    renderer.setClearColor(backgroundcolor);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); 
    });
  
    addFeatures();
    render();
}

function addCords(){
  let cords = ["X",parseInt(camera.position.x),"Y",parseInt(camera.position.y),"Z",parseInt(camera.position.z)];
  document.getElementById("cords").innerHTML = cords;
  }

function addFeatures() {
  /*
  for (let i = 0; i < items.length; i ++) {
      let geometry = new THREE.BoxBufferGeometry(items[i].width, items[i].height, items[i].depth);
      let cubeMaterial = items[i].material;
      const mesh = new THREE.Mesh(geometry, cubeMaterial);
      mesh.position.x = items[i].x;
      mesh.position.y = items[i].y;
      mesh.position.z = items[i].z;
      //material.wireframe = true;
      scene.add(mesh);
    } 
*/
    let light = new THREE.PointLight(0xFFFFFF, 1, 500);
    light.position.set(10, 0, 25);
    scene.add(light);
    light = new THREE.AmbientLight(0x555555);
    scene.add(light);

  var geometry = new THREE.SphereGeometry( 1, 32, 106, 14.5 );
  var texture = new   THREE.TextureLoader().load('edw.png');
  var material = new THREE.MeshBasicMaterial( {color: 000000} );
  var sphere = new THREE.Mesh( geometry, material );
  function makeSphere(x, y, z) {
    var newSphere = sphere.clone();
    newSphere.position.set( x, y, z );
    scene.add( newSphere );

  }

  var geo = new THREE.CylinderGeometry( .5, 1.5, 5, 32, true );
  var mat = new THREE.MeshBasicMaterial( {color: 000000} );
  var cylinder = new THREE.Mesh( geo, mat );
  function makeBody(x, y, z) {
      var newBody = cylinder.clone();
      newBody.position.set( x, y, z );
      scene.add( newBody );

  }
  makeSphere( 46, 27.25, 741 );
  makeBody( 46, 24, 741 );
  makeSphere( 48, 27.25, 741 );
  makeBody( 48, 24, 741 );
  makeSphere( 48, 27.25, 741 );
  makeBody( 48, 24, 741 );
  
} 
init();