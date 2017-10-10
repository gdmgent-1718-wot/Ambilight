$(function(){
    // Get a reference to the database service
    var database = firebase.database();
    var r = 255,g = 255,b = 255;
    let colorRef = database.ref('colors');
    colorRef.on('value', function(snapshot) {
        colors = snapshot.val();
        r = colors.red;
        g = colors.green;
        b = colors.blue;
        makeChange();
    });
    const picker = document.getElementById('picker');
    const preview = document.getElementById('preview');
    const controlR  = document.getElementById('rVal');
    const controlG = document.getElementById('gVal');
    const controlB =  document.getElementById('bVal');
    const numberR  = document.getElementById('rNum');
    const numberG = document.getElementById('gNum');
    const numberB =  document.getElementById('bNum');
    getControls();
    // create canvas and context objects
    const canvas = document.getElementById('picker');
    const ctx = canvas.getContext('2d');
    // drawing active image
    const image = new Image();
    let moving = true;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }
    image.src = 'images/colorwheel1.png';

    picker.addEventListener('mousemove',function(e){
    // $('#picker').mousemove(function(e) { // mouse move handler
            // get coordinates of current position
        // console.log(this);
        if(moving){
            let canvasOffset = $(canvas).offset();
            let canvasX = Math.floor(e.pageX - canvasOffset.left);
            let canvasY = Math.floor(e.pageY - canvasOffset.top);
            // get current pixel
            let imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            let pixel = imageData.data;
            r = pixel[0], g = pixel[1], b = pixel[2];
            makeChange();
            this.onclick = function () {
                moving = false;
                setTimeout(function() { moving = true; }, 2000);
            }
        }

    });
    function setPreview(red, green, blue){
        let pixelColor = "rgb("+red+", "+green+", "+blue+")";
        preview.style.backgroundColor = pixelColor;
        // $('#preview').css('backgroundColor', pixelColor);
    }
    function setControls(red, green, blue){
        controlR.value = red;
        controlG.value = green;
        controlB.value = blue;

        numberR.value = red;
        numberG.value = green;
        numberB.value = blue;
    }
    function getControls (){
        controlR.addEventListener('input', function (evt) {
            r = this.value;
            makeChange();
        });
        controlG.addEventListener('input', function (evt) {
            g = this.value;
            makeChange();
        });
        controlB.addEventListener('input', function (evt) {
            b = this.value;
            makeChange();
        });
        numberR.addEventListener('input', function (evt) {
            r = this.value;
            makeChange();
        });
        numberG.addEventListener('input', function (evt) {
            g = this.value;
            makeChange();
        });
        numberB.addEventListener('input', function (evt) {
            b = this.value;
            makeChange();
        });
    }
    function makeChange() {
        setSenseHatColorDisplay(r,g,b);
        setPreview(r,g,b);
        setControls(r,g,b);
    }
    function setSenseHatColorDisplay(red, green, blue){
        database.ref('colors').set({
            red: red,
            green: green,
            blue : blue
        });
    }


});