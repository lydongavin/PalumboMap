

//continuously checks X, Y, and Z position of camera. If in position of stairwell, loads stairwell floor selection page
function stairwell() {

    if((camera.position.x <= 27 && (camera.position.z >= 280 && camera.position.z <= 330)) || 
      (camera.position.x >= 355 && (camera.position.z >= 279 && camera.position.z <= 310)) ||
      (camera.position.x <= 24 && (camera.position.z >= 1070 && camera.position.z <= 1121)) ||
      (camera.position.x >= 354 && (camera.position.z >= 1070 && camera.position.z <= 1111)) ) {
  //window.open('index.html','_self');
      window.location.href = 'index.html';
  }

}

//
function init() {
    build_newmap('Current/csv/map4.csv');
    load_data('Current/csv/data4.csv');
    
    
    camera.position.set( 99, 30, 310 );
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