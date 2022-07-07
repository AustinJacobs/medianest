import {
    getTopMovies,
    getTrendingMovies,
    getUpcomingMovies
} from "./api.js";
import {
    config
} from "./config.js";

const trendingMovieDiv = document.getElementById("trending-movies");
const topMovieDiv = document.getElementById("top-movies");
const upcomingMovies = document.getElementById("upcoming-movies");
const BASE_URL = config.api_base_url
const API_KEY = config.api_key


export async function renderTrendingMovies() {
    const movies = await getTrendingMovies()
    trendingMovieDiv.innerHTML = movies.map(movie => renderSingleMovie(movie)).join("")
}

export async function renderTopMovies() {
    const movies = await getTopMovies()
    topMovieDiv.innerHTML = movies.map(movie => renderSingleMovie(movie)).join("")
}

export async function renderUpcomingMovies() {
    const movies = await getUpcomingMovies()
    upcomingMovies.innerHTML = movies.map(movie => renderSingleMovie(movie)).join("")

    document.querySelectorAll('.target').forEach(item => {
        item.addEventListener('click', e => {
            let path = e.currentTarget.getAttribute("id");

            async function getSingleFilm() {
                let singleUrl = `${BASE_URL}movie/${path}?api_key=${API_KEY}`;
                let film = [];
                const response = await fetch(singleUrl);
                const responseData = await response.json();
                film = responseData;
                console.log(film);

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
}

function renderSingleMovie(movie) {
    if (movie.poster_path != null) {
        return (
            `
            <div class="media-div">
                <img id="${movie.id}" src="${config.image_base_url + movie.poster_path}" class="featured target" alt=${movie.title}>
            </div>
            `
        )
    }
}