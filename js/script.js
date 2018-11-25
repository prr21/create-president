'use strict'

var re = /^[А-Яа-яЁё 0-9]+$/,

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
	viewsInp = document.getElementById('select'),
	bioInp = document.getElementById('bio'),

	error = document.getElementsByClassName('error-input')[0],

// Main Page
	looks = ['skin-color', 'hair-style', 'clothes-style'],

// Slider's
	skinDiv = document.getElementsByClassName('skin')[0],
	hairDiv = document.getElementsByClassName('hair')[0],
	clothesDiv = document.getElementsByClassName('clothes')[0],

// Cards
	mainCards = document.getElementsByClassName('main-cards')[0],
	cardItem = document.getElementsByClassName('main-cards-item')[0],

	fails = [nameInp, ageInp, radioSex, viewsInp, bioInp],
	candidant = {
		sex: male.checked ? male.value : female.value,
		look: {}
	};

// перенаправление к созданию президента
create.onclick = function() {
	main.style.display = 'none';
	overlay.classList.add('fadeOutDown');

	custom.style.display = 'flex';
	customInfo.style.display = 'block';
	customStyle.style.display = 'block';
	customChar.style.display = 'block';
};

// Удаление ошибки
function removeFail(){
	let index = fails.indexOf(this);
	if(index != -1) fails.splice(index, 1);;
}

// Добавление ошибки
function addFail(){
	let index = fails.indexOf(this);
	if(index == -1) fails.push(this);
}

// Проверка ФИО
nameInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вводите только русские буквы';

		addFail.call(this)

	} else {
		this.classList.remove('errorInp');
		error.style.display = 'none';
		
		removeFail.call(this);
		candidant.name = this.value;
	};
});

// Проверка возвраста
ageInp.addEventListener('change', function(){
	if ( isNaN(+this.value) || +this.value == '' ) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Введите возвраст';

		addFail.call(this)

	} else if ( +this.value > 90) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вы дед';

		addFail.call(this)

	} else if (+this.value < 35) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вы малой';

		addFail.call(this)

	} else {
		this.classList.remove('errorInp');
		error.style.display = 'none';

		removeFail.call(this);
		candidant.age = +this.value;
	};
});

// Установка пола
radioSex.addEventListener('click', function(event) {
	if (event.target.tagName == 'INPUT') {
		candidant.sex = male.checked ? male.value : female.value;

		this.classList.remove('errorInp');
		removeFail.call(this);
		changeBody(candidant.sex);
	}	
}) 

// Политические взгляды
viewsInp.addEventListener('change', function(){
	candidant.views = this.options[this.selectedIndex].value;

	this.classList.remove('errorInp');
	removeFail.call(this);
});

// Проверка биографии
bioInp.addEventListener('change', function(){
	if ( !re.test(this.value) || this.value == '') {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Вводите только русские буквы';

		addFail.call(this)

	} else if (this.value.length < 40) {
		this.classList.add('errorInp');
		error.style.display = 'block';
		error.textContent = 'Напишите биографию в более чем 40 символов';

		addFail.call(this)

	} else {
		this.classList.remove('errorInp');
		error.style.display = 'none';

		removeFail.call(this);
		candidant.bio = this.value;
	};
});

// Сменить тело
function changeBody(body){
	for (let i = 0; i < looks.length; i++){
		let partLook =  document.getElementsByClassName(looks[i]);
		var remI = 0, addI = 0;

		if (body == 'Женский') {
			remI = 1; addI = partLook.length + 1;

		} else {
			remI = partLook.length + 1; addI = 1;
		};

		for (let j = 0; j < partLook.length; j++) {

			partLook[j].classList.remove(looks[i] + '-' + (remI));
			partLook[j].classList.add(looks[i] + '-' + (addI));
			remI ++; addI ++;
		};
	};
	changeUp();
}

// Слайдер 
customStyle.addEventListener('click', (event) => {
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

		} else {
			curSlide = 1;
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

		person = person.style.cssText = `display: block; background: url(${keySrc}) center center / cover no-repeat;`

		candidant.look[key] = person;
	};
};

// Создать карточку своего кандидата
function createCard(obj){
	let newCardItem = cardItem.cloneNode(true),
		photo = newCardItem.getElementsByClassName('photo')[0],
		name = newCardItem.getElementsByClassName('name')[0],
		age = newCardItem.getElementsByClassName('age')[0],
		sex = newCardItem.getElementsByClassName('sex')[0],
		views = newCardItem.getElementsByClassName('views')[0],
		bio = newCardItem.getElementsByClassName('bio')[0];

		photo.classList.remove('photo-1');
		photo.classList.add('photo', 'person', 'construct');

		for (let key in obj.look) {
			let div = document.createElement('div');

			div.style.cssText = obj.look[key];
			div.classList.add(`person-${key}`)
			photo.appendChild(div);
		};

		name.textContent = candidant.name;
		age.textContent = candidant.age + ' лет';
		sex.textContent = candidant.sex;
		views.textContent = candidant.views;
		bio.textContent = candidant.bio;

	mainCards.appendChild(newCardItem);
}

ready.onclick = function(){
	var keys = 0,
		lookKey = 0;

	for (let key in candidant) {
		keys++;
	};
	for (let key in candidant.look) {
		lookKey++;
	}

	if (false) {
		for (var i = 0; i < fails.length; i++) {
			fails[i].classList.add('errorInp');
		};

		error.innerHTML = 'Введите корректно все данные';
		error.style.display = 'block'

	} else if (lookKey < 3) {
		error.innerHTML = 'Кандидант не может выступать в таком виде!';
		error.style.display = 'block'

	} else {
		error.style.display = 'none';

		customInfo.style.display = ' none';
		custom.style.display = ' none';
		customStyle.style.display = ' none';
		customChar.style.display = ' none';

		main.style.display = '';

		createCard(candidant);	
	};
};
