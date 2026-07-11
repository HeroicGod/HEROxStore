// ==========================
// AXERON BRIDGE
// ==========================


async function axeronCall(
command,
data={}
){



if(
window.AxeronBridge
){


return await
window.AxeronBridge.postMessage(

JSON.stringify({

command,

data

})

);


}



console.log(
"SIMULATION:",
command,
data
);



return null;


}






// ==========================
// PAGE NAVIGATION
// ==========================


const navButtons =
document.querySelectorAll(
".nav"
);



const pages =
document.querySelectorAll(
".page"
);



navButtons.forEach(
button=>{


button.onclick=()=>{


navButtons.forEach(
b=>b.classList.remove(
"active"
)
);



button.classList.add(
"active"
);



pages.forEach(
page=>{


page.classList.remove(
"active"
);



});



document
.getElementById(
button.dataset.page
)
.classList.add(
"active"
);



};



});







// ==========================
// DEVICE MONITOR
// ==========================


async function updateMonitor(){



let data =
await axeronCall(
"monitor"
);





// fallback testing


let cpu =
Math.floor(
30+
Math.random()*40
);



let gpu =
Math.floor(
50+
Math.random()*40
);



let temp =
35+
Math.floor(
Math.random()*8
);



let battery =
80+
"%";





document
.getElementById("cpu")
.innerText=
cpu+"%";



document
.getElementById("gpu")
.innerText=
gpu+"%";



document
.getElementById("temp")
.innerText=
temp+"°C";



document
.getElementById("battery")
.innerText=
battery;



if(
typeof addData==="function"
)

addData(cpu,gpu);



}



setInterval(
updateMonitor,
1500
);





// ==========================
// CAPABILITY SCAN
// ==========================


async function scanDevice(){


let result =
await axeronCall(
"capability_scan"
);



if(!result){


result={


vulkan:true,

opengl:true,

refreshRates:[
60,
90,
120
],

resolution:
"2400x1080"

};



}





let box =
document.getElementById(
"capability"
);



box.innerHTML=`

<p>
${result.vulkan?
"✓ Vulkan Supported":
"✗ Vulkan unavailable"}
</p>


<p>
${result.opengl?
"✓ OpenGL Supported":
"✗ OpenGL unavailable"}
</p>


<p>
Resolution:
${result.resolution}
</p>


`;





createRefreshButtons(
result.refreshRates
);



}





scanDevice();







// ==========================
// REFRESH BUTTON GENERATOR
// ==========================


function createRefreshButtons(
rates
){



let container =
document.getElementById(
"refreshList"
);



container.innerHTML="";



rates.forEach(
rate=>{


let btn =
document.createElement(
"button"
);



btn.innerText =
rate+"Hz";



btn.onclick=()=>{


container
.querySelectorAll(
"button"
)
.forEach(
b=>
b.classList.remove(
"active"
)
);



btn.classList.add(
"active"
);



axeronCall(
"set_refresh",
{
rate
}
);



};



container.appendChild(
btn
);



});



}








// ==========================
// PERFORMANCE PROFILE
// ==========================


document
.querySelectorAll(
"[data-profile]"
)
.forEach(
btn=>{


btn.onclick=()=>{


let parent =
btn.parentElement;



parent
.querySelectorAll(
"button"
)
.forEach(
b=>
b.classList.remove(
"active"
)
);



btn.classList.add(
"active"
);



axeronCall(
"profile",
{
mode:
btn.dataset.profile
}
);



};


});







// ==========================
// RESOLUTION APPLY
// ==========================


document
.getElementById(
"applyResolution"
)
.onclick=()=>{


let value =
document
.getElementById(
"resolution"
)
.value;



axeronCall(
"resolution",
{
preset:value
}
);



};







// ==========================
// GAME PRELOAD
// ==========================


document
.getElementById(
"preload"
)
.onclick=()=>{


axeronCall(
"preload"
);


};