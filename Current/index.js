var open = document.getElementsByClassName("mouse_move");

function enter() {
  document.getElementById("fronts").style.transition = "all 6s";
  document.getElementById("fronts").innerHTML = "";
  fadeOut(document.getElementById("fronts"));
  setTimeout(() => {  document.getElementById("fronts").style.display = "none"; }, 3000);
  stairs();

}

function stairs() {
  document.getElementById("openn").style.opacity = 0;
  document.getElementById("openn").style.zIndex = "3";
  setTimeout(() => {  fadeIns(document.getElementById("openn")); }, 500);
  setTimeout(() => {  document.getElementById("openn").style.zIndex = "7000"; }, 3000);
}

function fadeIn(img) {
    img.style.opacity = 0;
    var tick = function () {
        img.style.opacity = +img.style.opacity + 0.01;
        if (+img.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 100);
        }
    };
    tick();
}

function fadeIns(img) {
    img.style.opacity = 0;
    var tick = function () {
        img.style.opacity = +img.style.opacity + 0.004;
        if (+img.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 100);
        }
    };
    tick();
}

function fadeOut(img) {
    img.style.opacity = 1;
    var tick = function () {
        img.style.opacity = +img.style.opacity - 0.3;
        if (+img.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10000)
        }  
    };
    tick();

}