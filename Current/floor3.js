//continuously checks X, Y, and Z position of camera. If in position of stairwell, loads stairwell floor selection page
function stairwell() {
    if((camera.position.x <= 22 && (camera.position.z >= 280 && camera.position.z <= 330)) || (camera.position.x >= 377 && (camera.position.z >= 279 && camera.position.z <= 330)) || (camera.position.x <= 24 && (camera.position.z >= 1070 && camera.position.z <= 1121)) || (camera.position.x >= 356 && (camera.position.z >= 1070 && camera.position.z <= 1111))) {
        document.getElementById("menu").style.display = "block";
    } else {
        document.getElementById("menu").style.display = "none";
    }
}
//
function init() {
    build_newmap('Current/csv/map3.csv');
    load_data('Current/csv/data3.csv');
    camera.position.set(90, 30, 116);
    camera.rotation.y = 180 * Math.PI / 180;
    floor_start();
}
init();