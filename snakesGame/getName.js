  var name = '';
	function captureName() {
	while (name == '' || name == null) {
	  name = prompt('What is your name? ');
	}
	
		alert('Welcome! ' + name + ', Click ok to start the game');
		var greeting = document.getElementById('greet');
		greeting.innerHTML = 'Player: ' + name;
    
  }
  window.onload = captureName();