const API_KEY = 'cc76563a';
let wishList = [];
let movieList = document.querySelector('#movies_list');

function searchMovie(query, year, type) {
	let users = fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&y=${year}&type=${type}`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error()
			}
		})
		.then(json => {
			console.log(json);

			drawMovieList(json.Search)
		})
		.then(() => {
			document.querySelector('.loader').classList.remove('--visible')
		})
		.catch(err => {
			console.log('my error ', err);
		})
}

document.querySelector('#searchForm').onsubmit = function (event) {
	event.preventDefault();
	movieList.children
	while (movieList.children.length) {
		movieList.removeChild(movieList.children[0])
	}
	document.querySelector('.loader').classList.add('--visible')
	query = document.forms.searchForm.elements.search.value;
	year = document.forms.searchForm.elements.year.value;
	type = document.forms.searchForm.elements.genre;

	searchMovie(query, year, type.options[type.selectedIndex].value)
}

function drawMovieList(movies) {
	movies.forEach((movie, index) => {
		const PICTURE = document.createElement('picture');
		PICTURE.classList.add('card__img');

		const IMG = document.createElement('img');
		IMG.setAttribute('src', movie.Poster);
		IMG.setAttribute('alt', movie.Title + ' Poster');

		PICTURE.appendChild(IMG);

		const CONTENT = document.createElement('div');
		CONTENT.classList.add('card__content');

		const TITLE = document.createElement('h2');
		TITLE.classList.add('card__title');

		const LINK = document.createElement('a');
		LINK.innerText = movie.Title;
		LINK.setAttribute('href', `movie.html?title=${movie.Title}`);
		TITLE.appendChild(LINK);

		const YEAR = document.createElement('p');
		YEAR.classList.add('card__year');
		YEAR.innerText = movie.Year;

		const TYPE = document.createElement('p');
		TYPE.classList.add('card__type');
		TYPE.innerText = movie.Type;

		const TO_FAV_BTN = document.createElement('button');
		TO_FAV_BTN.classList.add('card__toggle-fav');
		TO_FAV_BTN.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"/></svg>';
		TO_FAV_BTN.setAttribute('data-id', movie.imdbID);

		if (JSON.parse(localStorage.getItem('favMovies'))?.length) {
			let movieInFav = JSON.parse(localStorage.getItem('favMovies')).find(movieId => movieId === movie.imdbID);
			if (movieInFav) {
				TO_FAV_BTN.classList.add('--added')
			}
		}

		TO_FAV_BTN.onclick = event => {
			event.target.classList.toggle('--added');
			if (JSON.parse(localStorage.getItem('favMovies'))?.length) {
				let movieInFav = JSON.parse(localStorage.getItem('favMovies')).find(movieId => movieId === movie.imdbID);
				if (movieInFav) {
					removeFromFav(TO_FAV_BTN.getAttribute('data-id'));
				}
				else {
					addToFav(TO_FAV_BTN.getAttribute('data-id'));
				}
			} else {
				addToFav(TO_FAV_BTN.getAttribute('data-id'));
			}
		}

		CONTENT.appendChild(TITLE);
		CONTENT.appendChild(YEAR);
		CONTENT.appendChild(TYPE);

		const ARTICLE = document.createElement('article');
		ARTICLE.classList.add('card');
		ARTICLE.appendChild(PICTURE);
		ARTICLE.appendChild(CONTENT);
		ARTICLE.appendChild(TO_FAV_BTN);

		if (movieList) {
			movieList.appendChild(ARTICLE);
		}

		if (index === 0) {
			ARTICLE.classList.add('--big');
		} else if (index === 4) {
			ARTICLE.classList.add('--vertical');
		} else if (index === 6) {
			ARTICLE.classList.add('--horizontal');
		} else if (index === 9) {
			ARTICLE.classList.add('--horizontal');
		}
	})
}

function addToFav(id) {
	let favMoviesArray = JSON.parse(localStorage.getItem('favMovies')) || [];
	favMoviesArray.push(id)
	localStorage.setItem('favMovies', JSON.stringify(favMoviesArray))
}

function removeFromFav(id) {
	let favMoviesArray = JSON.parse(localStorage.getItem('favMovies'));

	let indexToDelete = favMoviesArray.findIndex(movieId => movieId === id)
	if (indexToDelete !== -1) {
		favMoviesArray.splice(indexToDelete, 1);
	} else {
		alert('element is not defined');
	}
	localStorage.setItem('favMovies', JSON.stringify(favMoviesArray))
}