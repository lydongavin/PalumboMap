function stairwell() {
    if((camera.position.x <= 27 && (camera.position.z >= 280 && camera.position.z <= 330)) || (camera.position.x >= 355 && (camera.position.z >= 279 && camera.position.z <= 310)) || (camera.position.x <= 24 && (camera.position.z >= 1070 && camera.position.z <= 1121)) || (camera.position.x >= 354 && (camera.position.z >= 1070 && camera.position.z <= 1111))) {
        div.appendChild(img);
        //window.location.replace("index.html");
        document.getElementById("menu").style.display = "block";
    } else {
        document.getElementById("menu").style.display = "none";
    }
}

function init() {
    build_newmap('Current/csv/map5.csv');
    load_data('Current/csv/dummy.csv');
    camera.position.set(90, 30, 116);
    camera.rotation.y = 180 * Math.PI / 180;
    floor_start();
}
init();