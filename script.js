var Calendar = function () {

	this.date = new Date();
	// Текущая дата
	this.url = 'http://skyweb24.loc/data.php';
	// URL php-сценария, который отдаёт и принимает забронированные дни
	this.bookedDays = this.getBookedDays(this.url);
	// Забронированные дни
	this.selectedDays = [];
	// Выбранные дни
	this.countDayOfMonth = this.getCountDayOfMonth(this.date.getFullYear(), this.date.getMonth()),
	// Получаем кол-во дней в месяце (1-31)
	this.countDayOfPrevMonth = this.getCountDayOfMonth(this.date.getFullYear(), this.date.getMonth() - 1),
	// Получаем кол-во дней в предыдущем месяце (1-31)
	this.numFirstDayOfMonth = this.getNumFirstDayOfMonth(this.date.getFullYear(), this.date.getMonth()),
	// Получаем номер дня недели первого дня месяца (0-6)
	this.numLastDayOfMonth = this.getNumLastDayOfMonth(this.date.getFullYear(), this.date.getMonth()),
	// Получаем номер дня недели последнего дня месяца (0-6)
	this.namesOfMonths = ["Январь", "Февраль", "Март", "Апрель", "Май",
						  "Июнь", "Июль", "Август", "Сентябрь",
						  "Октябрь", "Ноябрь", "Декабрь"],
	// Массив с названиями месяцев для отображения надписи
	this.calendar = '',
	// Переменная в которую в конце будет сформирован весь календарь
	this.counter = 42;
	// Счётчик для того чтобы создать календарь форматом (7х6)

};

