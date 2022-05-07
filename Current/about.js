var p = document.getElementsByClassName("people");
onload = resize();
window.onresize = function() {
    p[0].style.bottom = "-25vw";
    p[1].style.bottom = "-25vw";
    p[2].style.bottom = "-25vw";
    if(window.innerHeight > window.innerWidth) {
        p[0].style.height = "60vh";
        p[0].style.width = "auto";
        p[1].style.height = "60vh";
        p[1].style.width = "auto";
        p[2].style.height = "60vh";
        p[2].style.width = "auto";
    }
    if(window.innerHeight < window.innerWidth) {
        p[0].style.width = "30vw";
        p[0].style.height = "auto";
        p[1].style.width = "30vw";
        p[1].style.height = "auto";
        p[2].style.width = "30vw";
        p[2].style.height = "auto";
    }
}

function resize() {
    p[0].style.bottom = "-25vw";
    p[1].style.bottom = "-25vw";
    p[2].style.bottom = "-25vw";
    if(window.innerHeight > window.innerWidth) {
        p[0].style.height = "60vh";
        p[0].style.width = "auto";
        p[1].style.height = "60vh";
        p[1].style.width = "auto";
        p[2].style.height = "60vh";
        p[2].style.width = "auto";
    }
    if(window.innerHeight < window.innerWidth) {
        p[0].style.width = "30vw";
        p[0].style.height = "auto";
        p[1].style.width = "30vw";
        p[1].style.height = "auto";
        p[2].style.width = "30vw";
        p[2].style.height = "auto";
    }
}

function backto() {
    location.href = "../index.html";
}