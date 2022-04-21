const placeholder = document.getElementById("placeholder-box")
const moviesPlaceholder = document.getElementById("movies-placeholder")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")

let watchlistMovies = []

async function getData() {
    const searchValue = searchInput.value
    moviesPlaceholder.innerHTML = ``
    const res = await fetch(`https://www.omdbapi.com/?apikey=99bb1601&s=${searchValue}`) 
    const data = await res.json()
    const dataArr = data.Search

    placeholder.remove()
    if(dataArr){
    dataArr.forEach(element => {
        fetch(`https://www.omdbapi.com/?apikey=99bb1601&i=${element.imdbID}`)
            .then(res => res.json())
            .then(data => {
                renderCards(data)
            })
    })
    }else {
        moviesPlaceholder.innerHTML = `
            <h2 class="error-text">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}

function renderCards(data) {
    moviesPlaceholder.innerHTML += `
        <div class="movie-card" id="${data.imdbID}">
            <img src="${data.Poster}" />
            <div class="movie-description">
                <div class="title">
                    <h2>${data.Title}</h2> <h5><span>⭐</span>${data.imdbRating}</h5>
                </div>
                <h5>${data.Runtime}</h5> <h5>${data.Genre}</h5> <h4 class="addToWatchlist" onclick="saveToWatchlist('${data.imdbID}')"><img src="/images/plusIcon.svg" />Watchlist</h4>
                <p>${data.Plot}</p>
            </div>
        </div>
    `
}
function saveToWatchlist(data) {
    if(localStorage.getItem("movieId")){
        watchlistMovies = JSON.parse(localStorage.getItem("movieId"))
        if(!watchlistMovies.includes(data)){
            watchlistMovies.push(data)
            localStorage.setItem("movieId", JSON.stringify(watchlistMovies))
        }
    } else {
        watchlistMovies.push(data);
        localStorage.setItem('movieId', JSON.stringify(watchlistMovies))
    }     
}


searchBtn.addEventListener("click", () => {
    getData()
    searchInput.value = ""
})