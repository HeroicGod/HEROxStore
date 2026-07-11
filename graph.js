const canvas =
document.getElementById(
"performanceGraph"
);


const ctx =
canvas.getContext("2d");



let cpuData=[];
let gpuData=[];



function resizeCanvas(){

canvas.width =
canvas.clientWidth * window.devicePixelRatio;


canvas.height =
canvas.clientHeight * window.devicePixelRatio;


ctx.scale(
window.devicePixelRatio,
window.devicePixelRatio
);


}


resizeCanvas();

window.onresize =
resizeCanvas;





function addData(cpu,gpu){


cpuData.push(cpu);

gpuData.push(gpu);



if(cpuData.length>50){

cpuData.shift();

gpuData.shift();

}



draw();


}







function draw(){


let w =
canvas.clientWidth;


let h =
canvas.clientHeight;



ctx.clearRect(
0,
0,
w,
h
);




drawLine(
cpuData,
h,
"#9b4dff"
);



drawLine(
gpuData,
h,
"#ffffff"
);



}





function drawLine(data,height,color){



ctx.beginPath();


data.forEach(
(value,index)=>{


let x =
index *
(canvas.clientWidth /
50);



let y =
height -
(value/100*
height);



if(index===0)

ctx.moveTo(x,y);


else

ctx.lineTo(x,y);



});



ctx.strokeStyle=color;

ctx.lineWidth=2;


ctx.stroke();



}