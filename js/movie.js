const API_KEY = 'cc76563a';
let title = new URLSearchParams(window.location.search).get('title');
let movieInfo = document.querySelector('#movieInfo');

if (title) {
	fatchMovie();
}

async function fatchMovie() {
	let fetchMovie = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`)
	let movieResponse = await fetchMovie.json();
	drawMovieInfo(movieResponse);
}

function drawMovieInfo(info) {

	const MOVIE_CONTENT = document.createElement('div');
	MOVIE_CONTENT.classList.add('movie__content');

	const MOVIE_INFO = document.createElement('div');
	MOVIE_INFO.classList.add('movie__infoTable');

	const MOVIE_INFO_LEFT = document.createElement('div');
	MOVIE_INFO_LEFT.classList.add('movie__infoTable_left');

	const MOVIE_IMG = document.createElement('img');
	MOVIE_IMG.setAttribute('src', info.Poster);
	MOVIE_IMG.setAttribute('alt', info.Title);

	const POSTER_BOTTOM_BTN_FAV = document.createElement('div');
	POSTER_BOTTOM_BTN_FAV.classList.add('poster__bottomBtnFav');

	const ICON_FAV = document.createElement('img');
	ICON_FAV.setAttribute('src', './images/icon_fav.png');
	ICON_FAV.setAttribute('alt', 'icon fav');

	const P_FAV = document.createElement('p');
	P_FAV.innerText = 'Add to favorite';

	POSTER_BOTTOM_BTN_FAV.appendChild(ICON_FAV);
	POSTER_BOTTOM_BTN_FAV.appendChild(P_FAV);

	MOVIE_INFO_LEFT.appendChild(MOVIE_IMG);
	MOVIE_INFO_LEFT.appendChild(POSTER_BOTTOM_BTN_FAV);


	const MOVIE_INFO_RIGHT = document.createElement('div');
	MOVIE_INFO_RIGHT.classList.add('movie__infoTable_right');

	const MOVIE_TITLE = document.createElement('div');
	MOVIE_TITLE.classList.add('movie__title');

	const MOVIE_TITLE_H1 = document.createElement('h1');
	MOVIE_TITLE_H1.innerText = info.Title;

	MOVIE_TITLE.appendChild(MOVIE_TITLE_H1);

	const RATING = document.createElement('div');
	RATING.classList.add('rating');

	const QUALITY = document.createElement('div');
	QUALITY.classList.add('quality');
	QUALITY.innerText = 'FHD 1080P';

	const IMDB = document.createElement('div');
	IMDB.classList.add('quality__IMDb');
	IMDB.innerText = `IMDb ${info.imdbRating}`;

	RATING.appendChild(QUALITY);
	RATING.appendChild(IMDB);

	const TABLE = document.createElement('table');

	const TBODY = document.createElement('tbody');

	const TR_YEAR = document.createElement('tr');

	const TD_YEAR = document.createElement('td');
	TD_YEAR.innerText = 'Year:';

	const TD_YEAR_P = document.createElement('td');
	TD_YEAR_P.classList.add('l');
	TD_YEAR_P.innerText = info.Year;

	TR_YEAR.appendChild(TD_YEAR);
	TR_YEAR.appendChild(TD_YEAR_P);


	const TR_COUNTRY = document.createElement('tr');

	const TD_COUNTRY = document.createElement('td');
	TD_COUNTRY.innerText = 'Country:';

	const TD_COUNTRY_P = document.createElement('td');
	TD_COUNTRY_P.classList.add('l');
	TD_COUNTRY_P.innerText = info.Country;

	TR_COUNTRY.appendChild(TD_COUNTRY);
	TR_COUNTRY.appendChild(TD_COUNTRY_P);


	const TR_GENRE = document.createElement('tr');

	const TD_GENRE = document.createElement('td');
	TD_GENRE.innerText = 'Genre:';

	const TD_GENRE_P = document.createElement('td');
	TD_GENRE_P.classList.add('l');
	TD_GENRE_P.innerText = info.Genre;

	TR_GENRE.appendChild(TD_GENRE);
	TR_GENRE.appendChild(TD_GENRE_P);


	const TR_DIRECTOR = document.createElement('tr');

	const TD_DIRECTOR = document.createElement('td');
	TD_DIRECTOR.innerText = 'Director:';

	const TD_DIRECTOR_P = document.createElement('td');
	TD_DIRECTOR_P.classList.add('l');
	TD_DIRECTOR_P.innerText = info.Director;

	TR_DIRECTOR.appendChild(TD_DIRECTOR);
	TR_DIRECTOR.appendChild(TD_DIRECTOR_P);


	const TR_ACTORS = document.createElement('tr');

	const TD_ACTORS = document.createElement('td');
	TD_ACTORS.innerText = 'Actors:';

	const TD_ACTORS_P = document.createElement('td');
	TD_ACTORS_P.classList.add('l');
	TD_ACTORS_P.innerText = info.Actors;

	TR_ACTORS.appendChild(TD_ACTORS);
	TR_ACTORS.appendChild(TD_ACTORS_P);


	const TR_RUNTIME = document.createElement('tr');

	const TD_RUNTIME = document.createElement('td');
	TD_RUNTIME.innerText = 'Runtime:';

	const TD_RUNTIME_P = document.createElement('td');
	TD_RUNTIME_P.classList.add('l');
	TD_RUNTIME_P.innerText = info.Runtime;

	TR_RUNTIME.appendChild(TD_RUNTIME);
	TR_RUNTIME.appendChild(TD_RUNTIME_P);


	const TR_LANGUAGE = document.createElement('tr');

	const TD_LANGUAGE = document.createElement('td');
	TD_LANGUAGE.innerText = 'Language:';

	const TD_LANGUAGE_P = document.createElement('td');
	TD_LANGUAGE_P.classList.add('l');
	TD_LANGUAGE_P.innerText = info.Language;

	TR_LANGUAGE.appendChild(TD_LANGUAGE);
	TR_LANGUAGE.appendChild(TD_LANGUAGE_P);

	TBODY.appendChild(TR_YEAR);
	TBODY.appendChild(TR_COUNTRY);
	TBODY.appendChild(TR_GENRE);
	TBODY.appendChild(TR_DIRECTOR);
	TBODY.appendChild(TR_ACTORS);
	TBODY.appendChild(TR_RUNTIME);
	TBODY.appendChild(TR_LANGUAGE);

	TABLE.appendChild(TBODY);

	const TITLE_DESCRIPTION = document.createElement('div');
	TITLE_DESCRIPTION.classList.add('title__description')
	TITLE_DESCRIPTION.innerText = `What is the about ${info.Title}`;

	const DESCRIPTION = document.createElement('div');
	DESCRIPTION.classList.add('description')
	DESCRIPTION.innerText = info.Plot;

	MOVIE_INFO_RIGHT.appendChild(MOVIE_TITLE);
	MOVIE_INFO_RIGHT.appendChild(RATING);
	MOVIE_INFO_RIGHT.appendChild(TABLE);
	MOVIE_INFO_RIGHT.appendChild(TITLE_DESCRIPTION);
	MOVIE_INFO_RIGHT.appendChild(DESCRIPTION);

	MOVIE_INFO.appendChild(MOVIE_INFO_LEFT);
	MOVIE_INFO.appendChild(MOVIE_INFO_RIGHT);

	MOVIE_CONTENT.appendChild(MOVIE_INFO);

	if (movieInfo) {
		movieInfo.appendChild(MOVIE_CONTENT);
	}
}

// <div class="movie__content" >
// 	<div class="movie__infoTable">
// 		<div class="movie__infoTable_left">
// 			<img
// 				src="https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg"
// 				alt="">
// 				<div class="poster__bottomBtnFav">
// 					<img src="./images/icon_fav.png" alt="">
// 						<p>Add to favorite</p>
// 				</div>
// 		</div>
// 		<div class="movie__infoTable_right">
// 			<div class="movie__title">
// 				<h1>baba yaga</h1>
// 			</div>
// 			<div class="rating">
// 				<div class="quality">
// 					FHD 1080P
// 				</div>
// 				<div class="quality__IMDb">
// 					IMDb 7.0
// 				</div>
// 			</div>
// 			<table>
// 				<tbody>
// 					<tr>
// 						<td>Year:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Country:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Genre:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Director:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Actors:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Runtime:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 					<tr>
// 						<td>Language:</td>
// 						<td>ldkkdfkdf</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 			<div class="title__description">
// 				What is the about
// 			</div>
// 			<div class="description">
// 				Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of
// 				a galactic war
// 				between two alien races.
// 			</div>
// 		</div>
// 	</div>
// </div>