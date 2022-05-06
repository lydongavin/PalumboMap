//scaling of width, height, depth, x, y, z
const UNIT = 2; 
const canvas = document.getElementById('Palumbo');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const backgroundcolor = "#00ffff";
const loader = new THREE.TextureLoader();
const directory = 'Current/textures/';

//walls fed from csv into items array
let items = [
// [x, y, z, width, height, depth, material],
];

//2D array that holds items and creates the map
let new_map;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
let vector = new THREE.Vector3( 0, 0, 0 ); // instead of event.client.x and event.client.y
let direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( camera.matrixWorld );
//raycaster.setFromCamera( new THREE.Vector2(), camera );  

let block_width = 5;
let block_length = 5;
let block_height = 10;

let text_1002 = loader.load(directory+'floors/hallfloorsmall.jpg');
let text_1003 = loader.load(directory+'floors/classroomS.jpg');
let text_1004 = loader.load(directory+'hall/wall.PNG');
let text_1005 = loader.load(directory+'lockers.jpg');
let text_1009 = loader.load(directory+'hall/smallwall.jpg');
let text_1010 = loader.load(directory+'floors/cafeteriaFloor.jpeg');

//504
let text_1011 = loader.load(directory+'walls/504W.png');
let text_1012_A = loader.load(directory+'walls/504S.png');
let text_1013_A = loader.load(directory+'walls/504N.png');
let text_1014 = loader.load(directory+'walls/504E.png');

//507
let text_1015 = loader.load(directory+'walls/507W.jpeg');
let text_1016 = loader.load(directory+'walls/507S.jpeg');
let text_1017_B = loader.load(directory+'walls/507N.jpeg');
let text_1018 = loader.load(directory+'walls/507E.jpeg');

//506
let text_1012_B = loader.load(directory+'walls/506N.jpeg');
let text_1017_A = loader.load(directory+'walls/506S.jpeg');
let text_1019 = loader.load(directory+'walls/506W.jpeg');
let text_1020 = loader.load(directory+'walls/506E.jpeg');

//503
let text_1021 = loader.load(directory+'walls/503W.jpeg');
let text_1022_A = loader.load(directory+'walls/503N.jpeg');
let text_1013_B = loader.load(directory+'walls/503S.jpeg');
let text_1023 = loader.load(directory+'walls/503E.jpeg');

//502
let text_1022_B = loader.load(directory+'walls/502S.jpeg');
let text_1024 = loader.load(directory+'walls/502W.jpeg');
let text_1025_A = loader.load(directory+'walls/502N.jpeg');
let text_1026 = loader.load(directory+'walls/502E.jpeg');

//501
let text_1025_B = loader.load(directory+'walls/501S.jpeg');
let text_1027 = loader.load(directory+'walls/501W.jpeg');
let text_1028_A = loader.load(directory+'walls/501N.jpeg');
let text_1029 = loader.load(directory+'walls/501E.jpeg');

//500
let text_1028_B = loader.load(directory+'walls/500S.jpeg');
let text_1030 = loader.load(directory+'walls/500W.jpeg');
let text_1031 = loader.load(directory+'walls/500E.jpeg');
let text_1032 = loader.load(directory+'walls/500N.jpeg');

//theater
let text_1033 = loader.load(directory+'walls/529W.jpeg');
let text_1034 = loader.load(directory+'walls/529S.jpeg');
let text_1035 = loader.load(directory+'walls/529E.jpeg');
let text_1059_A = loader.load(directory+'walls/529N.jpeg');
let text_1059_B = loader.load(directory+'hall/hall529.jpeg');
let text_1076 = loader.load(directory+'floors/529floor.jpeg');

//524
let text_1036 = loader.load(directory+'walls/524W.jpeg');
let text_1037 = loader.load(directory+'walls/524N.jpeg');
let text_1038_A = loader.load(directory+'walls/524E.jpeg');
let text_1048_A = loader.load(directory+'walls/524S.jpeg');
let text_1048_B = loader.load(directory+'hall/lockers524_B.png');
let text_1074 = loader.load(directory+'hall/lockers524_A.png');

//521
let text_1039 = loader.load(directory+'walls/521W.jpeg');
let text_1040 = loader.load(directory+'walls/521S.jpeg');
let text_1041_A = loader.load(directory+'walls/521E.jpeg');
let text_1049_A = loader.load(directory+'walls/521N.jpeg');
let text_1049_B = loader.load(directory+'hall/lockers521_A.jpeg');
let text_1073 = loader.load(directory+'hall/lockers521_B.jpeg');


