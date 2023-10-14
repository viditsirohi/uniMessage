window.onbeforeunload = function () {
	window.scrollTo(0, 0);
 }

let animationTriggered = false;

// Function to start the popout animation
function startPopoutAnimation() {
const card = document.getElementById("cardbackside");
card.style.display = "block";
card.style.animation = "popout 1s ease";
card.style.WebkitAnimation = "popout 1s ease";
}

function startShakeAnimation() {
const card = document.getElementById("cardbackside");
card.style.animation = "shake 1s ease";
card.style.WebkitAnimation = "shake 1s ease";
}

function startRotateAnimation() {
const cardfr = document.getElementById("cardbackside");
cardfr.style.display = "none";
const card = document.getElementById("cardfrontside");
card.style.display = "grid";
card.style.animation = "rotate 600ms ease";
card.style.WebkitAnimation = "rotate 600ms ease";
}

// Intersection Observer callback function
function handleIntersection(entries, observer) {
entries.forEach((entry) => {
	if (entry.isIntersecting && !animationTriggered) {
		// If the element is in the viewport and the animation hasn't been triggered
		setTimeout(startPopoutAnimation, 500);
		setTimeout(startShakeAnimation, 1500);
		setTimeout(startRotateAnimation, 2500);
		setTimeout(function () {
			const card = document.getElementById("cardfrontside");
			card.style.removeProperty('animation');
		}, 3100);
		animationTriggered = true; // Mark the animation as triggered
		observer.unobserve(entry.target); // Stop observing once triggered
	}
});
}

function printName() {
var name = document.getElementById("inputname").value;
document.getElementById("printname").innerHTML = name;
}


function downloadimg() {
html2canvas(document.getElementById("cardfrontside"), {
	allowTaint: true,
	useCORS: true,
	backgroundColor: null
}).then((canvas) => {
	const base64image = canvas.toDataURL("image/png");
	var anchor = document.createElement('a');
	anchor.setAttribute("href", base64image);
	anchor.setAttribute("download", "Message.png");
	anchor.click();
	anchor.remove();
});
}

function getRndInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndMsg(jsonData) {
const rndInt = getRndInt(1, 130);
const randomMsg = jsonData[rndInt].Message;
return randomMsg;
}


function setfntsz(msg) {
	let length = msg.length;
	if(length < 30){
		size = "3em" ;
	}else if(length < 60 ){
		size = "2.8em";
	}else if(length < 90 ){
		size = "2.5em";
	}else if(length < 120 ){
		size = "2.1em";
	}else if(length < 150 ){
		size = "1.9em";
	}else{
		size = "1.7em";
	}
	document.getElementById("usermsg").style.fontSize = size;
}

function printmessage() {
fetch('./message.json', {
		method: 'GET'
	})
	.then((response) => response.json())
	.then((jsonData) => {
		const rndMsg = getRndMsg(jsonData);
		setfntsz(rndMsg);
		document.getElementById("usermsg").innerHTML = rndMsg;
		setfntsz(rndMsg);
	})
}

document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("nameform");
const body = document.body;


document.getElementById("submitbtn").addEventListener("click", function (e) {
	document.getElementById("inputname").blur();
	e.preventDefault();
	printName();
	printmessage();
	body.style.overflow = "auto";
	document.querySelector('#second').scrollIntoView({
		behavior: 'smooth',
		top: 15
	});
	const observer = new IntersectionObserver(handleIntersection);
	observer.observe(document.getElementById("second"));
});
});