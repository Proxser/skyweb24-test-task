
function createCalendar(){
  var currentDate       = new Date(),                                                                         // Текущая дата
      lastDayMonth      = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),       // Последний день месяца
      firstDayWeekMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),            // День недели последнего дня месяца
      lastDayWeekMonth  = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDayMonth).getDay(), // День недели первого дня месяца
      monthsArray       = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

      console.group('Вывод данных, хранимых в переменных');
      console.log('Текущая дата: ', currentDate);
      console.log('Последний день месяца: ', lastDayMonth);
      console.log('День недели последнего числа месяца: ', lastDayWeekMonth);
      console.log('День недели первого числа месяца: ', firstDayWeekMonth);

      
}

createCalendar();

// var cDate         = new Date(),                                                           // Текущая дата
//     cDateLast     = new Date(cDate.getFullYear(), cDate.getMonth() + 1, 0).getDate(),     // Последний день месяца
//     D1Nlast       = new Date(cDate.getFullYear(), cDate.getMonth(), cDateLast).getDay(),  // День недели последнего дня месяца
//     D1Nfirst      = new Date(cDate.getFullYear(), cDate.getMonth(), 1).getDay(),          // День недели первого дня месяца
//     calendar      = '<tr>',
//     month         = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]; // название месяца, вместо цифр 0-11

// // пустые клетки до первого дня текущего месяца
// if (D1Nfirst != 0)
// {
//   for(var  i = 1; i < D1Nfirst; i++)
//     calendar1 += '<td>';
// }
// else
// { // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток 
//   for(var  i = 0; i < 6; i++)
//     calendar1 += '<td>';
// }

// // дни месяца
// for(var  i = 1; i <= D1last; i++) {

//   if (i != D1.getDate())
//   {
//     calendar1 += '<td>' + i;
//   }
//   else
//   {
//     calendar1 += '<td id="today">' + i;  // сегодняшней дате можно задать стиль CSS
//   }

//   if (new Date(D1.getFullYear(),D1.getMonth(),i).getDay() == 0)
//   {  // если день выпадает на воскресенье, то перевод строки
//     calendar1 += '<tr>';
//   }
// }

// // пустые клетки после последнего дня месяца
// if (D1Nlast != 0)
// {
//   for(var  i = D1Nlast; i < 7; i++) calendar1 += '<td>';
// }

// document.querySelector('#calendar tbody').innerHTML = calendar1;
// document.querySelector('#calendar thead td:last-child').innerHTML = D1.getFullYear();
// document.querySelector('#calendar thead td:first-child').innerHTML = month[D1.getMonth()];


// function Calendar2(id, year, month) {
// var Dlast = new Date(year,month+1,0).getDate(),
//     D = new Date(year,month,Dlast),
//     DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
//     DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
//     calendar = '<tr>',
//     month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
// if (DNfirst != 0) {
//   for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
// }else{
//   for(var  i = 0; i < 6; i++) calendar += '<td>';
// }
// for(var  i = 1; i <= Dlast; i++) {
//   if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
//     calendar += '<td class="today">' + i;
//   }else{
//     calendar += '<td>' + i;
//   }
//   if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
//     calendar += '<tr>';
//   }
// }
// for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
// document.querySelector('#'+id+' tbody').innerHTML = calendar;
// document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
// document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
// document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
// if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
//     document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
// }
// }
// Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// // переключатель минус месяц
// document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
//   Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
// }
// // переключатель плюс месяц
// document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
//   Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
// }