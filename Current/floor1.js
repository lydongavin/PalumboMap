var gotostair = false;
document.getElementById("menuback").style.transition = "all 2s";
function frontdoor() {
  if(gotostair == true) {
    document.getElementById("menuback").style.width = "6vw";
  }
  else {
    document.getElementById("menuback").style.width = "100vw";
  }
  if(gotostair == true) {
      gotostair = false;
      document.getElementById("menu").style.zIndex = "1";
  }
  else {
    setTimeout(() => {
      gotostair = true;
      document.getElementById("menu").style.zIndex = "100";
    }, 2000);
  }
}
function stairwell() {
    if((camera.position.x <= 27 && (camera.position.z >= 280 && camera.position.z <= 330)) || (camera.position.x >= 355 && (camera.position.z >= 279 && camera.position.z <= 310)) || (camera.position.x <= 24 && (camera.position.z >= 1070 && camera.position.z <= 1121)) || (camera.position.x >= 354 && (camera.position.z >= 1070 && camera.position.z <= 1111))) {
        document.getElementById("menu").style.display = "block";
    } else if(gotostair == true) {
      document.getElementById("menu").style.display = "block";
    }
    else {
        document.getElementById("menu").style.display = "none";
    }
}

function init() {
    build_newmap('Current/csv/map1.csv');
    load_data('Current/csv/data1.csv');
    camera.position.set(90, 30, 116);
    camera.rotation.y = 180 * Math.PI / 180;
    floor_start();
}
init();