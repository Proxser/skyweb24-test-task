
// Функция для получения кол-ва дней в заданном месяце (1-31)
function getCountDayOfMonth(year, month) {
	var D = new Date(year, month + 1, 0);
	return D.getDate();
}

// Функция для получения номера дня недели первого дня заданного месяца (0-6)
function getNumFirstDayOfMonth(year, month) {
	var D = new Date(year, month, 1);
	return D.getDay();
}

// Функция для получения номера дня недели последнего заданного месяца (0-6)
function getNumLastDayOfMonth(year, month) {
	var D = new Date(year, month, getCountDayOfMonth(year, month));
	return D.getDay();
}

// Получаем календарь
function getCalendar(id, D) {

	// -------------------------------------------------------------------------
	// Объявление переменных
	// -------------------------------------------------------------------------

	var countDayOfMonth 	= getCountDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем кол-во дней в месяце (1-31)

		countDayOfPrevMonth = getCountDayOfMonth(D.getFullYear(), D.getMonth() - 1),
		// Получаем кол-во дней в предыдущем месяце (1-31)

		numFirstDayOfMonth 	= getNumFirstDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем номер дня недели первого дня месяца (0-6)

		numLastDayOfMonth 	= getNumLastDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем номер дня недели последнего дня месяца (0-6)

		namesOfMonths 		= ["Январь", "Февраль", "Март", "Апрель", "Май",
							   "Июнь", "Июль", "Август", "Сентябрь",
							   "Октябрь", "Ноябрь", "Декабрь"],
		// Массив с названиями месяцев для отображения надписи

		calendar      		= '<tr>',
		// Переменная в которую в конце будет сформирован весь календарь

		counter       		= 42;
		// Счётчик равный 42 для того чтобы построить календарь размером (7х6)


		// ---------------------------------------------------------------------
		// Создаём ячейки с днями предыдущего месяца
		// ---------------------------------------------------------------------

		// Если 1-й день текущего месяца не воскресенье, то печатаем дни
		// предыдущего месяца

		if (numFirstDayOfMonth != 0) {
		
		// Если 1-й день текущего месяца начинается с понедельника, то всю 1-ю 
		// строчку календаря заполняем днями предыдущего месяца, иначе печатаем 
		// необходимое кол-во дней предыдущего месяца, чтобы заполнить

			if (numFirstDayOfMonth == 1) {
		
				countDayOfPrevMonth -= 7;
				for (var i = 0; i < 7; i++) {
					countDayOfPrevMonth++;
					calendar += '<td class="bg-light text-muted">' + countDayOfPrevMonth + '</td>';
					counter--;
				}

				calendar += '</tr><tr>';

			} else {

		// Узнаем необходимое кол-во дней пр

				countDayOfPrevMonth -= numFirstDayOfMonth - 1;

				for (var i = 1; i < numFirstDayOfMonth; i++) {
					countDayOfPrevMonth++;
					calendar += '<td class="bg-light text-muted">' + countDayOfPrevMonth + '</td>';
					counter--;
				}
			}

		} else {
		// Иначе, если 1-й день текущего месяца - воскресенье, то распечатываем
		// дни предыдущего месяца до первого дня текущего и дни текущего
			countDayOfPrevMonth -= 6;

			for (var i = 0; i < 6; i++) {
				countDayOfPrevMonth++;
				calendar += '<td class="bg-light text-muted">' + countDayOfPrevMonth + '</td>';
				counter--;
			}
		}


		// ---------------------------------------------------------------------
		// Создаём ячейки с днями текущего месяца
		// ---------------------------------------------------------------------

		for (var  i = 1; i <= countDayOfMonth; i++) {
			if (i != D.getDate()) {

				calendar += '<td>' + i + '</td>';
				counter--;

			} else {

				calendar += '<td id="today" class="bg-info text-white">' + i + '</td>';
				counter--;

			}

			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
			// если день выпадает на воскресенье, то перевод строки
		    	calendar += '</tr><tr>';
			}
		}


		// ---------------------------------------------------------------------
		// Создаём ячейки с днями следующего месяца
		// ---------------------------------------------------------------------

		for (var  i = 0, j = 1; i < counter; counter--) {
			calendar += '<td class="bg-light text-muted">' + j++ + '</td>';

			if ( (counter - 1) % 7 == 0 ) {
				calendar += '<tr>';
			}
		}

		calendar += '</tr>';

		$('#' + id + ' tbody').html(calendar);
		$('#month-name').html(
			'<h4 class="text-white">' +
				namesOfMonths[D.getMonth()] + ' ' + D.getFullYear() +
			'</h4>');
		$('#month-name').data('month', D.getMonth());
		$('#month-name').data('year', D.getFullYear());	
}

var D = new Date();

getCalendar('calendar', D);

$('#prevMonth').click(function() {
	getCalendar('calendar', new Date($('#month-name').data().year, $('#month-name').data().month - 1, 1));
});
$('#nextMonth').click(function() {
	getCalendar('calendar', new Date($('#month-name').data().year, $('#month-name').data().month + 1, 1));
});