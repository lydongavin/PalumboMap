

//continuously checks X, Y, and Z position of camera. If in position of stairwell, loads stairwell floor selection page
function stairwell() {
  
    if((camera.position.x >= 345 && (camera.position.z >= 8 && camera.position.z <= 50)) || 
       (camera.position.x >= 342 && (camera.position.z >= 770 && camera.position.z <= 800)) || 
       (camera.position.x <= 20 && (camera.position.z >= 770 && camera.position.z <= 810)) || 
       (camera.position.x <= 25 && (camera.position.z >= 8 && camera.position.z <= 50))
      ) {
      document.getElementById("menu").style.display = "block";
  //window.open('index.html','_self');
/*  div.appendChild(img);
  document.getElementById("schoolPalumbo").innerHTML = "";*/
  }  
  else {
      document.getElementById("menu").style.display = "none";    
  }
}

//
function init() {
    build_newmap('Current/csv/map5.csv');
    load_data('Current/csv/data5.csv');
    
    
    camera.position.set( 90, 30, 116 );
    camera.rotation.y = 180*Math.PI/180;
        floor_start();

}

init();