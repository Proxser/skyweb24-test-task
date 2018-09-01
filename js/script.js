// Определяем коструктор класса "Calendar"
var Calendar = function (id) {

	this.date = new Date();
	// Текущая дата
	this.dateCache = this.date;
	// Сохраняем текущую дату, т.к. в дальнейшем мы будем использовать и изменять
	// "this.date", чтобы перелистывать календарные месяцы
	this.url = '/data.php';
	// URL php-сценария, который отдаёт и принимает забронированные дни
	this.calendarId = id;
	// идентификатор HTML-элемента <table> в котором будут происходить изменения
	this.bookedDays = [];
	// Список забронированных дней
	this.selectedDays = [];
	// Список выбранных дней
	this.countDayOfMonth = '';
	// Кол-во дней месяця (1-31), указанного в "this.date"
	this.countDayOfPrevMonth = '';
	// Кол-во дней в предыдущем месяце (1-31)
	this.numFirstDayOfMonth = '';
	// Номер дня недели первого дня месяца (0-6), указанного в "this.date"
	this.numLastDayOfMonth = '';
	// Номер дня недели последнего дня месяца (0-6), указанного в "this.date"
	this.namesOfMonths = ["Январь", "Февраль", "Март", "Апрель", "Май",
						  "Июнь", "Июль", "Август", "Сентябрь",
						  "Октябрь", "Ноябрь", "Декабрь"];
	// Массив с названиями месяцев, чтобы отображать в эл-те "th#month-name"
	this.calendar = '';
	// Переменная в которой будет тело календаря (то что будет в <tbody>)
	this.counter = 42;
	// Счётчик для того чтобы создать календарь форматом (7х6)
	this.getCalendar();
	// Получаем список забронированных дней, генерируем календарь на текущий месяц
	// и делаем соответствующие изменения в таблице календаря
	this.clickOnBookedButton();
	// Добавляем обработчик события при клике на кнопку "Забронировать"
};

// Функция для отправления запроса сервер и получения массива забронированных дней
Calendar.prototype.getBookedDays = function (url) {
	var bookedDays = [];

	$.ajax({
		url: url,
		method: 'GET',
		async: false,
		dataType: 'json',
		success: function (data) {
			bookedDays = data;
			console.log('Список забронированных дней успешно получен :)');
		},
		error: function (data) {
			console.log('При отправке запроса произошла ошибка, либо сервер недоступен :(');
		}
	});

	return bookedDays;
};

// Функция для подсчёта кол-ва дней месяца
Calendar.prototype.getCountDayOfMonth = function (year, month) {
	var D = new Date(year, month + 1, 0);
	return D.getDate();
};

// Функция для определения номера дня недели (Пн-Вс) первого дня месяца
Calendar.prototype.getNumFirstDayOfMonth = function (year, month) {
	var D = new Date(year, month, 1);
	return D.getDay();
};

// Функция для определения номера дня недели (Пн-Вс) последнего дня месяца
Calendar.prototype.getNumLastDayOfMonth = function (year, month) {
	var D = new Date(year, month, this.getCountDayOfMonth(year, month));
	return D.getDay();
};

// Функция для получения дней прошлого месяца (формирования в календаре 1-й строчки)
Calendar.prototype.getDaysOfPrevMonth = function () {
	// Если 1-й день месяца - не воскресенье, то заполняем 1-ю строку календаря 
	// днями прошлого месяца до N-ой (Пн-Вс или 0-6) позиции в неделе
	if (this.numFirstDayOfMonth != 0) {
		// Если 1-й день месяца - понедельник, то первую строку календаря полностью
		// (7 ячеек) заполняем днями прошлого месяца
		if (this.numFirstDayOfMonth == 1) {
			this.countDayOfPrevMonth -= 7;
			for (var i = 0; i < 7; i++) {
				this.countDayOfPrevMonth++;
				this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
				this.counter--;
			}
			this.calendar += '</tr><tr>';
		}
		else {
			this.countDayOfPrevMonth -= this.numFirstDayOfMonth - 1;
			for (var i = 1; i < this.numFirstDayOfMonth; i++) {
				this.countDayOfPrevMonth++;
				this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
				this.counter--;
			}
		}
	}
	// Если 1-й день месяца - воскресенье, то в 1-й строке календаря будет
	// 6 дней прошлого месяца
	else {
		this.countDayOfPrevMonth -= 6;
		for (var i = 0; i < 6; i++) {
			this.countDayOfPrevMonth++;
			this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
			this.counter--;
		}
	}
};

