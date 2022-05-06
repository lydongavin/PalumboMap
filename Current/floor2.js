

//continuously checks X, Y, and Z position of camera. If in position of stairwell, loads stairwell floor selection page
function stairwell() {

    if(camera.position.x <= 357 && (camera.position.z >= 811 && camera.position.z <= 849)) {
  //window.open('index.html','_self');
      window.location.href = 'index.html';
  }
  
    if(camera.position.x <= 20 && (camera.position.z >= 811 && camera.position.z <= 860)) {
  //window.open('index.html','_self');
      window.location.href = 'index.html';
  }
  
    if(camera.position.x <= 21 && (camera.position.z >= 91 && camera.position.z <= 140)) {
  //window.open('index.html','_self');
      window.location.href = 'index.html';
  }
  
    if(camera.position.x >= 385 && (camera.position.z >= 100 && camera.position.z <= 150)) {
  //window.open('index.html','_self');
      window.location.href = 'index.html';
  }
}
//
function init() {
    build_newmap('Current/csv/map2.csv');
    load_data('Current/csv/data2.csv');
    
    
    camera.position.set( 90, 30, 116 );
    camera.rotation.y = 180*Math.PI/180;
        floor_start();

}

init();