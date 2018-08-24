
// Функция для получения кол-ва дней в заданном месяце (1-31)
function getCountDayOfMonth(year, month) {
	var D = new Date(year, month + 1, 0);
	return D.getDate();
}

// Функция для получения номера дня недели первого дня заданного месяца
function getNumFirstDayOfMonth(year, month) {
	var D = new Date(year, month, 1);
	return D.getDay();
}

// Функция для получения номера дня недели последнего заданного месяца
function getNumLastDayOfMonth(year, month) {
	var D = new Date(year, month, getCountDayOfMonth(year, month));
	return D.getDay();
}

// Получаем календарь
function getCalendar() {
	var D = new Date(/*2018, 6, 1*/);
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
		calendar = '<tr>';

		console.log(D);
		console.log(countDayOfMonth);
		console.log(countDayOfPrevMonth);
		console.log(numFirstDayOfMonth);
		console.log(numLastDayOfMonth);

		// Распечатываем дни предыдущего месяца

		if (numFirstDayOfMonth != 0) {
			// Если 1-й день текущего месяца не воскресенье, то распечатываем
			// дни предыдущего месяца до первого дня текущего
			countDayOfPrevMonth -= numFirstDayOfMonth - 1;
			for (var i = 1; i < numFirstDayOfMonth; i++) {
				countDayOfPrevMonth++;
				calendar += '<td class="text-muted">' + countDayOfPrevMonth + '</td>';
			}
		} else {
			countDayOfPrevMonth -= 6;
			for (var i = 0; i < 6; i++) {
				countDayOfPrevMonth++;
				calendar += '<td class="text-muted">' + countDayOfPrevMonth + '</td>';
			}
		}

		// Распечатываем дни текущего месяца

		for (var  i = 1; i <= countDayOfMonth; i++) {

			if (i != D.getDate()) {
				calendar += '<td>' + i + '</td>';
			} else {
				calendar += '<td id="today">' + i + '</td>';  // сегодняшней дате можно задать стиль CSS
			}

			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
		    	calendar += '</tr><tr>';
			}
		}

		// Распечатываем дни след. месяца

		if (numLastDayOfMonth != 0) {
			for(var  i = numLastDayOfMonth, j = 1; i < 7; i++) {
				calendar += '<td class="text-muted">' + j++ + '</td>';
			}
		}

		calendar += '</tr>';

		console.log(calendar);
}

getCalendar();

// var D1 = new Date(),
//     D1last = new Date(D1.getFullYear(),D1.getMonth()+1,0).getDate(), // последний день месяца
//     D1Nlast = new Date(D1.getFullYear(),D1.getMonth(),D1last).getDay(), // день недели последнего дня месяца
//     D1Nfirst = new Date(D1.getFullYear(),D1.getMonth(),1).getDay(), // день недели первого дня месяца
//     calendar1 = '<tr>',
//     month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]; // название месяца, вместо цифр 0-11

// // пустые клетки до первого дня текущего месяца
// if (D1Nfirst != 0) {
//   for(var  i = 1; i < D1Nfirst; i++) calendar1 += '<td>';
// }else{ // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток 
//   for(var  i = 0; i < 6; i++) calendar1 += '<td>';
// }

// // дни месяца
// for(var  i = 1; i <= D1last; i++) {
//   if (i != D1.getDate()) {
//     calendar1 += '<td>' + i;
//   }else{
//     calendar1 += '<td id="today">' + i;  // сегодняшней дате можно задать стиль CSS
//   }
//   if (new Date(D1.getFullYear(),D1.getMonth(),i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
//     calendar1 += '<tr>';
//   }
// }

// // пустые клетки после последнего дня месяца
// if (D1Nlast != 0) {
//   for(var  i = D1Nlast; i < 7; i++) calendar1 += '<td>';
// }

// document.querySelector('#calendar1 tbody').innerHTML = calendar1;
// document.querySelector('#calendar1 thead td:last-child').innerHTML = D1.getFullYear();
// document.querySelector('#calendar1 thead td:first-child').innerHTML = month[D1.getMonth()];