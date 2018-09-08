// Получаем список забронированных дней от сервера
function getBookedDays() {

	var url = $('#bookedForm').attr('action');

	$.ajax({
		url: url,
		method: 'GET',
		async: false,
		dataType: 'json',
		context: $('input[name="bookedDays"]'),
		success: function (data) {
			$(this).val(JSON.stringify(data));
			console.log('Список забронированных дней успешно получен :)');
		},
		error: function (data) {
			console.log('При отправке запроса произошла ошибка, либо сервер недоступен :(');
		}
	});
};

// Функция добавления кликабельности свободным дням
function addClickable() {

	$('.clickable').click(function (event) {
		var selectedDays = [],
			bookedDays = [],
			clicked = $(this).data().clicked || false;
		// Если в input[name='selectedDays'] имеется JSON-массив, то парсим его
		// в локульную переменную "selectedDays"
		if ($('input[name="selectedDays"]').val() !== '') {
			selectedDays = JSON.parse( $('input[name="selectedDays"]').val() );
		}
		// Если в input[name='bookedDays'] имеется JSON-массив, то парсим его
		// в локульную переменную "bookedDays"
		if ($('input[name="bookedDays"]').val() !== '') {
			bookedDays = JSON.parse( $('input[name="bookedDays"]').val() );
		}
		// Если выбранный элемент календаря явл-ся сегодняшним днём
		if ( 'today' == $(this).attr('id') ) {
			$(this).toggleClass('bg-success bg-info');
		} else {
			$(this).toggleClass('bg-success text-white');
		}
		// Если элемент ранее не был кликнут
		if (!clicked) {
			selectedDays.push( +$(this).text() );
			bookedDays.push( +$(this).text() );
			$(this).data('clicked', true);
		} else {
			selectedDays.splice( selectedDays.indexOf( +$(this).text() ), 1);
			bookedDays.splice( bookedDays.indexOf( +$(this).text() ), 1);
			$(this).data('clicked', false);
		}
		// Если длина массива выбранных дней больше нуля, делаем кнопку активной
		if (selectedDays.length > 0) {
			$('#bookedButton').removeAttr('disabled').text('Забронировать');
		} else {
			$('#bookedButton').attr('disabled', true);
		}
		// Сортируем массивы "bookedDays" и "selectedDays"
		bookedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});
		selectedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});

		console.log(bookedDays);
		console.log(selectedDays);
		// Присваиваем соответствующим input'ам эти массивы, предварительно
		// Преобразовав их в JSON
		$('input[name="bookedDays"]').val(JSON.stringify(bookedDays));
		$('input[name="selectedDays"]').val(JSON.stringify(selectedDays));
	});
};

// Функция, описывающая действия при клике на кнопку "Забронировать"
function clickOnBookedButton() {
	var bookedDays,
		url = $('#bookedForm').attr('action');

	// Задаём событие на клик по кнопке "Забронировать"
	$( "#bookedButton" ).click(function( event ) {
		
		if (confirm('Вы уверены?')) {
			bookedDays = $('input[name="bookedDays"]').val();
			$.ajax({
				url: url,
				method: 'POST',
				data: {
					'bookedDays': bookedDays
				},
				success: function () {
					$('#bookedButton').text('Бронирование успешно завершено');
					$('#bookedButton').attr('disabled', true);
					$('.bg-success.clickable').
						attr('data-original-title', 'Данный день занят').
						toggleClass('bg-success clicked').
						addClass('bg-danger');
					$('.clickable').unbind('click');
					console.info('Список забронированных дней успешно отправлен на сервер');
				},
				error: function () {
					alert('Не удалось отправить данные на сервер :(');
					console.log('Возникла ошибка :(');
				}
			});
		}
	});
};

