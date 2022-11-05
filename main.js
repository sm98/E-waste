TweenMax.defaultEase = Linear.easeOut;
var delay = 2000; //milliseconds
var timeoutId;
var animationIsFinished = false;
var currentDevice;

new fullpage("#fullpage", {
  //options here
  scrollHorizontally: true,
  loopHorizontal: true,

  onLeave: (origin, destination, direction, trigger) => {
    if(destination.index==0){fullpage_api.setAllowScrolling(false, 'down');
    nextbtn.classList.toggle('hide');
    prevbtn.classList.toggle('hide');
    selectbtn.classList.toggle('hide');
    
    nextbtn.disabled = false;
    prevbtn.disabled = false;
    selectbtn.disabled = false;}

    if(destination.index==1){fullpage_api.setAllowScrolling(true, 'down');}
    if(destination.index==2){fullpage_api.setAllowScrolling(true, 'down');}
    if(destination.index==3){fullpage_api.setAllowScrolling(true, 'down');}
    if(destination.index==4){fullpage_api.setAllowScrolling(true, 'down');}
    if(destination.index==5){fullpage_api.setAllowScrolling(true, 'down');}

    console.log(origin.index,destination.index,deviceno,currentDevice);

    if((origin.index==0)&&(destination.index==1)&&(deviceno==0)){animate11();}
    if((origin.index==1)&&(destination.index==2)&&(deviceno==0)){animate12();}
    if((origin.index==2)&&(destination.index==3)&&(deviceno==0)){animate13();}
    if((origin.index==3)&&(destination.index==4)&&(deviceno==0)){animate14();}
    if((origin.index==4)&&(destination.index==5)&&(deviceno==0)){animate15();}
    //rev
    if((origin.index==1)&&(destination.index==0)&&(deviceno==0)){revanimate11();}
    if((origin.index==2)&&(destination.index==1)&&(deviceno==0)){revanimate12();}
    if((origin.index==3)&&(destination.index==2)&&(deviceno==0)){revanimate13();}
    if((origin.index==4)&&(destination.index==3)&&(deviceno==0)){revanimate14();}
    if((origin.index==5)&&(destination.index==4)&&(deviceno==0)){revanimate15();}


    const prevsection = origin.item;
    const prevtext = prevsection.querySelector("p");
    const tl1 = new TimelineMax({ delay: 0.1 });
    tl1.fromTo(prevtext, 0.5, { opacity: 1 }, { opacity: 0 });

    const nextsection = destination.item;
    const nexttext = nextsection.querySelector("p");
    const tl2 = new TimelineMax({ delay: 1 });
    tl2.fromTo(nexttext, 0.5, { opacity: 0 }, { opacity: 1 });
  }
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setClearColor("#e5e5e5");

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 7.5;
camera.position.y = 0.75;
camera.rotateX(-0.25);


renderer.render(scene, camera);
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
})

var geometry = new THREE.BoxGeometry(1, 1, 1);
var mat1 = new THREE.MeshLambertMaterial({color: 0xFF9AA2});
var mat2 = new THREE.MeshLambertMaterial({color: 0xFFDAC1});
var mat3 = new THREE.MeshLambertMaterial({color: 0xE2F0CB});
var mat4 = new THREE.MeshLambertMaterial({color: 0xB5EAD7});
var mat5 = new THREE.MeshLambertMaterial({color: 0xC7CEEA});

var dev1 =new THREE.Mesh(geometry, mat1);
var dev2 =new THREE.Mesh(geometry, mat2);
var dev3 =new THREE.Mesh(geometry, mat3);
var dev4 =new THREE.Mesh(geometry, mat4);
var dev5 =new THREE.Mesh(geometry, mat5);

var piv1 = new THREE.Object3D();
var piv2 = new THREE.Object3D();
var piv3 = new THREE.Object3D();
var piv4 = new THREE.Object3D();
var piv5 = new THREE.Object3D();

dev1.position.set(0,0,5);
dev2.position.set(0,0,5);
dev3.position.set(0,0,5);
dev4.position.set(0,0,5);
dev5.position.set(0,0,5);

piv1.add(dev1);
piv2.add(dev2);
piv3.add(dev3);
piv4.add(dev4);
piv5.add(dev5);

