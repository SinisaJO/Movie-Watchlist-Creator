const moviesPlaceholder = document.getElementById("movies-placeholder")
const placeholder = document.getElementById("placeholder-box")
let dataArr = (JSON.parse(localStorage.getItem("movieId")))

if(dataArr) {
    if (dataArr.length > -1) {
        getData()
    }else {
        localStorage.clear()
    }
}else {
    moviesPlaceholder.innerHTML = renderEmpty()
}

function getData() {  
    moviesPlaceholder.innerHTML = ""
    if (dataArr.length){
        dataArr.forEach(async(element) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=99bb1601&i=${element}`)
            const data = await response.json()
            renderMovies(data)
        })
    }else {
        moviesPlaceholder.innerHTML = renderEmpty()
    }
}

function renderMovies(data) {
    const {imdbID, Plot, Poster, Genre, Runtime, imdbRating, Title} = data
    if(data){
    moviesPlaceholder.innerHTML += `
        <div class="movie-card" id="${imdbID}">
            <img src="${Poster == "N/A" ? `https://assets.codepen.io/5515635/generic-movie-poster.jpg`: Poster}" loading="lazy"/>
            <div class="movie-description">
                <div class="title">
                    <h2>${Title}</h2> <h5><span>⭐</span>${imdbRating}</h5>
                </div>
                <h5>${Runtime}</h5> <h5>${Genre}</h5> <button class="addToWatchlist" id="${imdbID}" onclick="removeFromWatchList('${imdbID}')"><img src="/images/minusIcon.svg"/>Remove</button>
                <p>${Plot}</p>
            </div>
        </div>
    `
    }
}

function renderEmpty(){
    return `
        <div id="placeholder-box" class="placeholder-box">
            <h2 class="placeholder-text">Your watchlist is looking a little empty...</h2>
            <a href="/index.html"><img src="/images/plusIcon.svg" />Let’s add some movies!</a>
        </div>
    `
}

function removeFromWatchList(id) {
    dataArr.splice(dataArr.indexOf(id), 1)
    localStorage.setItem("movieId", JSON.stringify(dataArr))
    getData()
}




