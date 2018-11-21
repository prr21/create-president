'use strict'

var create = document.getElementById('popup-btn'),
	reset = document.getElementById('reset'),
	voting = document.getElementById('voting'),
	ready = document.getElementById('ready'),
	crime = document.getElementById('crime'),
	overlay = document.getElementsByClassName('overlay')[0],

	custom = document.getElementsByClassName('custom')[0],
	customInfo = document.getElementsByClassName('custom-info')[0],
	customChar = document.getElementsByClassName('custom-char')[0],
	customStyle = document.getElementsByClassName('custom-style')[0],
	main = document.getElementsByClassName('main')[0],

	nameValue = document.getElementById('name'),
	ageValue = document.getElementById('age'),
	maleValue = document.getElementById('male'),
	femaleValue = document.getElementById('female'),
	selectValue = document.getElementById('select'),
	bioValue = document.getElementById('bio'),

	age = document.getElementsByClassName('age')[0],
	sex = document.getElementsByClassName('sex')[0],
	views = document.getElementsByClassName('views')[0],
	bio = document.getElementsByClassName('bio')[0];


create.onclick = function() {
	main.classList.add('hide');
	overlay.classList.add('fadeOutDown');

	custom.style.display = 'flex';
	customInfo.style.display = 'block';
	customStyle.style.display = 'block';
	customChar.style.display = 'block';
};

var sex = function(){
	return male.checked ? male.value : female.value;
}

var president = {};

ready.addEventListener('click', function(){
	president.name = nameValue.value;
	president.age = ageValue.value;
	president.sex = sex();
	president.views = selectValue.options[selectValue.selectedIndex].value;
	president.bio = bioValue.value;
	console.log(president)
});

// ready.addEventListener('click', function(){

// });

