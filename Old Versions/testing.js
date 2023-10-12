        var items = [
       // [x, y, z, width, height, depth, material],
        //  [9, 15, 0, 100, 10, 1, {color: 0xFF0000, side: THREE.DoubleSide}],
          //entrance
          [-35, 0, 0, 60, 30, 1, {color: 0xFF0000, side: THREE.DoubleSide}],
          [13, 0, 0, 20, 30, 1, {color: 0xFF0000, side: THREE.DoubleSide}],
            
          [-10,0,-15, 1, 50, 30, {color: 0x0000ff, side: THREE.DoubleSide}],
          [-10,0,-60, 1, 50, 30, {color: 0x0000ff, side: THREE.DoubleSide}],
          [10,0,-35, 1, 50, 100, {color: 0x0000ff, side: THREE.DoubleSide}],
          
          //Aud walls
          [-65,0,-45, 1, 30, 120, {color: 0xFF0000, side: THREE.DoubleSide}],

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

        function init() {
            console.log("xd");
            camera.position.set( 0, 20, 100 );
            camera.position.z = 5;
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
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('mousemove', onMouseMove);
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
            
            geometry = new THREE.PlaneGeometry( 200000, 100000);
            material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
            mesh = new THREE.Mesh( geometry, material );
            mesh.rotation.x += Math.PI / 2;
            mesh.position.y = -1;
            scene.add( mesh ); 
            
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
            
            camera.rotation.y += rotate;
            rotate *= 0.95;
            camera.position.z += velocity.z;
            camera.position.x += velocity.x;

            velocity.z *= 0.95;
            velocity.x *= 0.95;
            //controls.update();

            renderer.render(scene, camera);

            //console log
            console.log(camera.position)
        }

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

        function onKeyDown(event) {
            //event.preventDefault();
            if (event.key=='w') {
                velocity.z -= 0.1;
                console.log(velocity.z);
            }
            if (event.key=='s') {
                velocity.z += 0.1;
                console.log(velocity.z);
            }
            if (event.key=='a') {
                rotate += 0.01;
                console.log(rotate);
            }
            if (event.key=='d') {
                rotate -= 0.01;
                console.log(rotate);
            }
            if (event.key==' ') {
                if (camera.position.y == 0)
                    velocity.y = 0.5;
            }
        }

        init();