// Функция для получения дней текущего месяца 
Calendar.prototype.getDaysOfCurrentMonth = function () {
	for (var  i = 1; i <= this.countDayOfMonth; i++) {
		// Если i-ый день в цикле не сегодняшний, задаём ему соответствующий 
		// стиль и характеристику "забронированного" или "свободного" дня,
		// согласно ТЗ, иначе, если день сегодняшний и свободен, то задаём ему
		// немного иной стиль
		if (i != this.date.getDate()) {
			if (this.bookedDays.indexOf(i) != -1) {
				this.calendar += '<td class="bg-danger text-white" title="Данный день занят" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			else {
				this.calendar += '<td class="clickable" title="Данный день свободен" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			this.counter--;
		}
		else {
			if (this.bookedDays.indexOf(i) != -1) {
				this.calendar += '<td id="today" class="bg-danger text-white" title="Сегодняшний день занят" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			else {
				this.calendar += '<td id="today" class="bg-info text-white clickable" title="Сегодняшний день свободен" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			this.counter--;
		}

		// Если день выпадает на воскресенье, то делаем перевод строки,
		// закрывая предыдущую строку таблицы и открывая новую
		if (new Date(this.date.getFullYear(), this.date.getMonth(), i).getDay() == 0) {
	    	this.calendar += '</tr><tr>';
		}
	}
};

// Функция для получения дней следующего месяца 
Calendar.prototype.getDaysOfNextMonth = function () {
	for (var j = 0; 0 < this.counter; this.counter--) {
		this.calendar += '<td class="bg-light text-muted">' + ++j + '</td>';
		// Если день - воскресенье, то делаем перевод строки
		if (new Date(this.date.getFullYear(), this.date.getMonth() + 1, j).getDay() == 0) {
			this.calendar += '<tr>';
		}
	}
};

// Функция для получения тела календаря (tbody)
Calendar.prototype.getBodyOfCalendar = function () {

	// Если месяц в "this.date" явл-ся текущим, то запрашиваем у сервера список
	// забронированных дней, иначе присваиваем "this.bookedDays" пустой массив
	if ( this.date.getFullYear() == this.dateCache.getFullYear() && this.date.getMonth() == this.dateCache.getMonth() ) {
		this.bookedDays = this.getBookedDays(this.url);
	}
	else {
		this.bookedDays = [];
	}

	// Задаем начальные значения переменных
	this.countDayOfMonth = this.getCountDayOfMonth(this.date.getFullYear(), this.date.getMonth());
	this.countDayOfPrevMonth = this.getCountDayOfMonth(this.date.getFullYear(), this.date.getMonth() - 1);
	this.numFirstDayOfMonth = this.getNumFirstDayOfMonth(this.date.getFullYear(), this.date.getMonth());
	this.numLastDayOfMonth = this.getNumLastDayOfMonth(this.date.getFullYear(), this.date.getMonth());
	this.calendar = '<tr>';
	this.counter = 42;
	// Обновляем counter для того чтобы скрипт корректно работал при смене текущего
	// месяца календаря на след. или предыдущий

	// Создаем ячейки с днями предыдущего месяца
	this.getDaysOfPrevMonth();
	// Создаём ячейки с днями текущего месяца
	this.getDaysOfCurrentMonth();
	// Создаём ячейки с днями следующего месяца
	this.getDaysOfNextMonth();

	this.calendar += '</tr>';
};

// Функция добавления кликабельности свободным дням
Calendar.prototype.addClickable = function () {
	var selectedDays = this.selectedDays;

	$('.clickable').click(function () {
		// Если у данного элемента есть атрибут "data-click", то присваиваем его
		// переменной, если иначе, то "false"
		var clickable = $(this).data().click || false;

		// Если данный элемент является сегодняшним днем
		if ( 'today' == $(this).attr('id') ) {
			$(this).toggleClass('bg-success bg-info');
		}
		else {
			$(this).toggleClass('bg-success text-white');
		}

		// Если элемент не был ранее нажат, то добавляем его в массив выбранных
		// дней и присваиваем атрибуту "data-click" значение "true", если иначе,
		// то удаляем данный элемент из массива
		if (!clickable) {
			console.log(selectedDays);
			selectedDays.push( +$(this).text() );
			console.log(selectedDays);
			$(this).data('click', true);
		}
		else {
			selectedDays.splice( selectedDays.indexOf( $(this).text() ), 1);
			console.log(selectedDays);
			$(this).data('click', false);
		}

		// Если есть выбранный элемент, то делаем кнопку кликабельной
		if (selectedDays.length > 0) {
			$('#bookedButton').removeAttr('disabled').text('Забронировать');
		}
		else {
			$('#bookedButton').attr('disabled', true);
		}

		this.selectedDays = selectedDays;
	});
};

// Функция, описывающая действия при клике на кнопку "Забронировать"
Calendar.prototype.clickOnBookedButton = function() {
	var bookedDays = this.bookedDays,
		selectedDays = this.selectedDays,
		url = this.url;

	// Задаём событие на клик по кнопке "Забронировать"
	$('#bookedButton').click(function(event) {
		
		console.log(selectedDays);
		// Объединяем массивы выбранных и ранее забронированных дней
		bookedDays = bookedDays.concat(selectedDays);

		console.log(bookedDays);
		// Отсортируем массив забронированных дней, который собираемся отправить
		// на сервер POST-запросом
		bookedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});
		console.log(bookedDays);

		// Отправка AJAX запроса с данными о забронированных днях на сервер
		$.ajax({
			url: url,
			method: 'POST',
			data: {
				'bookedDays': JSON.stringify(bookedDays)
			},
			success: function () {
				console.info('Список забронированных дней успешно отправлен на сервер');
			},
			error: function () {
				console.log('Возникла ошибка :(');
			}
		});

		// Делаем кнопку не кликабельной
		$(this).text('Бронирование успешно завершено');
		$(this).attr('disabled', true);
		// Делаем стиль всех выбранныех дней "забронированными" и убираем с них
		// класс "clicked", чтобы на них не срабатывало событие "hover"
		$('.bg-success.clickable').
			attr('data-original-title', 'Данный день занят').
			toggleClass('bg-success clicked').
			addClass('bg-danger');
		// Также убираем с них и со всех кликабельных элементах календаря
		// события на клик
		$('.clickable').unbind('click');

	});

	this.bookedDays = bookedDays;
	this.selectedDays = selectedDays;
};

