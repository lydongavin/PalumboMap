//raycasting        
        
        const FLOOR_HEIGHT = 30;
        const NUM_FLOORS = 7;
        const UNIT = .5;
        const FLOOR_MAT = {color: 0xFF0000, side: THREE.DoubleSide};
        var WALL_HEIGHT = NUM_FLOORS * FLOOR_HEIGHT;
        
        var items = [
       // [x, y, z, width, height, depth, material],
        //  [9, 15, 0, 100, 10, 1, {color: 0xFF0000, side: THREE.DoubleSide}],
          //the E
        ];

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({antialias: true});
        var velocity = new THREE.Vector3(0,0,0);
        /*
        var controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.listenToKeyEvents( window ); // optional
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		controls.dampingFactor = 0.05;
		controls.screenSpacePanning = false;
		controls.minDistance = 100;
		controls.maxDistance = 500;
		controls.maxPolarAngle = Math.PI / 2;
        */

        var rotate = 0;
        var currentX = 0;
        var lastX = 0;
        var currentY = 0;
        var lastY = 0;

        const backgroundcolor = "#00ffff";

        //First Person Controls
        var controls = new THREE.FirstPersonControls(camera)
        

        function build_floors() {
          for (let i = -1; i < NUM_FLOORS; i ++) {
            items.push([-10*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 0*UNIT, 12*UNIT, 0*UNIT, 50*UNIT, {color: 0x00FF00, side: THREE.DoubleSide}]);
            items.push([11.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, -20*UNIT, 31*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
            items.push([11.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 20*UNIT, 31*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
            items.push([8.5*UNIT, (i*FLOOR_HEIGHT-1)*UNIT, 0*UNIT, 25*UNIT, 0*UNIT, 10*UNIT, FLOOR_MAT]);
          }
        }

        function build_walls() {
          for (let i = 0; i < 5; i ++) {
            items.push([-19*UNIT, 73.5*UNIT, -1*UNIT, 5*UNIT, (WALL_HEIGHT*UNIT)+1, 50*UNIT, FLOOR_MAT]);
             //back
             items.push([3.5*UNIT, 73.5*UNIT, -26*UNIT, 50*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, FLOOR_MAT]);
            //front
            items.push([3.5*UNIT, 73.5*UNIT, 26*UNIT, 50*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, FLOOR_MAT]);
           items.push([8.5*UNIT, 73.5*UNIT, -7*UNIT, 25*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, {color: 0x0000FF, side: THREE.DoubleSide}]);
           items.push([8.5*UNIT, 73.5*UNIT, 7*UNIT, 25*UNIT, (WALL_HEIGHT*UNIT)+1, 5*UNIT, {color: 0x0000FF, side: THREE.DoubleSide}]);
          }
        }

        function init() {
            //controls
            var delta = clock.getDelta();
            controls.update(delta);
            console.log(delta) 
            //Everything else
            build_floors();
            build_walls();
            camera.position.set( 0, 20, 100 );
            camera.position.z = 50;
            renderer.setClearColor(backgroundcolor);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            window.addEventListener('resize', () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix(); 
            });
            addFeatures();
            //controls.update();
            
            //window.addEventListener('keydown', onKeyDown);
            //window.addEventListener('keyup', onKeyUp);
            //window.addEventListener('mousemove', onMouseMove);
            render();
            

        }

        function addFeatures() {

            for (let i = 0; i < items.length; i ++) {
                var geometry = new THREE.BoxGeometry(items[i][3], items[i][4], items[i][5]);
                var material = new THREE.MeshLambertMaterial(items[i][6]);
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = items[i][0];
                mesh.position.y = items[i][1];
                mesh.position.z = items[i][2];
                //material.wireframe = true;
                scene.add(mesh);
                
                
            }
            
            const color = backgroundcolor;
            const density = 0.01;
            scene.fog = new THREE.FogExp2(color, density);

            var light = new THREE.PointLight(0xFFFFFF, 1, 500);
            light.position.set(10, 0, 25);
            scene.add(light);
            var light = new THREE.AmbientLight(0x555555);
            scene.add(light);
            
        }

        var render = function () {
            requestAnimationFrame(render);
            camera.position.y += velocity.y;
            camera.position.y = Math.max(0, camera.position.y);
            //gravity
            //velocity.y -= 0.05;

            var direction = new THREE.Vector3();
            camera.getWorldDirection( direction );
            camera.position.add( direction.multiplyScalar(-velocity.z) );
            
            //camera.position.x +=
            //camera.position.z += 

            camera.rotation.y += rotate;
            rotate *= 0.95;
            camera.position.z += velocity.z;
            camera.position.x += velocity.x;

            velocity.z *= 0.95;
            velocity.x *= 0.95;
            //controls.update();

            renderer.render(scene, camera);

            //test
            //console.log(velocity.y);
        }
/*
        function onMouseMove(event) {
            if (event.buttons == 0) return;
            currentX = event.pageX;
            currentY = event.pageY;
            
            if (currentX - lastX < 0)
                rotate -= 0.001;
            if (currentX - lastX > 0)
                rotate += 0.001;

            lastX = currentX;
            lastY = currentY;
        }

        function onKeyUp(event) {
          velocity.y = 0;
        }

        function onKeyDown(event) {
            event.preventDefault();

            while (camera.rotation.y < 0) camera.rotation.y += 2*Math.PI;
            while (camera.rotation.y > 2*Math.PI) camera.rotation.y -= 2*Math.PI;

            if (event.key=='w') {
              if (camera.rotation.y > 3*Math.PI/2) {
                console.log("a");
                velocity.z += 0.1*Math.sin(camera.rotation.y - 3*Math.PI/2);
                velocity.x += 0.1*Math.cos(camera.rotation.y - 3*Math.PI/2);
              }
              else if (camera.rotation.y > Math.PI) {
                console.log("b");
                velocity.z += 0.1*Math.cos(camera.rotation.y - Math.PI);
                velocity.x -= 0.1*Math.sin(camera.rotation.y - Math.PI);
              }
              else if (camera.rotation.y > Math.PI/2) {
                console.log("c");
                velocity.z -= 0.1*Math.cos(camera.rotation.y - Math.PI/2);
                velocity.x -= 0.1*Math.sin(camera.rotation.y - Math.PI/2);
              }
              else {
                console.log("d");
                velocity.z -= 0.1*Math.sin(camera.rotation.y);
                velocity.x -= 0.1*Math.cos(camera.rotation.y);
              }
            }
            if (event.key=='s') {
              if (camera.rotation.y > 3*Math.PI/2) {
                velocity.z -= 0.1*Math.sin(camera.rotation.y);
                velocity.x -= 0.1*Math.cos(camera.rotation.y);
              }
              else if (camera.rotation.y > Math.PI) {
                velocity.z -= 0.1*Math.cos(camera.rotation.y);
                velocity.x -= 0.1*Math.sin(camera.rotation.y);
              }
              else if (camera.rotation.y > Math.PI/2) {
                velocity.z += 0.1*Math.cos(camera.rotation.y);
                velocity.x += 0.1*Math.sin(camera.rotation.y);
              }
              else {
                velocity.z += 0.1*Math.sin(camera.rotation.y);
                velocity.x += 0.1*Math.cos(camera.rotation.y);
              }
            }
            if (event.key=='a') {
                rotate += 0.01;
            }
            if (event.key=='d') {
                rotate -= 0.01;
            }
            if (event.key==' ') {//Fly Up
              velocity.y = 1.0;
                //if (camera.position.y == 0) //Only jump if on ground
                    //velocity.y = 0.5;
            }
            if (event.key== 'Shift') {//Fly Down
              velocity.y = -1.0;
            }
        }
*/



        init();