//522
let text_1041_B = loader.load(directory+'walls/522W_A.jpeg');
let text_1042 = loader.load(directory+'walls/522W_B.jpeg');
let text_1043 = loader.load(directory+'walls/522E.jpeg');
let text_1044 = loader.load(directory+'walls/522S.jpeg');
let text_1045_A = loader.load(directory+'walls/522N.jpeg');

//523
let text_1038_B = loader.load(directory+'walls/523W.jpeg');
let text_1045_B = loader.load(directory+'walls/523S_A.jpeg');
let text_1046 = loader.load(directory+'walls/523N.jpeg');
let text_1047 = loader.load(directory+'walls/523E.jpeg');

let text_1050 = loader.load(directory+'hall/hall1050.jpeg');
let text_1051 = loader.load(directory+'hall/hall1051.jpeg');

let text_1052 = loader.load(directory+'hall/hall500.jpeg');
let text_1053 = loader.load(directory+'hall/hall501.jpeg');
let text_1054 = loader.load(directory+'hall/hall502.jpeg');
let text_1055 = loader.load(directory+'hall/hall503.jpeg');
let text_1056 = loader.load(directory+'hall/hall504.jpeg');
let text_1057 = loader.load(directory+'hall/hall506.jpeg');
let text_1058 = loader.load(directory+'hall/hall507.jpeg');

//generic door
let door_1014 = loader.load(directory+'hall/door.jpeg');

//lockers + hall
let lockers_1014 = loader.load(directory+'hall/lockers504.png');
let lockers_1018 = loader.load(directory+'hall/lockers507.jpeg');
let lockers_1020 = loader.load(directory+'hall/lockers506.png');
let lockers_1023 = loader.load(directory+'hall/lockers503.png');
let lockers_1026 = loader.load(directory+'hall/lockers502.jpeg');
let lockers_1029 = loader.load(directory+'hall/lockers501.jpeg');
let lockers_1031 = loader.load(directory+'hall/lockers500.jpeg');
let lockers_1038 = loader.load(directory+'hall/  .png');
let lockers_1041 = loader.load(directory+'hall/  .png');

//teachers' lounge
let text_1060 = loader.load(directory+'walls/tlE.jpeg');
let text_1061 = loader.load(directory+'walls/tlN.jpeg');
let text_1062 = loader.load(directory+'walls/tlW.jpeg');
let text_1063_A = loader.load(directory+'hall/hall1063.jpeg');
let text_1063_B = loader.load(directory+'walls/tlS.jpeg');

//lunchroom
let text_1064 = loader.load(directory+'walls/cafW.jpg');
let text_1065 = loader.load(directory+'walls/cafS.jpg');
let text_1066 = loader.load(directory+'walls/cafE.jpeg');

let text_1067_A = loader.load(directory+'walls/caf1067.jpeg');
let text_1067_B = loader.load(directory+'hall/stairs1067.jpeg');

let text_1068_A = loader.load(directory+'walls/caf1068.jpeg');
let text_1068_B = loader.load(directory+'hall/hall1068.jpeg');

let text_1069_A = loader.load(directory+'walls/caf1069.jpeg');
let text_1069_B = loader.load(directory+'hall/hall1069.jpeg');

let text_1070 = loader.load(directory+'hall/hall1070.jpeg');
let text_1071 = loader.load(directory+'hall/hall1071.jpeg');
let text_1072 = loader.load(directory+'hall/hall1072.jpeg');
let text_1075 = loader.load(directory+'hall/stairs1075.jpeg');
let text_1078 = loader.load(directory+'hall/stairs1078.jpeg');
let text_1079 = loader.load(directory+'hall/stairs1079.jpeg');
let text_1080 = loader.load(directory+'hall/stairs1080.jpeg');
let text_1081 = loader.load(directory+'hall/stairs1081.jpeg');
let text_1082 = loader.load(directory+'hall/stairs1082.jpeg');
let text_1083 = loader.load(directory+'hall/stairs1083.jpeg');
let text_1084 = loader.load(directory+'hall/stairs1084.jpeg');
let text_1085 = loader.load(directory+'hall/stairs1085.jpeg');
let text_1086 = loader.load(directory+'hall/stairs1086.jpeg');

let text_1077 = loader.load(directory+'hall/hall1077.jpeg');