// Функция получения календаря и его присваивания tbody таблицы с заданным id
Calendar.prototype.getCalendar = function () {

	// Получаем тело календаря
	this.getBodyOfCalendar();

	// Присваиваем его таблице с указанным "id", а также в заголовок таблице
	// добавляем сведения о текущем месяце и годе
	$('#' + this.calendarId + ' tbody').html(this.calendar);
	$('#month-name').html(
		'<h4 class="text-white">' +
			this.namesOfMonths[this.date.getMonth()] + ' ' + this.date.getFullYear() +
		'</h4>');
	$('#month-name').data('month', this.date.getMonth());
	$('#month-name').data('year', this.date.getFullYear());

	// Инициализируем все подсказки Bootstrap на странице
	$('[data-toggle="tooltip"]').tooltip();

	// Если месяц в "this.date" равен текущему ("new Date()"), то добавляем
	// календарю кликабельность и выделяем уже забронированные дни
	if (this.date.getFullYear() == this.dateCache.getFullYear() && this.date.getMonth() == this.dateCache.getMonth()) {
		this.addClickable();
	};
};

// Функция переключения календаря с текущего месяца на прошлый
Calendar.prototype.prevMonth = function (year, month) {
	
	if ( month == this.dateCache.getMonth() &&
		 year == this.dateCache.getFullYear() ) {
		this.date = this.dateCache;
		this.getCalendar();
	}
	else {
		this.date = new Date( year, month, 1 );
		this.getCalendar();
		$('#bookedButton').attr('disabled', true);
	}
};

// Функция переключения календаря с текущего месяца на следующий
Calendar.prototype.nextMonth = function (year, month) {

	if ( year == this.dateCache.getFullYear() && month == this.dateCache.getMonth() ) {
		this.date = this.dateCache;
		this.getCalendar();
	}
	else {
		this.date = new Date( year, month, 1 );
		this.getCalendar();
		$('#bookedButton').attr('disabled', true);
	}
};

// Основная программа

var calendar = new Calendar('calendar');

// Добавление обработчиков событий для переключения месяцев календаря
$('#prevMonth').click(
	function (event) {
		calendar.prevMonth( $('#month-name').data().year, $('#month-name').data().month - 1 )
	}
);
$('#nextMonth').click(
	function (event) {
		calendar.nextMonth( $('#month-name').data().year, $('#month-name').data().month + 1 )
	}
);