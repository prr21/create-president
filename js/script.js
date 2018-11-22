'use strict'

var re = /^[А-Яа-яЁё ]+$/,

// Btn's
	create = document.getElementById('popup-btn'),
	reset = document.getElementById('reset'),
	voting = document.getElementById('voting'),
	ready = document.getElementById('ready'),
	crime = document.getElementById('crime'),
	overlay = document.getElementsByClassName('overlay')[0],

// Customization
	custom = document.getElementsByClassName('custom')[0],
	customInfo = document.getElementsByClassName('custom-info')[0],
	customChar = document.getElementsByClassName('custom-char')[0],
	customStyle = document.getElementsByClassName('custom-style')[0],
	main = document.getElementsByClassName('main')[0],

// Input's
	nameInp = document.getElementById('name'),
	ageInp = document.getElementById('age'),
	radio = document.getElementsByClassName('radio')[0],
	selectInp = document.getElementById('select'),
	bioInp = document.getElementById('bio'),

// Main Page
	ageDiv = document.getElementsByClassName('age')[0],
	sexDiv = document.getElementsByClassName('sex')[0],
	viewsDiv = document.getElementsByClassName('views')[0],
	bioDiv = document.getElementsByClassName('bio')[0],

// Slider's
	skinDiv = document.getElementsByClassName('skin')[0],
	hairDiv = document.getElementsByClassName('hair')[0],
	clothesDiv = document.getElementsByClassName('clothes')[0],

// Person style's
	personSkin = document.getElementById('person-skin'),
	personHair = document.getElementById('person-hair'),
	personShoes = document.getElementById('person-shoes'),

	president = {};

// перенаправление к созданию президента
create.onclick = function() {
	main.style.display = 'none';
	overlay.classList.add('fadeOutDown');

	custom.style.display = 'flex';
	customInfo.style.display = 'block';
	customStyle.style.display = 'block';
	customChar.style.display = 'block';
};

// Проверка введенных данных
nameInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		alert('Вводите только русские буквы')

	} else {
		let fullName = this.value.split(' ');

		if (fullName.length != 3) {
			alert('Введите Фамилию, Имя и Отчество')
			this.classList.add('errorInp');

		} else {
			this.classList.remove('errorInp');
			this.value = null;

			for (let i = 0; i < fullName.length; i++) {
				this.value += fullName[i][0].toUpperCase() + fullName[i].slice(1) + ' ';
			}
			president.name = this.value;
		};
	};
});

ageInp.addEventListener('change', function(){
	if ( isNaN(+this.value) || +this.value == '' ) {
		this.classList.add('errorInp');
		alert('Введите возвраст')

	} else if ( +this.value > 90) {
		this.classList.add('errorInp');
		alert('Вы дед')	

	} else if (+this.value < 35) {
		this.classList.add('errorInp');
		alert('Вы малой')

	} else {
		this.classList.remove('errorInp');
		president.age = +this.value;
	};
});

radio.addEventListener('click', function(event){
	if (event.target.tagName == 'INPUT') {
		president.sex = male.checked ? male.value : female.value;
	}	
}) 

selectInp.addEventListener('change', function(){
	president.views = this.options[this.selectedIndex].value;
});

bioInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		alert('Вводите только русские буквы')

	} else if (this.value.length < 40) {
		this.classList.add('errorInp');
		alert('Напишите биографию в более чем 40 символов');

	} else {
		this.classList.remove('errorInp');
		president.bio = this.value;
	};
});

// Слайдер 
customStyle.addEventListener('click', function(event){
	var e = event.target;

	if ( e.classList.contains('prev')) {
		let curClass = e.nextElementSibling.classList[0];
		let slides = document.getElementsByClassName(curClass);
		let img = curClass.split('-')[0];

		slideOn(slides, -1, img)

	} else if( e.classList.contains('next')) {
		let curClass = e.parentElement.childNodes[3].classList[0]
		let slides = document.getElementsByClassName(curClass);
		let img = curClass.split('-')[0];
		slideOn(slides, 1, img)
	}
});

function slideOn(slides, step, img) {
	console.log(img)
	for (let i = 0; i < slides.length; i++) {

		if (slides[i].style.display != 'none') {
			slides[i].style.display = 'none'			
			var curSlide = i + step;

		} else slides[i].style.display = 'none';
	};

	if (curSlide <= -1) {
		curSlide = slides.length - 1;

	} else if (curSlide >= slides.length) {
		curSlide = 0;
	};

	slides[curSlide].style.display = 'block';
};