//boys bathroom
let text_1057_B = loader.load(directory+'walls/br1057.jpeg');
let text_1087 = loader.load(directory+'walls/br1087.jpeg');
let text_1088 = loader.load(directory+'walls/br1088.jpeg');
let text_1089 = loader.load(directory+'walls/br1089.jpg');

//girls bathroom
let text_1053_B = loader.load(directory+'walls/gbr1053.jpeg');
let text_1090 = loader.load(directory+'walls/gbr1090.jpeg');
let text_1091 = loader.load(directory+'walls/gbr1091.jpeg');
let text_1092 = loader.load(directory+'walls/gbr1092.jpeg');

let text_generic = loader.load(directory+'walls/generic.jpeg');

//left, right, top, bottom, front, back
let textures = [[],
    //1001
    build_texture([0,0,0,0,0,0]),
    //1002
    build_texture([0, 0, {map: text_1002}, 0, 0, 0]),
    //1003
    build_texture([0, 0, {map: text_1003}, 0, 0, 0]),
    //1004
    build_texture([{map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}]),
    //1005
    build_texture([{map: text_1005}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}]),
    //1006
    build_texture([{map: text_1004}, {map: text_1005}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}]),
    //1007
    build_texture([{map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1005}, {map: text_1004}]),
    //1008
    build_texture([{map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1004}, {map: text_1005}]),
    //1009
    build_texture([{map: text_1009}, {map: text_1009}, {map: text_1009}, {map: text_1009}, {map: text_1009}, {map: text_1009}]),
    //1010
    build_texture([0, 0, {map: text_1010}, 0, 0, 0]),
    //1011 W
    build_texture([{map: text_1011}, 0, 0, 0, 0, 0]),
    //1012 S
    build_texture([0, 0, 0, 0, {map: text_1012_B}, {map: text_1012_A}]),
    //1013 N
    build_texture([0, 0, 0, 0, {map: text_1013_A}, {map: text_1013_B}]),
    //1014 E
    build_texture([{map: lockers_1014}, {map: text_1014}, 0, 0, 0, {map: door_1014}]),
    //1015
    build_texture([{map: text_1015}, 0, 0, 0, 0, 0]),
    //1016
    build_texture([0, 0, 0, 0, 0, {map: text_1016}]),
    //1017
    build_texture([0, 0, 0, 0, {map: text_1017_B}, {map: text_1017_A}]),
    //1018
    build_texture([{map: lockers_1018}, {map: text_1018}, 0, 0, 0, {map: door_1014}]),
    //1019
    build_texture([{map: text_1019}, 0, 0, 0, 0, 0]),
    //1020
    build_texture([{map: lockers_1020}, {map: text_1020}, 0, 0, 0, {map: door_1014}]),
    //1021
    build_texture([{map: text_1021}, 0, 0, 0, 0, 0]),
    //1022
    build_texture([0, 0, 0, 0, {map: text_1022_A}, {map: text_1022_B}]),
    //1023
    build_texture([{map: lockers_1023}, {map: text_1023}, 0, 0, 0, {map: door_1014}]),
    //1024
    build_texture([{map: text_1024}, 0, 0, 0, 0, 0]),
    //1025
    build_texture([0, 0, 0, 0, {map: text_1025_A}, {map: text_1025_B}]),
    //1026
    build_texture([{map: lockers_1026}, {map: text_1026}, 0, 0, 0, {map: door_1014}]),
    //1027
    build_texture([{map: text_1027}, 0, 0, 0, 0, 0]),
    //1028
    build_texture([0, 0, 0, 0, {map: text_1028_A}, {map: text_1028_B}]),
    //1029
    build_texture([{map: lockers_1029}, {map: text_1029}, 0, 0, 0, {map: door_1014}]),
    //1030
    build_texture([{map: text_1030}, 0, 0, 0, 0, 0]),
    //1031
    build_texture([{map: lockers_1031}, {map: text_1031}, 0, 0, 0, {map: door_1014}]),
    //1032
    build_texture([0, 0, 0, 0, {map: text_1032}, 0]),
    //1033
    build_texture([{map: text_1033}, 0, 0, 0, 0, 0]),
    //1034
    build_texture([0, 0, 0, 0, 0, {map: text_1034}]),
    //1035
    build_texture([0, {map: text_1035}, 0, 0, 0, 0]),
    //1036
    build_texture([{map: text_1036}, 0, 0, 0, 0, 0]),
    //1037
    build_texture([0, 0, 0, 0, {map: text_1037}, 0]),
    //1038
    build_texture([{map: text_1038_B}, {map: text_1038_A}, 0, 0, 0, {map: door_1014}]),
    //1039
    build_texture([{map: text_1039}, 0, 0, 0, 0, 0]),
    //1040
    build_texture([0, 0, 0, 0, 0, {map: text_1040}]),
    //1041
    build_texture([{map: text_1041_B}, {map: text_1041_A}, 0, 0, 0, {map: door_1014}]),
    //1042
    build_texture([{map: text_1042},0,  0, 0, 0, 0]),
    //1043
    build_texture([0, {map: text_1043}, 0, 0, 0, {map: door_1014}]),
    //1044
    build_texture([0, 0, 0, 0, 0, {map: text_1044}]),
    //1045
    build_texture([0, 0, 0, 0, {map: text_1045_A}, {map: text_1045_B}]),
    //1046
    build_texture([0, 0, 0, 0, {map: text_1046}, 0]),
    //1047
    build_texture([0, {map: text_1047}, 0, 0, 0, 0]),
    //1048
    build_texture([0, 0, 0, 0, {map: text_1048_B}, {map: text_1048_A}]),
    //1049
    build_texture([0, 0, 0, 0, {map: text_1049_A}, {map: text_1049_B}]),
    //1050
    build_texture([0, 0, 0, 0, 0, {map: text_1050}]),
    //1051
    build_texture([0, 0, 0, 0, 0, {map: text_1051}]),
    //1052
    build_texture([0, {map: text_1052}, 0, 0, 0, 0]),
    //1053
    build_texture([{map: text_1053_B}, {map: text_1053}, 0, 0, 0, 0]),
    //1054
    build_texture([0, {map: text_1054}, 0, 0, 0, 0]),
    //1055
    build_texture([0, {map: text_1055}, 0, 0, 0, 0]),
    //1056
    build_texture([0, {map: text_1056}, 0, 0, 0, 0]),
    //1057
    build_texture([{map: text_1057_B}, {map: text_1057}, 0, 0, 0, 0]),
    //1058
    build_texture([0, {map: text_1058}, 0, 0, 0, 0]),
    //1059
    build_texture([0, 0, 0, 0, {map: text_1059_A}, {map: text_1059_B}]),
    //1060
    build_texture([{map: text_1060}, 0, 0, 0, 0, 0]),
    //1061
    build_texture([0, 0, 0, 0, {map: text_1061}, 0]),
    //1062
    build_texture([0, {map: text_1062}, 0, 0, 0, 0]),
    //1063
    build_texture([0, 0, 0, 0, {map: text_1063_A}, {map: text_1063_B}]),
    //1064
    build_texture([{map: text_1064}, 0, 0, 0, 0, 0]),
    //1065
    build_texture([0, 0, 0, 0, 0, {map: text_1065}]),
    //1066
    build_texture([0, {map: text_1066}, 0, 0, 0, 0]),
    //1067
    build_texture([0, 0, 0, 0, {map: text_1067_A}, {map: text_1067_B}]),
    //1068
    build_texture([0, 0, 0, 0, {map: text_1068_A}, {map: text_1068_B}]),
    //1069
    build_texture([0, 0, 0, 0, {map: text_1069_A}, {map: text_1069_B}]),
    //1070
    build_texture([0, 0, 0, 0, {map: text_1070}, 0]),
    //1071
    build_texture([0, 0, 0, 0, {map: text_1071}, 0]),
    //1072
    build_texture([0, 0, 0, 0, 0, {map: text_1072}]),
    //1073
    build_texture([0, 0, 0, 0, 0, {map: text_1073}]),
    //1074
    build_texture([0, 0, 0, 0, {map: text_1074}, 0]),
    //1075
    build_texture([0, 0, 0, 0, {map: text_1075}, 0]),
    //1076
    build_texture([0, 0, {map: text_1076}, 0, 0, 0]),
    //1077
    build_texture([0, 0, 0, 0, {map: text_1077}, 0]),
    //1078
    build_texture([0, {map: text_1078}, 0, 0, 0, 0]),
    //1079
    build_texture([{map: text_1079}, 0, 0, 0, 0, 0]),
    //1080
    build_texture([0, 0, 0, 0, 0, {map: text_1080}]),
    //1081
    build_texture([0, 0, 0, 0, {map: text_1081}, 0]),
    //1082
    build_texture([0, 0, 0, 0, {map: text_1082}, 0]),
    //1083
    build_texture([{map: text_1083}, 0, 0, 0, 0, 0]),
    //1084
    build_texture([0, {map: text_1084}, 0, 0, 0, 0]),
    //1085
    build_texture([0, 0, 0, 0, {map: text_1081}, 0]),
    //1086
    build_texture([0, 0, 0, 0, 0, {map: text_1086}]),
    //1087
    build_texture([0, 0, 0, 0, {map: text_1087}, 0]),
    //1088
    build_texture([0, 0, 0, 0, 0, {map: text_1088}]),
    //1089
    build_texture([0, {map: text_1089}, 0, 0, 0, 0]),
    //1090
    build_texture([0, 0, 0, 0, {map: text_1090}, 0]),
    //1091
    build_texture([0, {map: text_1091}, 0, 0, 0, 0]),
    //1092
    build_texture([0, 0, 0, 0, 0, {map: text_1092}]),
    ];
