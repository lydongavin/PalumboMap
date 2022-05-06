

//continuously checks X, Y, and Z position of camera. If in position of stairwell, loads stairwell floor selection page
function stairwell() {

    if(camera.position.x <= 22 && (camera.position.z >= 280 && camera.position.z <= 330)) {
  window.open('index.html','_self');
  }
  
    if(camera.position.x >= 377 && (camera.position.z >= 279 && camera.position.z <= 330)) {
  window.open('index.html','_self');
  }
  
    if(camera.position.x <= 24 && (camera.position.z >= 1070 && camera.position.z <= 1121)) {
  window.open('index.html','_self');
  }
  
    if(camera.position.x >= 356 && (camera.position.z >= 1070 && camera.position.z <= 1111)) {
  window.open('index.html','_self');
  }
  
}
//
function init() {
    build_newmap('Current/csv/map3.csv');
    load_data('Current/csv/data3.csv');
    
    
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

init();