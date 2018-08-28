var Calendar = function () {
	this.date = new Date();
	this.url = 'http://skyweb24.loc/data.php';
	this.bookedDays = [];
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
};

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

Calendar.prototype.getCountDayOfMonth = function (year, month) {
	var D = new Date(year, month + 1, 0);
	return D.getDate();
};

Calendar.prototype.getNumFirstDayOfMonth = function (year, month) {
	var D = new Date(year, month, 1);
	return D.getDay();
};

Calendar.prototype.getNumLastDayOfMonth = function (year, month) {
	var D = new Date(year, month, this.getCountDayOfMonth(year, month));
	return D.getDay();
};

Calendar.prototype.getDaysOfPrevMonth = function () {
	if (this.numFirstDayOfMonth != 0)
	{
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

Calendar.prototype.getDaysOfCurrentMonth = function () {
	for (var  i = 1; i <= this.countDayOfMonth; i++)
	{
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

		if (new Date(this.date.getFullYear(), this.date.getMonth(), i).getDay() == 0)
		{
		// если день выпадает на воскресенье, то перевод строки
	    	this.calendar += '</tr><tr>';
		}
	}
};

Calendar.prototype.getDaysOfNextMonth = function () {
	for (var  i = 0, j = 1; i < this.counter; this.counter--)
	{
		this.calendar += '<td class="bg-light text-muted">' + j++ + '</td>';
		if ( (this.counter - 1) % 7 == 0 )
		{
			this.calendar += '<tr>';
		}
	}
};

Calendar.prototype.getBodyOfCalendar = function () {

	this.bookedDays = this.getBookedDays(this.url);

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

Calendar.prototype.addClickable = function () {
	var selectedDays = this.selectedDays;
	$('.clickable').click(function () {
		var clickable = $(this).data().click || false;

		if ( 'today' == $(this).attr('id') ) {
			$(this).toggleClass('bg-success bg-info');
		} else {
			$(this).toggleClass('bg-success text-white');
		}

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

		if (selectedDays.length > 0) {
			$('#bookedButton').removeAttr('disabled').text('Забронировать');
		} else {
			$('#bookedButton').attr('disabled', true);
		}

		this.selectedDays = selectedDays;
	});
};

Calendar.prototype.clickOnBookedButton = function() {
	var bookedDays = this.bookedDays,
		selectedDays = this.selectedDays,
		url = this.url;

	$('#bookedButton').click(function() {
		
		console.log(selectedDays);
		bookedDays = bookedDays.concat(selectedDays);

		$(this).text('Бронирование успешно завершено');
		$(this).attr('disabled', true);

		$('.bg-success.clickable').
			attr('data-original-title', 'Данный день занят').
			toggleClass('bg-success clicked').
			addClass('bg-danger');

		$('.clickable').unbind('click');
		console.log(bookedDays);
		bookedDays.sort(function (a, b) {
		  if (a > b) return 1;
		  if (a < b) return -1;
		});
		console.log(bookedDays);

		$.ajax({
			url: url,
			method: 'POST',
			// async: false,
			dataType: 'json',
			data: {
				'bookedDays': JSON.stringify(bookedDays)
			},
			success: function (data) {
				console.log('Успешно отправлены', data);
			},
			fail: function (data) {
				console.log('Что-то пошло не так :/', data);
			},
			complete: function (data) {
				console.log('Запрос выполнен', data);
			}
		});
	});

	this.bookedDays = bookedDays;
	this.selectedDays = selectedDays;
};

Calendar.prototype.getCalendar = function (id) {
	
	this.getBodyOfCalendar();

	$('#' + id + ' tbody').html(this.calendar);
	$('#month-name').html(
		'<h4 class="text-white">' +
			this.namesOfMonths[this.date.getMonth()] + ' ' + this.date.getFullYear() +
		'</h4>');
	$('#month-name').data('month', this.date.getMonth());
	$('#month-name').data('year', this.date.getFullYear());

	$('[data-toggle="tooltip"]').tooltip();

	$('.clickable').hover(
		function() {
		    $(this).toggleClass('bg-secondary');
		    if ( !$(this).hasClass('text-white') ) 
		    {
		    	$(this).toggleClass('text-white');
		    }
		    else
		    {
		    	$(this).removeClass('text-white');
		    }
		}
	);

	this.addClickable();

	// this.prevMonth();
	// this.nextMonth();

	this.clickOnBookedButton();
};

// Calendar.prototype.prevMonth = function () {
// 	var calendar = new Calendar(new Date( $('#month-name').data().year, $('#month-name').data().month - 1, 1), this.url ),
// 		D = this.date;

// 	$('#prevMonth').click(function() {
// 		if ($('#month-name').data().year == D.getFullYear() &&
// 			$('#month-name').data().month - 1 == D.getMonth() ) {
// 			calendar.getCalendar('calendar');
// 		} else {
// 			calendar.getCalendar('calendar');
// 		}
// 	});

// 	this = calendar;
// };

// Calendar.prototype.nextMonth = function () {
// 	var calendar = new Calendar(new Date( $('#month-name').data().year, $('#month-name').data().month + 1, 1), this.url ),
// 		D = this.date;

// 	$('#nextMonth').click(function() {
// 		if ($('#month-name').data().year == D.getFullYear() &&
// 			$('#month-name').data().month + 1 == D.getMonth() ) {
// 			calendar.getCalendar('calendar');
// 		} else {
// 			calendar.getCalendar('calendar');
// 		}
// 	});
// };

var calendar = new Calendar();

calendar.getCalendar('calendar');