let results = document.getElementById("results");
 
let pElems = document.getElementsByTagName("p");  
results.innerHTML += "\nQtd parágrafos: " + pElems.length;
 
let fruitsElems = document.getElementsByClassName("fruta");  
results.innerHTML += "\nQtd frutas: " + fruitsElems.length;
