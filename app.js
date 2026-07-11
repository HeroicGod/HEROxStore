
let cpu = 42;
let gpu = 67;
let temp = 39;
let battery = 82;



function randomUpdate(){


cpu =
Math.floor(
Math.random()*40+30
);


gpu =
Math.floor(
Math.random()*30+50
);



temp =
Math.floor(
35+
Math.random()*8
);



document.getElementById("cpu")
.innerHTML =
cpu+"%";


document.getElementById("gpu")
.innerHTML =
gpu+"%";


document.getElementById("temp")
.innerHTML =
temp+"°C";



document.getElementById("cpuBar")
.style.width =
cpu+"%";


document.getElementById("gpuBar")
.style.width =
gpu+"%";



}



setInterval(
randomUpdate,
2000
);





// button animation

document
.querySelectorAll("button")
.forEach(btn=>{


btn.onclick=function(){


this.classList.toggle(
"active"
);


}


});






// Axeron bridge placeholder

function sendAxeron(command,data){


console.log(
"Axeron Command:",
command,
data
);


/*

Nanti diganti:

Axeron.postMessage({

type:command,

data:data

})


*/


}