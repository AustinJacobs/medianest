import {
    config
} from "./config.js";

const BASE_URL = config.api_base_url
const API_KEY = config.api_key
const searchedMoviesDiv = document.getElementById("searched-movies");
const moviesDiv = document.getElementById("all-movies");
let searchButton = document.getElementById("search-button-movies");
const searchedTitles = document.getElementById("searched-titles");
let page = 1;

function topScroll() {
    let backToTop = document.querySelector(".back-top");

    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }

    backToTop.addEventListener('click', function toTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

searchButton.addEventListener("click", function () {
    let userQuery = document.getElementById("title_input").value;

    let searchURL = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${userQuery}&include_adult=false`

    async function fetchSearchedMovies() {
        let data = []

        const response = await fetch(searchURL)
        const responseData = await response.json()
        data = responseData.results

        searchedTitles.style.display = "block";
        searchedMoviesDiv.innerHTML = data.map(movie => renderSingleMovie(movie)).join("")

        document.querySelectorAll('.target').forEach(item => {
            item.addEventListener('click', e => {
                let path = e.currentTarget.getAttribute("id");

                async function getSingleFilm() {
                    let singleUrl = `${BASE_URL}movie/${path}?api_key=${API_KEY}`;
                    let film = [];
                    const response = await fetch(singleUrl);
                    const responseData = await response.json();
                    film = responseData;

                    document.getElementById("no-scroll").style.overflowY = "hidden";

                    let modalDiv = document.getElementById("modal");
                    modalDiv.style.display = "block";

                    let exitBtn = document.getElementById("exit");

                    let overlayPoster = document.createElement("img");
                    overlayPoster.setAttribute("src", config.image_base_url + film.poster_path)
                    overlayPoster.setAttribute("class", "overlayImage")

                    let overlayTitle = document.createElement("p");
                    overlayTitle.setAttribute("class", "overlayTitleStyle")
                    overlayTitle.innerHTML = film.title;

                    let overlayYear = document.createElement("p");
                    overlayYear.setAttribute("class", "overlayTinyStyle")
                    overlayYear.innerHTML = film.release_date.slice(0, -6);

                    let overlayGenre = document.createElement("p");
                    overlayGenre.setAttribute("class", "overlayTinyStyle")
                    overlayGenre.setAttribute("id", "genre")
                    overlayGenre.innerHTML = film.genres[1].name;

                    let overlayTime = document.createElement("p");
                    overlayTime.setAttribute("class", "overlayTinyStyle")
                    overlayTime.innerHTML = (film.runtime) + "min";

                    let overlayRating = document.createElement("p");
                    overlayRating.setAttribute("class", "overlayRatingStyle");
                    overlayRating.innerHTML = "Rating: " + film.vote_average + "/10";

                    let overlayOverview = document.createElement("p");
                    overlayOverview.setAttribute("class", "overlayOverviewStyle");
                    overlayOverview.innerHTML = film.overview;

                    let modalMain = document.getElementById("modal-content-main");

                    let modalTiny = document.createElement("div");
                    modalTiny.setAttribute("id", "modal-tiny-details");

                    modalMain.append(overlayPoster);
                    modalMain.append(overlayTitle);
                    modalMain.append(modalTiny);
                    modalTiny.append(overlayYear);
                    modalTiny.append(overlayGenre);
                    modalTiny.append(overlayTime);
                    modalMain.append(overlayRating);
                    modalMain.append(overlayOverview);


                    exitBtn.addEventListener("click", function () {
                        modalDiv.style.display = "none";
                        document.getElementById("no-scroll").style.overflowY = "auto";
                        overlayPoster.remove()
                        overlayTitle.remove()
                        modalTiny.remove()
                        overlayYear.remove()
                        overlayRating.remove()
                        overlayOverview.remove()
                    })
                }
                getSingleFilm()
            })
        })
    }
    fetchSearchedMovies();
})

async function fetchMovies(page = 1) {
    let allMoviesUrl = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    let data = []
    let error_message = document.querySelector(".errors");

    fetch(allMoviesUrl).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                error_message.style.display = "block";
            }
        })
        .then((data) => {
            // Do something with the response
            moviesDiv.innerHTML = data.results.map(movie => renderSingleMovie(movie)).join("");

            const lessButton = document.querySelector(".prev-content");
            lessButton.style.display = "none";
            if (data.page > 1) {
                lessButton.style.display = "block";
                lessButton.addEventListener("click", function () {
                    page--;
                    fetchMovies(page = page)
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                })
            }

            const moreButton = document.querySelector(".next-content");
            moreButton.addEventListener("click", function () {
                page++;
                fetchMovies(page = page)
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            })

            document.querySelectorAll('.target').forEach(item => {
                item.addEventListener('click', e => {
                    let path = e.currentTarget.getAttribute("id");

                    async function getSingleFilm() {
                        let singleUrl = `${BASE_URL}movie/${path}?api_key=${API_KEY}`;
                        let film = [];
                        const response = await fetch(singleUrl);
                        const responseData = await response.json();
                        film = responseData;

                        document.getElementById("no-scroll").style.overflowY = "hidden";

                        let modalDiv = document.getElementById("modal");
                        modalDiv.style.display = "block";

                        let exitBtn = document.getElementById("exit");

                        let overlayPoster = document.createElement("img");
                        overlayPoster.setAttribute("src", config.image_base_url + film.poster_path)
                        overlayPoster.setAttribute("class", "overlayImage")

                        let overlayTitle = document.createElement("p");
                        overlayTitle.setAttribute("class", "overlayTitleStyle")
                        overlayTitle.innerHTML = film.title;

                        let overlayYear = document.createElement("p");
                        overlayYear.setAttribute("class", "overlayTinyStyle")
                        overlayYear.innerHTML = film.release_date.slice(0, -6);

                        let overlayGenre = document.createElement("p");
                        overlayGenre.setAttribute("class", "overlayTinyStyle")
                        overlayGenre.innerHTML = film.genres[0].name;

                        let overlayTime = document.createElement("p");
                        overlayTime.setAttribute("class", "overlayTinyStyle")
                        overlayTime.innerHTML = (film.runtime) + "min";

                        let overlayRating = document.createElement("p");
                        overlayRating.setAttribute("class", "overlayRatingStyle");
                        overlayRating.innerHTML = "Rating: " + film.vote_average + "/10";

                        let overlayOverview = document.createElement("p");
                        overlayOverview.setAttribute("class", "overlayOverviewStyle");
                        overlayOverview.innerHTML = film.overview;

                        let modalMain = document.getElementById("modal-content-main");

                        let modalTiny = document.createElement("div");
                        modalTiny.setAttribute("id", "modal-tiny-details");

                        modalMain.append(overlayPoster);
                        modalMain.append(overlayTitle);
                        modalMain.append(modalTiny);
                        modalTiny.append(overlayYear);
                        modalTiny.append(overlayGenre);
                        modalTiny.append(overlayTime);
                        modalMain.append(overlayRating);
                        modalMain.append(overlayOverview);


                        exitBtn.addEventListener("click", function () {
                            modalDiv.style.display = "none";
                            document.getElementById("no-scroll").style.overflowY = "auto";
                            overlayPoster.remove()
                            overlayTitle.remove()
                            modalTiny.remove()
                            overlayYear.remove()
                            overlayRating.remove()
                            overlayOverview.remove()
                        })
                    }
                    getSingleFilm()
                })
            })
        })
}

function renderSingleMovie(movie) {
    if (movie.poster_path != null) {
        return (
            `
            <div class="media-div">
                <img id="${movie.id}" src="${config.image_base_url + movie.poster_path}" class="featured target" alt=${movie.title}>
                <p class="title-centered target">${movie.title}</p>
            </div>
            `
        )
    }
}
topScroll()
fetchMovies()