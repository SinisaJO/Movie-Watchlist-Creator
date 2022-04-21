const moviesPlaceholder = document.getElementById("movies-placeholder")
const placeholder = document.getElementById("placeholder-box")
let dataArr = (JSON.parse(localStorage.getItem("movieId")))

if(dataArr.length === 0){
    localStorage.clear()
}

getData()
function getData() {  
    if (dataArr.length){
        placeholder.style.display = "none"
        dataArr.forEach(element => {
            fetch(`https://www.omdbapi.com/?apikey=99bb1601&i=${element}`)
                .then(res => res.json())
                .then(data => {
                    renderCards(data)
                })
        })
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
                <h5>${data.Runtime}</h5> <h5>${data.Genre}</h5> <h4 class="addToWatchlist" id="${data.imdbID}"><img src="/images/plusIcon.svg"/>Remove from watchlist</h4>
                <p>${data.Plot}</p>
            </div>
        </div>
    `
}

moviesPlaceholder.addEventListener("click", (e) => {
    const target = e.target
    if (target.tagName === "H4"){
        if (dataArr.includes(target.id)){
            const movieId = (element) => element === target.id
            const movieIndex = dataArr.findIndex(movieId)
            dataArr.splice(movieIndex, 1)
            localStorage.setItem("movieId", JSON.stringify(dataArr))
            location.reload(); 
        }
    }
})