//left, right, top, bottom, front, back

let y_vals = [0, 
  2, -7, -7, 2, 2, 2, 2, 2, 2, -7,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, -7, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2
  ];

let heights = [0, 
 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 1, 1
 ];

let widths = [1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 1, 6, 6, 1, 1, 6, 6, 1, 1, 1,
 1, 6, 1, 1, 6, 1, 1, 6, 1, 1,
 1, 7, 1, 13, 1, 1, 10, 1, 1, 9,
 1, 1, 1, 4, 3, 6, 1, 10, 7, 1,
 1, 1, 1, 1, 1, 1, 1, 1, 11, 1,
 8, 1, 8, 1, 35, 1, 6, 18, 7, 10,
 5, 11, 11, 8, 13, 1, 11, 1, 1, 7,
 7, 7, 1, 1, 3, 3, 4, 4, 1, 4,
 1, 4
];

let depths = [1, 
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 9, 1, 1, 9, 11, 1, 1, 11, 9, 9,
 9, 1, 9, 9, 1, 9, 9, 1, 9, 6,
 6, 1, 7, 1, 7, 7, 1, 6, 7, 1,
 8, 3, 12, 1, 1, 1, 7, 1, 1, 1,
 1, 12, 8, 8, 9, 9, 7, 12, 1, 6,
 1, 6, 1, 14, 1, 14, 1, 1, 1, 1,
 1, 1, 1, 1, 1, 1, 1, 4, 4, 1,
 1, 1, 4, 4, 1, 1, 1, 1, 7, 1,
 7, 1
];

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
      console.log(map[i]);
      new_map.push([map[i].substr(3)]); 
    }
    else {
      new_map[new_map.length - 1].push(solution);
    } 
  }
}

