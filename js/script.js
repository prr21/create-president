'use strict'

var re = /^[А-Яа-яЁё0-9 ]+$/,

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
	radioSex = document.getElementsByClassName('radio')[0],
	selectInp = document.getElementById('select'),
	bioInp = document.getElementById('bio'),

	error = document.getElementsByClassName('error-input')[0],

// Main Page
	ageDiv = document.getElementsByClassName('age')[0],
	sexDiv = document.getElementsByClassName('sex')[0],
	viewsDiv = document.getElementsByClassName('views')[0],
	bioDiv = document.getElementsByClassName('bio')[0],

	skinColor = document.getElementsByClassName('skin-color'),
	hairStyle = document.getElementsByClassName('hair-style'),
	clothesStyle = document.getElementsByClassName('clothes-style'),

// Slider's
	skinDiv = document.getElementsByClassName('skin')[0],
	hairDiv = document.getElementsByClassName('hair')[0],
	clothesDiv = document.getElementsByClassName('clothes')[0],

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

// Проверка ФИО
nameInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вводите только русские буквы';

	} else {
		let fullName = this.value.split(' ');

		if (fullName.length != 3) {
			error.style.display = 'block';
			error.textContent = 'Введите Фамилию, Имя и Отчество';
			this.classList.add('errorInp');

		} else {
			this.classList.remove('errorInp');
			error.style.display = 'none';
			this.value = null;

			for (let i = 0; i < fullName.length; i++) {
				this.value += fullName[i][0].toUpperCase() + fullName[i].slice(1) + ' ';
			}
			president.name = this.value;
		};
	};
});

// Проверка возвраста
ageInp.addEventListener('change', function(){
	if ( isNaN(+this.value) || +this.value == '' ) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Введите возвраст';

	} else if ( +this.value > 90) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вы дед';

	} else if (+this.value < 35) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вы малой';

	} else {
		this.classList.remove('errorInp');
		error.style.display = 'none';
		president.age = +this.value;
	};
});

// Установка пола
radioSex.addEventListener('click', function(event){
	if (event.target.tagName == 'INPUT') {
		president.sex = male.checked ? male.value : female.value;
		changeBody(president.sex);
	}	
}) 

// Политические взгляды
selectInp.addEventListener('change', function(){
	president.views = this.options[this.selectedIndex].value;
});

// Проверка биографии
bioInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вводите только русские буквы';

	} else if (this.value.length < 40) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Напишите биографию в более чем 40 символов';

	} else {
		this.classList.remove('errorInp');
		error.style.display = 'none';
		president.bio = this.value;
	};
});

// Сменить тело
function changeBody(body){
	var remI = 0,
		addI = 0;

	body == 'Женский' ? (remI = 1, addI = hairStyle.length + 1) : (remI = hairStyle.length + 1, addI = 1);

	for (let i = 0; i < hairStyle.length; i++) {

		skinColor[i].classList.remove('skin-color-' + (remI));
		hairStyle[i].classList.remove('hair-style-' + (remI));
		clothesStyle[i].classList.remove('clothes-style-' + (remI));

		skinColor[i].classList.add('skin-color-' + (addI));
		hairStyle[i].classList.add('hair-style-' + (addI));
		clothesStyle[i].classList.add('clothes-style-' + (addI));

		remI ++; addI ++;
	};
	changeUp()
}

// Слайдер 
customStyle.addEventListener('click', function(event){
	var e = event.target;

	if ( e.classList.contains('prev')) {
		let curClass = e.nextElementSibling.classList[0];
		let slides = document.getElementsByClassName(curClass);

		slideOn(slides, -1)

	} else if( e.classList.contains('next')) {
		let curClass = e.parentElement.childNodes[3].classList[0]
		let slides = document.getElementsByClassName(curClass);

		slideOn(slides, 1)
	}
});

// Сменить слайд
function slideOn(slides, step) {
	for (let i = 0; i < slides.length; i++) {

		if (slides[i].classList.contains('showStyle')) {
			slides[i].classList.remove('showStyle')
			var curSlide = i + step;
			break;
		};
	};

	if (curSlide <= -1) {
		curSlide = slides.length - 1;

	} else if (curSlide >= slides.length) {
		curSlide = 0;
	};

	slides[curSlide].classList.add('showStyle');
	changeUp()
};

// Переодеть президента
function changeUp() {
	var showStyle = document.getElementsByClassName('showStyle');

	for (let i = 0; i < showStyle.length; i++) {


		let num = showStyle[i].classList.value.match(/\d+/g),
			key = showStyle[i].classList[0].split('-')[0],
			person = document.getElementsByClassName(`person-${key}`)[0];

		if (key != 'skin') {
			var keySrc = `img/${key}/construct/${key}-${num}.png`

		} else {
			var keySrc = `img/${key}/${key}-${num}.png`
		}

		president[key] = `${key}-${num}.png`

		person.style.cssText = `
		display: block;
		background: url(${keySrc}) center no-repeat;
		background-size: cover;`
	};
};

ready.addEventListener('click', function(){
	var keys = 0;
	for (let key in president) {
		keys++;
	};

	if (keys < 8) {
		error.textContent = 'Введите все данные';
		error.style.display = 'block'

	} else {
		error.style.display = 'none';
	}
})