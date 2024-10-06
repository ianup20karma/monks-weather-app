// Provider : https://www.weatherapi.com/
// TO GET PAST CORS ERROR: Install this extension - https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

import { Astro, WeatherAPIResponse } from "../interfaces";

const WeatherAPIDetails: { baseURL: string, apiKey: string } = {
    baseURL: "https://api.weatherapi.com/v1",
    apiKey: "983d69e37b0942dfb28153215240510"
};


const RequestURLMapper: { [key: string]: string } = {
    "Current weather": "current.json",
    "Forecast": "forecast.json",
    "Search or Autocomplete": "search.json",
    "History": "history.json",
    "Alerts": "alerts.json",
    "Marine": "marine.json",
    "Future": "future.json",
    "Time Zone": "timezone.json",
    "Sports": "sports.json",
    "Astronomy": "astronomy.json",
    "IP Lookup": "ip.json"
};

const weatherAPIBaseRequestURL = `${WeatherAPIDetails.baseURL}/<requestURL>?key=${WeatherAPIDetails.apiKey}&q=<location>&days=<days>&aqi=<aqi>`;

async function fetchWeatherReport({ requestURL, location, days, aqi }: { requestURL: string, location: string, days: string, aqi: string }): Promise<WeatherAPIResponse> {
    let url = weatherAPIBaseRequestURL;
    const urlToQueryMap: { [key: string]: string } = { '<requestURL>': RequestURLMapper[requestURL], '<location>': location, '<days>': days, '<aqi>': aqi };
    Object.keys(urlToQueryMap).forEach((query: string) => url = url.replace(query, urlToQueryMap[query]));
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

function getFormattedDate(date: string) {
    const newDate = new Date(date);
    const today = newDate.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
    const weekDay = newDate.toLocaleDateString('en-US', { weekday: "long" });
    const time = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return { today, weekDay, time };
}

function getShortWeekDay(date: string) {
    const newDate = new Date(date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[newDate.getDay()];
}

function getCalculatedTime(apiResponse: WeatherAPIResponse, type: keyof Astro) {
    const date = new Date(`${apiResponse?.forecast?.forecastday[0]?.date} ${apiResponse?.forecast?.forecastday[0]?.astro?.[type]}`)
    return date;
}

export {
    WeatherAPIDetails,
    RequestURLMapper,
    weatherAPIBaseRequestURL,
    fetchWeatherReport,
    getFormattedDate,
    getShortWeekDay,
    getCalculatedTime
};