function build_texture(t) {
  for (let i = 0; i < 6; i ++) {
    if (t[i] == 0) t[i] = {map: text_generic};
  }

  return [
    new THREE.MeshBasicMaterial(t[0]), 
    new THREE.MeshBasicMaterial(t[1]), 
    new THREE.MeshBasicMaterial(t[2]), 
    new THREE.MeshBasicMaterial(t[3]), 
    new THREE.MeshBasicMaterial(t[4]), 
    new THREE.MeshBasicMaterial(t[5])];
}

function build_blocks() {
  for (let i = 0; i < new_map.length; i ++) {
    for (let j = 0; j < new_map[0].length; j ++) {

    let f = Math.floor(new_map[i][j] / 1000);
    if (f == "NaN") f = 0;

    if(new_map[i][j] % 1000 != 0) {
      let w = UNIT*block_width * widths[new_map[i][j] % 1000];
      let d = UNIT*block_length * depths[new_map[i][j] % 1000];
      let h = UNIT*block_height * heights[new_map[i][j] % 1000];
      items.push(
        {
          x: j*UNIT*block_length + w / 2, 
          y: f*UNIT*block_height + h / 2, 
          z: i*UNIT*block_width + d / 2, 
          width: w, 
          depth: d, 
          height: h, 
          material: textures[new_map[i][j] % 1000]
        });

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
       raycaster.setFromCamera( mouse, camera );
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
        console.log(cast(3))
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
    build_newmap('Current/csv/array1.csv');
    build_blocks();
    
    camera.position.set( 90, 30, 116 );
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

    let light = new THREE.PointLight(0xFFFFFF, 1, 500);
    light.position.set(10, 0, 25);
    scene.add(light);
    light = new THREE.AmbientLight(0x555555);
    scene.add(light);
        
}
        
init();