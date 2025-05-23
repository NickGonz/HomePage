const userName = "Nick";

function updateClock() {
	const now = new Date();
	document.getElementById("clock").textContent = now.toLocaleString();
	
}

document.getElementById("greeting").textContent = 'welcome, ${userName}';
updateClock();
sestInterval(updateClock, 1000);
