const placeholder = document.getElementById("placeholder-box")
const moviesPlaceholder = document.getElementById("movies-placeholder")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchLogoBtn = document.getElementById("search-btn-logo")

let watchlistMovies = []

if(localStorage.getItem("movieId")){
    watchlistMovies = JSON.parse(localStorage.getItem("movieId"))
    document.getElementById("movies-count").textContent = watchlistMovies.length
}

async function getData() {
    try {
        const searchValue = searchInput.value
        moviesPlaceholder.innerHTML = ``
        const res = await fetch(`https://www.omdbapi.com/?apikey=99bb1601&s=${searchValue}`) 
        const data = await res.json()
        const dataArr = data.Search
        placeholder.remove()
        if(dataArr){
            dataArr.forEach(async(element) => {
                const response = await fetch(`https://www.omdbapi.com/?apikey=99bb1601&i=${element.imdbID}`)
                const data = await response.json()  
                renderCards(data)
            })
        }else {
            moviesPlaceholder.innerHTML = renderOnError()
        }
    }catch(error){
        console.error("Something went wrong!")
        moviesPlaceholder.innerHTML = renderOnError()
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
                <h5>${Runtime}</h5> <h5>${Genre}</h5> <button class="addToWatchlist" id="${imdbID}"><img id="${imdbID}" class="card-img" src="${watchlistMovies.includes(imdbID) ? '/images/minusIcon.svg' : '/images/plusIcon.svg'}"/>Watchlist</button>
                <p>${Plot}</p>
            </div>
        </div>
    `
}

function renderOnError(){
    return `<h2 class="error-text">Unable to find what you’re looking for. Please try another search.</h2>`
}

moviesPlaceholder.addEventListener("click", (e) => {
    const target = e.target
    const url = "http://127.0.0.1:5500"
    if(target.tagName === "BUTTON"){
        if(target.children[0].src == `${url}/images/plusIcon.svg`){
            target.children[0].src = `${url}/images/minusIcon.svg`
            saveToWatchlist(target.id)
            document.getElementById("movies-count").textContent = watchlistMovies.length
        }else {
            target.children[0].src = `${url}/images/plusIcon.svg`
            removeFromWatchList(target.id)
            document.getElementById("movies-count").textContent = watchlistMovies.length
        }     
    }
})

function removeFromWatchList(dataId){
    watchlistMovies.splice(watchlistMovies.indexOf(dataId), 1)
    localStorage.setItem("movieId", JSON.stringify(watchlistMovies))
}

function saveToWatchlist(dataId) {
    if(localStorage.getItem("movieId")){
        watchlistMovies = JSON.parse(localStorage.getItem("movieId"))
        if(!watchlistMovies.includes(dataId)){
            watchlistMovies.push(dataId)
            localStorage.setItem("movieId", JSON.stringify(watchlistMovies))
        }
    } else {
        watchlistMovies.push(dataId);
        localStorage.setItem('movieId', JSON.stringify(watchlistMovies))
    }   
}

function search(){
    getData()
    searchInput.value = ""
}

searchBtn.addEventListener("click", search)
searchLogoBtn.addEventListener("click", search)