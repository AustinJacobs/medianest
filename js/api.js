
import {
    config
} from "./config.js"

const BASE_URL = config.api_base_url
const API_KEY = config.api_key

export async function getTrendingMovies() {
    let data = []
    try {
        const response = await fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`)
        const responseData = await response.json()
        data = responseData.results
    } catch (error) {
        console.log(error)
    }
    return data
}

export async function getTopMovies() {
    let data = []
    try {
        const response = await fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`)
        const responseData = await response.json()
        data = responseData.results
    } catch (error) {
        console.log(error)
    }
    return data
}

export async function getUpcomingMovies() {
    let data = []
    try {
        const response = await fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`)
        const responseData = await response.json()
        data = responseData.results
    } catch (error) {
        console.log(error)
    }
    return data
}