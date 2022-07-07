import {
    config,
} from "./config.js";

const BASE_URL = config.api_base_url
const API_KEY = config.api_key
const searchedSeriesDiv = document.getElementById("searched-series");
const seriesDiv = document.getElementById("all-series");
let searchButton = document.getElementById("search-button-series");
const searchedTitles = document.getElementById("searched-titles-tv");
let page = 1;

function topScroll() {
    let backToTop = document.querySelector(".back-top");

    // When the user scrolls down 20px from the top of the document, show the button
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

    backToTop.addEventListener('click', function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
}

searchButton.addEventListener("click", function () {
    let userQuery = document.getElementById("title_input_tv").value;

    let searchURL = `${BASE_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${userQuery}&include_adult=false`

    async function fetchSearchedSeries() {
        let data = []
        try {
            const response = await fetch(searchURL)
            const responseData = await response.json()
            data = responseData.results
        } catch (error) {

        }
        searchedTitles.style.display = "block";
        searchedSeriesDiv.innerHTML = data.map(tv => renderSingleShow(tv)).join("")

        document.querySelectorAll('.target').forEach(item => {
            item.addEventListener('click', e => {
                let path = e.currentTarget.getAttribute("id");

                async function getSingleShow() {
                    let singleUrl = `${BASE_URL}tv/${path}?api_key=${API_KEY}`;
                    let show = [];
                    const response = await fetch(singleUrl);
                    const responseData = await response.json();
                    show = responseData;

                    document.getElementById("no-scroll").style.overflowY = "hidden";

                    let modalDiv = document.getElementById("modal");
                    modalDiv.style.display = "block";

                    let exitBtn = document.getElementById("exit");

                    let overlayPoster = document.createElement("img");
                    overlayPoster.setAttribute("src", config.image_base_url + show.poster_path)
                    overlayPoster.setAttribute("class", "overlayImage")

                    let overlayTitle = document.createElement("p");
                    overlayTitle.setAttribute("class", "overlayTitleStyle")
                    overlayTitle.innerHTML = show.name;

                    let overlayYear = document.createElement("p");
                    overlayYear.setAttribute("class", "overlayTinyStyle")
                    overlayYear.innerHTML = show.first_air_date.slice(0, -6);

                    let overlayGenre = document.createElement("p");
                    overlayGenre.setAttribute("class", "overlayTinyStyle")
                    overlayGenre.innerHTML = show.genres[0].name;

                    let overlayTime = document.createElement("p");
                    overlayTime.setAttribute("class", "overlayTinyStyle")
                    overlayTime.innerHTML = (show.episode_run_time) + "min";

                    let overlayRating = document.createElement("p");
                    overlayRating.setAttribute("class", "overlayRatingStyle");
                    overlayRating.innerHTML = "Rating: " + show.vote_average + "/10";

                    let overlayOverview = document.createElement("p");
                    overlayOverview.setAttribute("class", "overlayOverviewStyle");
                    overlayOverview.innerHTML = show.overview;

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
                getSingleShow()
            })
        })
    }
    fetchSearchedSeries();
})

async function fetchSeries() {
    let allSeriesUrl = `${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    let data = []
    let error_message = document.querySelector(".errors");

    fetch(allSeriesUrl).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                error_message.style.display = "block";
            }
        })
        .then((data) => {
            seriesDiv.innerHTML = data.results.map(tv => renderSingleShow(tv)).join("")

            const lessButton = document.querySelector(".prev-content");
            lessButton.style.display = "none";
            if (data.page > 1) {
                lessButton.style.display = "block";
                lessButton.addEventListener("click", function () {
                    page--;
                    fetchSeries(page = page)
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                })
            }

            const moreButton = document.querySelector(".next-content");
            moreButton.addEventListener("click", function () {
                page++;
                fetchSeries(page = page)
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            })

            document.querySelectorAll('.target').forEach(item => {
                item.addEventListener('click', e => {
                    let path = e.currentTarget.getAttribute("id");

                    async function getSingleShow() {
                        let singleUrl = `${BASE_URL}tv/${path}?api_key=${API_KEY}`;
                        let show = [];
                        const response = await fetch(singleUrl);
                        const responseData = await response.json();
                        show = responseData;

                        document.getElementById("no-scroll").style.overflowY = "hidden";

                        let modalDiv = document.getElementById("modal");
                        modalDiv.style.display = "block";

                        let exitBtn = document.getElementById("exit");

                        let overlayPoster = document.createElement("img");
                        overlayPoster.setAttribute("src", config.image_base_url + show.poster_path)
                        overlayPoster.setAttribute("class", "overlayImage")

                        let overlayTitle = document.createElement("p");
                        overlayTitle.setAttribute("class", "overlayTitleStyle")
                        overlayTitle.innerHTML = show.name;

                        let overlayYear = document.createElement("p");
                        overlayYear.setAttribute("class", "overlayTinyStyle")
                        overlayYear.innerHTML = show.first_air_date.slice(0, -6);

                        let overlayGenre = document.createElement("p");
                        overlayGenre.setAttribute("class", "overlayTinyStyle")
                        overlayGenre.innerHTML = show.genres[0].name;

                        let overlayTime = document.createElement("p");
                        overlayTime.setAttribute("class", "overlayTinyStyle")
                        overlayTime.innerHTML = (show.episode_run_time) + "min";

                        let overlayRating = document.createElement("p");
                        overlayRating.setAttribute("class", "overlayRatingStyle");
                        overlayRating.innerHTML = "Rating: " + show.vote_average + "/10";

                        let overlayOverview = document.createElement("p");
                        overlayOverview.setAttribute("class", "overlayOverviewStyle");
                        overlayOverview.innerHTML = show.overview;

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
                    getSingleShow()
                })
            })
        })
}

function renderSingleShow(tv) {
    if (tv.poster_path != null) {
        return (
            `
            <div class="media-div">
                <img id="${tv.id}" src="${config.image_base_url + tv.poster_path}" class="featured target" alt=${tv.name}>
                <p class="title-centered">${tv.name}</p>
            </div>
            `
        )
    }
}

topScroll()
fetchSeries();