// Функция для отправления запроса сервер и получения массива забронированных дней
Calendar.prototype.getBookedDays = function (url) {
	var bookedDays = [];
	$.ajax({
		url: url,
		method: 'GET',
		async: false,
		dataType: 'json',
		context: this.bookedDays,
		success: function (data) {
			bookedDays = data;
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
	if (this.numFirstDayOfMonth != 0)
	{
		// Если 1-й день месяца - понедельник, то первую строку календаря полностью
		// (7 ячеек) заполняем днями прошлого месяца
		if (this.numFirstDayOfMonth == 1)
		{
			this.countDayOfPrevMonth -= 7;
			for (var i = 0; i < 7; i++)
			{
				this.countDayOfPrevMonth++;
				this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
				this.counter--;
			}
			this.calendar += '</tr><tr>';
		}
		else
		{
			this.countDayOfPrevMonth -= this.numFirstDayOfMonth - 1;
			for (var i = 1; i < this.numFirstDayOfMonth; i++)
			{
				this.countDayOfPrevMonth++;
				this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
				this.counter--;
			}
		}
	}
	// Если 1-й день месяца - воскресенье, то в 1-й строке календаря будет
	// 6 дней прошлого месяца
	else
	{
		this.countDayOfPrevMonth -= 6;
		for (var i = 0; i < 6; i++)
		{
			this.countDayOfPrevMonth++;
			this.calendar += '<td class="bg-light text-muted">' + this.countDayOfPrevMonth + '</td>';
			this.counter--;
		}
	}
};

// Функция для получения дней текущего месяца 
Calendar.prototype.getDaysOfCurrentMonth = function () {
	for (var  i = 1; i <= this.countDayOfMonth; i++)
	{
		// Если i-ый день в цикле не сегодняшний, задаём ему соответствующий 
		// стиль и характеристику "забронированного" или "свободного" дня,
		// согласно ТЗ, иначе, если день сегодняшний и свободен, то задаём ему
		// немного иной стиль
		if (i != this.date.getDate())
		{
			if (this.bookedDays.indexOf(i) != -1)
			{
				this.calendar += '<td class="bg-danger text-white" title="Данный день занят" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			else
			{
				this.calendar += '<td class="clickable" title="Данный день свободен" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			this.counter--;
		}
		else
		{
			if (this.bookedDays.indexOf(i) != -1)
			{
				this.calendar += '<td id="today" class="bg-danger text-white" title="Сегодняшний день занят" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			else
			{
				this.calendar += '<td id="today" class="bg-info text-white clickable" title="Сегодняшний день свободен" data-toggle="tooltip" data-placement="bottom">' + i + '</td>';
			}
			this.counter--;
		}

		// Если день выпадает на воскресенье, то делаем перевод строки,
		// закрывая предыдущую строку таблицы и открывая новую
		if (new Date(this.date.getFullYear(), this.date.getMonth(), i).getDay() == 0)
		{
		
	    	this.calendar += '</tr><tr>';
		}
	}
};

// Функция для получения дней следующего месяца 
Calendar.prototype.getDaysOfNextMonth = function () {
	for (var j = 0; this.counter; this.counter--)
	{
		this.calendar += '<td class="bg-light text-muted">' + ++j + '</td>';
		// Если день - воскресенье, то делаем перевод строки
		if (new Date(this.date.getFullYear(), this.date.getMonth() + 1, j).getDay() == 0)
		{
			this.calendar += '<tr>';
		}
	}
};

// Функция для получения тела календаря (tbody)
Calendar.prototype.getBodyOfCalendar = function () {

	this.calendar += '<tr>';

	// -------------------------------------------------------------------------
	// Создаем ячейки с днями предыдущего месяца
	// -------------------------------------------------------------------------

	this.getDaysOfPrevMonth();

	// -------------------------------------------------------------------------
	// Создаём ячейки с днями текущего месяца
	// -------------------------------------------------------------------------

	this.getDaysOfCurrentMonth();

	// -------------------------------------------------------------------------
	// Создаём ячейки с днями следующего месяца
	// -------------------------------------------------------------------------

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
		} else {
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
		} else {
			selectedDays.splice( selectedDays.indexOf( $(this).text() ), 1);
			console.log(selectedDays);
			$(this).data('click', false);
		}

		// Если есть выбранный элемент, то делаем кнопку кликабельной
		if (selectedDays.length > 0) {
			$('#bookedButton').removeAttr('disabled').text('Забронировать');
		} else {
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

	$('#bookedButton').click(function() {
		
		console.log(selectedDays);
		// Объединяем массивы выбранных и ранее забронированных дней
		bookedDays = bookedDays.concat(selectedDays);
		// Делаем кнопку не кликабельной
		$(this).text('Бронирование успешно завершено');
		$(this).attr('disabled', true);
		// Делаем стиль всех выбранныех дней "забронированными" и убираем с них
		// класс "clicked", чтобы на них не срабатывало событие "hover"
		$('.bg-success.clickable').
			attr('data-original-title', 'Данный день занят').
			toggleClass('bg-success clicked').
			addClass('bg-danger');
		// Также убираем с них все события на клик
		$('.clickable').unbind('click');

		console.groupEnd();
		console.group('Сортировка массива забронированнх дней и его отправка на сервер');

		console.log(bookedDays);

		bookedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});
		console.log(bookedDays);

		// Отправка AJAX запроса с данными о забронированных днях на сервер
		$.ajax({
			url: url,
			method: 'POST',
			dataType: 'json',
			data: {
				'bookedDays': JSON.stringify(bookedDays)
			},
			success: function (data) {
				console.info('Данные успешно отправлены на сервер', data);
			},
			fail: function (data) {
				console.error('При отправке данных на сервер что-то пошло не так :/', data);
			},
			complete: function (data) {
				console.info('Данные отправлены на сервер (Ajax.complete)', data);
			}
		});

		console.groupEnd();
	});

	this.bookedDays = bookedDays;
	this.selectedDays = selectedDays;
};

// Функция получения календаря и его присваивания tbody таблицы с заданным id
Calendar.prototype.getCalendar = function (id) {

	// Получаем тело календаря
	this.getBodyOfCalendar();

	// Присваиваем его таблице с указанным "id", а также в заголовок таблице
	// добавляем сведения о текущем месяце и годе
	$('#' + id + ' tbody').html(this.calendar);
	$('#month-name').html(
		'<h4 class="text-white">' +
			this.namesOfMonths[this.date.getMonth()] + ' ' + this.date.getFullYear() +
		'</h4>');
	$('#month-name').data('month', this.date.getMonth());
	$('#month-name').data('year', this.date.getFullYear());

	// Инициализируем все подсказки Bootstrap на странице
	$('[data-toggle="tooltip"]').tooltip();

	// Добавляем выделение элемента таблицы при наведении на него мыши
	// $('.clickable').hover(
	// 	function() {
	// 	    $(this).toggleClass('bg-secondary');
	// 	    if ( !$(this).hasClass('text-white') ) 
	// 	    {
	// 	    	$(this).toggleClass('text-white');
	// 	    }
	// 	    else
	// 	    {
	// 	    	$(this).removeClass('text-white');
	// 	    }
	// 	}
	// );

	console.group('Изменения массива с выбранными днями');

	this.addClickable();

	this.clickOnBookedButton();
};

var calendar = new Calendar();

calendar.getCalendar('calendar');