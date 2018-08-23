<!doctype html>
<html lang="ru">
<head>

	<!-- Мета-теги -->

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- Bootstrap стили -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<!-- Свои стили -->

	<link rel="stylesheet" type="text/css" href="/style.css">

	<!-- Заголовок страницы -->

	<title>Система бронирования</title>

</head>
<body>
    <div class="container">

    	<!-- Заголовок -->

    	<div class="row">
    		<div class="col">
    			<br>
				<h1 class="text-center">Система бронирования</h1>
				<br>
			</div><!-- end of .col -->
    	</div><!-- end of .row -->

    	<!-- Основной контент -->

		<div class="row">

			<!-- Отображение календаря -->

			<div class="col-md-6">
				<table id="calendar" class="table table-bordered text-center">

					<!-- Заголовки таблицы -->

					<thead class="thead-light">
						<tr>
							<th class="bg-dark"><h4 class="text-white"><</h4></th>
							<th class="bg-dark" colspan="5"><h4 class="text-white">Август 2018</h4></th>
							<th class="bg-dark"><h4 class="text-white">></h4></th>
						</tr>
						<tr>
				      		<th scope="col">Пн</th>
					      	<th scope="col">Вт</th>
					      	<th scope="col">Ср</th>
					      	<th scope="col">Чт</th>
					      	<th scope="col">Пт</th>
					      	<th scope="col">Сб</th>
					      	<th scope="col">Вс</th>
				    	</tr>
				  	</thead>

				  	<!-- Тело таблицы -->

				  	<tbody>
				    	<tr>
					    	<td class="text-muted">30</td>
					    	<td class="text-muted">31</td>
					    	<td class="bg-danger text-white">1</td>
					    	<td>2</td>
					    	<td>3</td>
					    	<td>4</td>
					    	<td>5</td>
				    	</tr>
				    	<tr>
					    	<td>6</td>
					    	<td>7</td>
					    	<td>8</td>
					    	<td>9</td>
					    	<td>10</td>
					    	<td>11</td>
					    	<td>12</td>
				    	</tr>
				    	<tr>
					    	<td>13</td>
					    	<td>14</td>
					    	<td>15</td>
					    	<td>16</td>
					    	<td>17</td>
					    	<td>18</td>
					    	<td>19</td>
				    	</tr>
				    	<tr>
					    	<td class="bg-success text-white">20</td>
					    	<td>21</td>
					    	<td>22</td>
					    	<td>23</td>
					    	<td>24</td>
					    	<td>25</td>
					    	<td>26</td>
				    	</tr>
				    	<tr>
					    	<td>27</td>
					    	<td>28</td>
					    	<td>29</td>
					    	<td>30</td>
					    	<td>31</td>
					    	<td class="text-muted">1</td>
					    	<td class="text-muted">2</td>
				    	</tr>
				    	<tr>
					    	<td class="text-muted">3</td>
					    	<td class="text-muted">4</td>
					    	<td class="text-muted">5</td>
					    	<td class="text-muted">6</td>
					    	<td class="text-muted">7</td>
					    	<td class="text-muted">8</td>
					    	<td class="text-muted">9</td>
				    	</tr>
				  	</tbody>
				</table>
			</div><!-- end of .col-6 -->

			<!-- Отображение кнопки "Забронировать" и подсказок -->

			<div class="col-md-6">

				<!-- Подсказки -->

				<div class="alert alert-success" role="alert">
					Зелёным цветом помечаются выбранные вами дни
				</div>

				<div class="alert alert-danger" role="alert">
					Красным цветом помечены уже забронированные дни
				</div>

				<!-- Небольшой текст со справкой -->

				<br>
				<p class="text-muted">Забронируйте нужные вам даты, кликнув на удобные для вас дни календаря и нажав на кнопку "Забронировать".</p>

				<!-- Кнопка "Забронировать" -->

				<br>
				<button type="button" class="btn btn-outline-success btn-lg btn-block">Забронировать</button>
				<br>
			</div><!-- end of .col-6 -->

		</div><!-- end of .row -->
	</div><!-- end of .container -->

	<!-- Область подключения скриптов -->

	<!-- Bootstrap -->

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

	<!-- Свои скрипты -->

	<script type="text/javascript" src="/script.js"></script>

</body>
</html>