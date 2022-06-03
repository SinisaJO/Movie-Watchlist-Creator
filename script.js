const placeholder = document.getElementById("placeholder-box")
const moviesPlaceholder = document.getElementById("movies-placeholder")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchLogoBtn = document.getElementById("search-btn-logo")

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
    const {imdbID, Plot, Poster, Runtime ,Genre, imdbRating, Title} = data
    moviesPlaceholder.innerHTML += `
        <div class="movie-card" id="${imdbID}">
            <img src="${Poster == "N/A" ? `https://assets.codepen.io/5515635/generic-movie-poster.jpg`: Poster}" />
            <div class="movie-description">
                <div class="title">
                    <h2>${Title}</h2> <h5><span>⭐</span>${imdbRating}</h5>
                </div>
                <h5>${Runtime}</h5> <h5>${Genre}</h5> <button class="addToWatchlist" id="${imdbID}"><img id="${imdbID}" class="card-img" src="/images/plusIcon.svg"/>Watchlist</button>
                <p>${Plot}</p>
            </div>
        </div>
    `
}

 moviesPlaceholder.addEventListener("click", (e) => {
    const target = e.target
    if(target.tagName === "BUTTON"){
        const url = "https://delightful-cocada-a459db.netlify.app"
        if(target.children[0].src == `${url}/images/plusIcon.svg`){
            target.children[0].src = `${url}/images/minusIcon.svg`
            saveToWatchlist(target.id)
        }else {
            target.children[0].src = `${url}/images/plusIcon.svg`
            removeFromWatchList(target.id)
        }     
    }
})

function removeFromWatchList(data){
    watchlistMovies.splice(watchlistMovies.indexOf(data), 1)
    localStorage.setItem("movieId", JSON.stringify(watchlistMovies))
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

function search(){
    getData()
    searchInput.value = ""
}

searchBtn.addEventListener("click", search)
searchLogoBtn.addEventListener("click", search)