// Генерируем календарь на текущий месяц с забронированными днями
function getCalendar(date, id) {

	var countDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
		countDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
		lastMondayOfPrevMonth,
		numFirstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
		numLastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), countDayOfMonth).getDay(),
		namesOfMonths = ["Январь", "Февраль", "Март", "Апрель", "Май",
						  "Июнь", "Июль", "Август", "Сентябрь",
						  "Октябрь", "Ноябрь", "Декабрь"],
		calendar = $('#' + id + ' tbody td'),
		bookedDays = [],
		counter = 0,
		// Шаблоны атрибутов для различных типов дней
		freeDayTemplate = {
			'class': 'clickable',
			'title': 'Данный день свободен',
			'data-toggle': 'tooltip',
			'data-placement': 'bottom'
		},
		bookedDayTemplate = {
			'class': 'bg-danger text-white',
			'title': 'Данный день занят',
			'data-toggle': 'tooltip',
			'data-placement': 'bottom'
		},
		freeTodayTemplate = {
			'id': 'today',
			'class': 'bg-info text-white clickable',
			'title': 'Сегодняшний день свободен',
			'data-toggle': 'tooltip',
			'data-placement': 'bottom'
		},
		bookedTodayTemplate = {
			'id': 'today',
			'class': 'bg-danger text-white',
			'title': 'Сегодняшний день занят',
			'data-toggle': 'tooltip',
			'data-placement': 'bottom'
		};

	if (numFirstDayOfMonth != 0) {
		if (numFirstDayOfMonth == 1) {
			lastMondayOfPrevMonth = countDayOfPrevMonth - 6;
		} else {
			lastMondayOfPrevMonth = countDayOfPrevMonth - (numFirstDayOfMonth - 2);
		}
	} else {
		lastMondayOfPrevMonth = countDayOfPrevMonth - 5;
	}

	console.group('Информация об инициализации переменных в getCalendar()');
	console.log('Кол-во дней пред. месяца: ', countDayOfPrevMonth);
	console.log('Кол-во дней текущего месяца: ', countDayOfMonth);
	console.log('Последний понедельник пред. месяца: ', lastMondayOfPrevMonth);
	console.log('Номер дня недели (0-6) первого дня месяца: ', numFirstDayOfMonth);
	console.log('Номер дня недели (0-6) последнего дня месяца: ', numLastDayOfMonth);
	console.log('Объект #' + id + ': ', calendar);
	console.log('Список забронированных дней: ', bookedDays);
	console.groupEnd();

	if ( date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() ) {
		bookedDays = JSON.parse( $('input[name="bookedDays"]').val() );
	} else {
		bookedDays = [];
	}

	console.group('Генерация календаря по указанному в \'date\' месяцу: ', namesOfMonths[date.getMonth()], date.getFullYear());

	console.log('Дни прошлого месяца сгенерированы');

	for (var i = 0; lastMondayOfPrevMonth <= countDayOfPrevMonth; i++, lastMondayOfPrevMonth++, counter++) {
		$(calendar[i]).removeClass().addClass('bg-light text-muted').text(lastMondayOfPrevMonth);
	}

	console.log('Дни текущего месяца сгенерированы');

	for (i = 1; i <= countDayOfMonth; i++, counter++) {
		if (i != date.getDate()) {
			if (bookedDays.indexOf(i) != -1) {
				$(calendar[counter]).attr(bookedDayTemplate).text(i).data('clicked', false);
			} else {
				$(calendar[counter]).attr(freeDayTemplate).text(i).data('clicked', false);
			}
		} else {
			if (bookedDays.indexOf(i) != -1) {
				$(calendar[counter]).attr(bookedTodayTemplate).text(i).data('clicked', false);
			} else {
				$(calendar[counter]).attr(freeTodayTemplate).text(i).data('clicked', false);
			}
		}
	}

	console.log('Дни следующего месяца сгенерированы');

	for (i = 1; counter < calendar.length; i++, counter++) {
		$(calendar[counter]).removeClass().addClass('bg-light text-muted').text(i);
	}

	console.groupEnd();

	$('#month-name').html(
	'<h4 class="text-white">' +
		namesOfMonths[date.getMonth()] + ' ' + date.getFullYear() +
	'</h4>');
	$('#month-name').data('month', date.getMonth());
	$('#month-name').data('year', date.getFullYear());

	// Инициализируем все подсказки Bootstrap на странице
	$('[data-toggle="tooltip"]').tooltip();

	if ( date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() ) {
		addClickable();
	} else {
		$('.clickable').unbind('click');
	}
};

// Функция переключения календаря с текущего месяца на прошлый или следующий
function changeMonth(year, month) {
	var selectedDays = [],
		bookedDays = [],
		bookedButton = $('#bookedButton').text();

	// Если не было совершено бронирование, то чистим "input[name=selectedDays]"
	// и "input[name=bookedDays]" от выбранных пользователем дней
	if ( bookedButton != 'Бронирование успешно завершено' ) {
		// Если в input[name='selectedDays'] имеется JSON-массив, то парсим его
		// в локульную переменную "selectedDays"
		if ($('input[name="selectedDays"]').val() !== '') {
			selectedDays = JSON.parse( $('input[name="selectedDays"]').val() );
		}
		// Если в input[name='bookedDays'] имеется JSON-массив, то парсим его
		// в локульную переменную "bookedDays"
		if ($('input[name="bookedDays"]').val() !== '') {
			bookedDays = JSON.parse( $('input[name="bookedDays"]').val() );
		}
		// Удаляем все выбранные дни из bookedDays
		for (var i = 0; i < selectedDays.length; i++) {
			bookedDays.splice( bookedDays.indexOf( selectedDays[i] ), 1);
		}

		bookedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});

		$('input[name="selectedDays"]').val('');
		$('input[name="bookedDays"]').val(JSON.stringify(bookedDays));
	}
	// Если переданы текущий месяц текущего года, то получаем календарь с
	// сегодняшней датой "new Date()", иначе с переданной в параметрах функции
	// "year" и "month" и 1-ым числом переданного месяца, также делаем кнопку
	// "Забронировать" неактивной
	if ( month == new Date().getMonth() && year == new Date().getFullYear() ) {
		getCalendar(new Date(), 'calendar');
	} else {
		getCalendar(new Date(year, month, 1), 'calendar');
		$('#bookedButton').attr('disabled', true);
	}
};


$(document).ready(function () {
	getBookedDays();
	getCalendar(new Date(), 'calendar');
	clickOnBookedButton();

	// Добавление обработчиков событий для переключения месяцев календаря
	$('#prevMonth').click(
		function (event) {
			changeMonth( $('#month-name').data().year, $('#month-name').data().month - 1 )
		}
	);
	$('#nextMonth').click(
		function (event) {
			changeMonth( $('#month-name').data().year, $('#month-name').data().month + 1 )
		}
	);
});