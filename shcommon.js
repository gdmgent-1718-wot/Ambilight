
var colorred = 255;  
var colorblue = 90;  
var colorgreen = 90;  
  
function slideRed(newvalue){  
    document.getElementById("colordisplay").style.background="rgb("+newvalue+","+colorgreen+","+colorblue+")";  
    document.getElementById("redvaluelabel").innerHTML=newvalue;  
    colorred = newvalue;  
}  
  
function slideGreen(newvalue){  
    document.getElementById("colordisplay").style.background="rgb("+colorred+","+newvalue+","+colorblue+")";  
    document.getElementById("greenvaluelabel").innerHTML=newvalue;  
    colorgreen = newvalue;  
}  
  
function slideBlue(newvalue){  
    document.getElementById("colordisplay").style.background="rgb("+colorred+","+colorgreen+","+newvalue+")";  
    document.getElementById("bluevaluelabel").innerHTML=newvalue;  
    colorblue = newvalue;  
}  
  
function setSenseHatColorDisplay(){  
var colorstring = colorred+"|"+colorgreen+"|"+colorblue;  
var req = new XMLHttpRequest();  
req.onreadystatechange = function() {  
        if (this.readyState == 4 && this.status == 200) {  
            document.getElementById("outputarea").innerHTML = this.responseText;  
        }  
    };  
req.open("POST","/code/sendColor.py",true);  
req.send(colorstring);  
  
}  