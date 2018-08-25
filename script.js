
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
function getCalendar(D) {
	var /*D = new Date();*/
		// Получаем текущую дату
		countDayOfMonth 	= getCountDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем кол-во дней в месяце
		countDayOfPrevMonth = getCountDayOfMonth(D.getFullYear(), D.getMonth() - 1),
		// Получаем кол-во дней в предыдущем месяце
		numFirstDayOfMonth 	= getNumFirstDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем номер дня недели первого дня месяца
		numLastDayOfMonth 	= getNumLastDayOfMonth(D.getFullYear(), D.getMonth()),
		// Получаем номер дня недели последнего дня месяца

		namesOfMonths = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
		calendar = '<tr>',
		counter = 42;
		// Счётчик равный 42 для того чтобы построить календарь размером (7х6)

		console.log(D);
		console.log(countDayOfMonth);
		console.log(countDayOfPrevMonth);
		console.log(numFirstDayOfMonth);
		console.log(numLastDayOfMonth);

		// Распечатываем дни предыдущего месяца

		if (numFirstDayOfMonth != 0) {
		// Если 1-й день текущего месяца не воскресенье, то распечатываем
		// дни предыдущего месяца до первого дня текущего
			if (numFirstDayOfMonth == 1) {

				console.log('Вход в цикл совершен!');

				countDayOfPrevMonth -= 7;
				for (var i = 0; i < 7; i++) {
					countDayOfPrevMonth++;
					calendar += '<td class="bg-light text-muted">' + countDayOfPrevMonth + '</td>';
					counter--;
				}
				calendar += '</tr><tr>';

			} else {
				countDayOfPrevMonth -= numFirstDayOfMonth - 1;
			// Отнимаем от кол-ва дней прошлого месяца нужное нам кол-во дней,
			// чтобы построить первую строчку календаря с днями пред. месяца
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

		// Распечатываем дни текущего месяца

		for (var  i = 1; i <= countDayOfMonth; i++) {

			if (i != D.getDate()) {
				calendar += '<td>' + i + '</td>';
				counter--;
			} else {
				calendar += '<td id="today" class="bg-info text-white">' + i + '</td>';
				counter--;  // сегодняшней дате можно задать стиль CSS
			}

			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
		    	calendar += '</tr><tr>';
			}
		}

		// Распечатываем дни след. месяца

		for(var  i = 0, j = 1; i < counter; counter--) {
			calendar += '<td class="bg-light text-muted">' + j++ + '</td>';
			if ((counter - 1) % 7 == 0) {
				calendar += '<tr>';
			}
		}

		calendar += '</tr>';

		console.log(calendar);
		console.log(counter);
		document.querySelector('#calendar tbody').innerHTML = calendar;
		document.getElementById('month-name').innerHTML = '<h4 class="text-white">' + 
														  namesOfMonths[D.getMonth()] + 
														  ' ' + 
														  D.getFullYear() + '</h4>';
		
}

function getPrevMonth(D){
	D.setMonth(D.getMonth() - 1);
	getCalendar(D);
}

function getNextMonth(D){
	D.setMonth(D.getMonth() + 1);
	getCalendar(D);
}

var D = new Date(2018, 0, 1);

getCalendar(D);
document.getElementById('#prevMonth').onclick = getCalendar(D.setMonth(D.getMonth() - 1));
document.querySelector('#nextMonth').onclick = getCalendar(D.setMonth(D.getMonth() + 1));
