const moviesPlaceholder = document.getElementById("movies-placeholder")
const placeholder = document.getElementById("placeholder-box")
let dataArr = (JSON.parse(localStorage.getItem("movieId")))
let isAdded = false


if(dataArr.length === 0){
    localStorage.clear()
}

getData()
function getData() {  
    moviesPlaceholder.innerHTML = ""
    if (dataArr.length){
        dataArr.forEach(element => {
            fetch(`https://www.omdbapi.com/?apikey=99bb1601&i=${element}`)
                .then(res => res.json())
                .then(data => {
                    renderMovies(data)
                })
        })
    }else {
        moviesPlaceholder.innerHTML = `
        <div id="placeholder-box" class="placeholder-box">
            <h2 class="placeholder-text">Your watchlist is looking a little empty...</h2>
            <a href="/index.html"><img src="/images/plusIcon.svg" />Let’s add some movies!</a>
        </div>
    `
    }
}

function renderMovies(data) {
    const {imdbID, Plot, Poster, Genre, Runtime, imdbRating, Title} = data
    if(data){
    moviesPlaceholder.innerHTML += `
        <div class="movie-card" id="${imdbID}">
            <img src="${Poster}" />
            <div class="movie-description">
                <div class="title">
                    <h2>${Title}</h2> <h5><span>⭐</span>${imdbRating}</h5>
                </div>
                <h5>${Runtime}</h5> <h5>${Genre}</h5> <h4 class="addToWatchlist" id="${imdbID}" onclick="removeFromWatchList('${imdbID}')"><img src="/images/minusIcon.svg"/>Remove from watchlist</h4>
                <p>${Plot}</p>
            </div>
        </div>
    `
    }
}

function removeFromWatchList(id) {
    dataArr.splice(dataArr.indexOf(id), 1)
    localStorage.setItem("movieId", JSON.stringify(dataArr))
    getData()
}