piv1.rotation.y=0;
piv2.rotation.y=2*Math.PI/5;
piv3.rotation.y=4*Math.PI/5;
piv4.rotation.y=6*Math.PI/5;
piv5.rotation.y=8*Math.PI/5;


var mainpiv = new THREE.Object3D();

mainpiv.add(piv1);
mainpiv.add(piv2);
mainpiv.add(piv3);
mainpiv.add(piv4);
mainpiv.add(piv5);

scene.add(mainpiv);


// Lights
const light = new THREE.AmbientLight( 0xdbe9ff ); // soft white light
scene.add( light );



var render = function() {
  requestAnimationFrame(render);
  TWEEN.update();
  renderer.render(scene, camera);
}

var selectbtn=document.getElementById("select")
var nextbtn=document.getElementById("next")
var prevbtn=document.getElementById("prev")

selectbtn.addEventListener("click", selectionfunc, false);
nextbtn.addEventListener("click", rotatenext, false);
prevbtn.addEventListener("click", rotateprev, false);





function enablebtn(){
    nextbtn.disabled = false;
    prevbtn.disabled = false;
}

function disablebtn(){
    nextbtn.disabled = true;
    prevbtn.disabled = true;
}

var deviceno=0;

function rotatenext() {
    disablebtn();
    var tween = new TWEEN.Tween(mainpiv.rotation).to({ y: mainpiv.rotation.y - Math.PI/2.5}, 500).easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(function () {enablebtn();})
    .start();
    deviceno=(deviceno+1)%5;
    }

function rotateprev() {
    disablebtn();
    var tween = new TWEEN.Tween(mainpiv.rotation).to({ y: mainpiv.rotation.y + Math.PI/2.5}, 500).easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(function () {enablebtn();})
    .start();
    deviceno=(deviceno+1)%5;
}

function selectionfunc(){
  
  nextbtn.classList.toggle('hide');
  prevbtn.classList.toggle('hide');
  selectbtn.classList.toggle('hide');
  
  nextbtn.disabled = true;
  prevbtn.disabled = true;
  selectbtn.disabled = true;
  
  
  fullpage_api.moveTo('2');

  fullpage_api.setAllowScrolling(true, 'down');
}

function animate11(){
  new TWEEN.Tween({x:0,y1:0,y2:0.75,xRotation:0})
  .to({y1:-7.5,y2:-6.5,x:-1, xRotation:Math.PI/2},2000)
  .onUpdate((coords)=>{dev1.position.y=coords.y1;dev1.position.x=coords.x;dev1.rotation.x=coords.xRotation;camera.position.y=coords.y2;})
  .start();  
}
function animate12(){
  new TWEEN.Tween({x:-1,zRotation:0})
  .to({x:1, zRotation:Math.PI/2},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function animate13(){
  new TWEEN.Tween({x:1,zRotation:Math.PI/2})
  .to({x:-1, zRotation:0},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function animate14(){
  new TWEEN.Tween({x:-1,zRotation:0})
  .to({x:1, zRotation:Math.PI/2},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function animate15(){
  new TWEEN.Tween({x:1,zRotation:Math.PI/2})
  .to({x:-1, zRotation:0},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}

function revanimate11(){
  new TWEEN.Tween({x:-1,y1:-7.5,y2:-6.5,xRotation:Math.PI/2})
  .to({y1:0,y2:0.75,x:0, xRotation:0},2000)
  .onUpdate((coords)=>{dev1.position.y=coords.y1;dev1.position.x=coords.x;dev1.rotation.x=coords.xRotation;camera.position.y=coords.y2;})
  .start();  
}
function revanimate12(){
  new TWEEN.Tween({x:1, zRotation:Math.PI/2})
  .to({x:-1,zRotation:0},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function revanimate13(){
  new TWEEN.Tween({x:-1, zRotation:0})
  .to({x:1,zRotation:Math.PI/2},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function revanimate14(){
  new TWEEN.Tween({x:1, zRotation:Math.PI/2})
  .to({x:-1,zRotation:0},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}
function revanimate15(){
  new TWEEN.Tween({x:-1, zRotation:0})
  .to({x:1,zRotation:Math.PI/2},1000)
  .onUpdate((coords)=>{dev1.position.x=coords.x;dev1.rotation.z=coords.zRotation;})
  .start();
}




fullpage_api.setAllowScrolling(false, 'down');

render();