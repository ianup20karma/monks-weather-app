import './App.scss'
import { useEffect, useState } from 'react'
import { WeatherAPIResponse } from './interfaces';
import { fetchWeatherReport, getCalculatedTime, getFormattedDate } from './assets/ImprotantInfo';
import TempToggle from './components/TempToggle';
import RainSVG from './assets/Rain.svg';
import WindDirection from './assets/wind-direction-icon.svg';
import Humidity from './assets/hum.svg';
import Frame from './assets/Frame.svg';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DynamicClock from './components/DynamicClock';
import { StaticClock } from './components/StaticClock';
import ForecastToggle from './components/ForecastToggle';
import ForecastCardsHourly from './components/ForecastCardsHourly';
import ForecastCardsDaily from './components/ForecastCardsDaily';

function App() {
    const [localTime, setLocalTime] = useState<Date>(new Date("2024-10-05 13:10"));
    const [apiResponse, setApiResponse] = useState<WeatherAPIResponse>({} as WeatherAPIResponse);
    const [tempUnit, setTempUnit] = useState<string>('Celsius');
    const [forecastUnit, setForecastUnit] = useState<string>('DAILY');
    const [loading, setLoading] = useState<boolean>(true);
    const [today, setToday] = useState<string>("");
    const [weekDay, setWeekDay] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [inputValue, setInputValue] = useState('');
    const requestParams = { requestURL: "Forecast", location: "New Delhi", days: "15", aqi: "yes" };

    useEffect(() => {
      setLoading(true);
      getWeatherInfo();
    }, [])

    const getWeatherInfo = () => {
      if (inputValue || requestParams.location) {
        fetchWeatherReport(requestParams).then(res => {
          setApiResponse(res);
          setLocalTime(new Date(res.location.localtime));
          const { today, weekDay, time } = getFormattedDate(res.location.localtime);
          setToday(today);
          setWeekDay(weekDay);
          setTime(time);
          setLoading(!loading);
        })
      }
    }

    const handleChange = (event: React.ChangeEvent) => {
      setInputValue((event.target as HTMLInputElement).value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) { handleSearchIconClick(); }
    }

    const handleSearchIconClick = () => {
      requestParams.location = inputValue;
      getWeatherInfo();
      setInputValue("")
    }

    const handleSearchBarSubmit = (event: any) => {
      event?.preventDefault(); handleSearchIconClick();
    }

    const searchBarStyles = {
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      minWidth: 40,
    }

    const dividerStyles= {
      marginTop: "73%",
      borderWidth: "1px",
      borderColor: "#FFFFFF",
      opacity: "0.5",
      borderRadius: "100px",
    }

    return (
      <div className="app-wrapper">
        <div className="weather-report">
          <div className="temp-units">
            <TempToggle tempUnit={tempUnit} setTempUnit={setTempUnit} />
          </div>
          <div className="temp-and-units">
            <div className="icon-and-text">
              <img src={apiResponse?.current?.condition.icon} alt="" />
              <span>{apiResponse?.current?.condition.text}</span>
            </div>
            <span className="temp">
              {
                apiResponse?.current?.[
                  tempUnit == "Celsius" ? "temp_c" : "temp_f"
                ]
              }
            </span>
            <span className="unit">{tempUnit == "Celsius" ? "°C" : "°F"}</span>
          </div>
          <div className="date-and-time">
            <div className="today">{today}</div>
            <div className="weekday-and-time">
              {weekDay} {time}
            </div>
          </div>
          <div className="weather-stats">
            <span>
              <img src={WindDirection} />
              <span>Wind</span>
              {`${apiResponse?.current?.wind_kph} km/h`}
            </span>
            <span>
              <img src={Humidity} />
              <span>Humidity</span>
              {`${apiResponse?.current?.humidity} %`}
            </span>
            <span>
              <img src={RainSVG} />
              <span>Precipitation</span>
              {`${apiResponse?.current?.precip_mm} mm`}
            </span>
          </div>
          <ForecastToggle
            forecastUnit={forecastUnit}
            setForecastUnit={setForecastUnit}
          />
          <div className="cards">
            {forecastUnit == "DAILY" ? <ForecastCardsDaily forecastArray={apiResponse?.forecast?.forecastday} tempUnit={tempUnit} />
             : <ForecastCardsHourly forecastArray={apiResponse?.forecast?.forecastday[0]?.hour} tempUnit={tempUnit} />}
          </div>
        </div>
        <div className="sidebar">
          <div className="location-wrapper">
            <span className="location">
              <img src={Frame} alt="" />
              <span>{`${apiResponse?.location?.name}, ${apiResponse?.location?.country}`}</span>
            </span>
            <Paper onSubmit={handleSearchBarSubmit} className="search-bar" component="form" sx={searchBarStyles}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter Location" value={inputValue} onChange={handleChange} onKeyDown={handleKeyPress}/>
              <IconButton type="button" sx={{ p: "10px" }} onClick={handleSearchIconClick}><SearchIcon /></IconButton>
            </Paper>
          </div>
          <div className="clock-labels">
            <span className="sunrise-clock">Sunrise</span>
            <span className="sunset-clock">Sunset</span>
          </div>
          {apiResponse && apiResponse?.location && (
            <div className="clocks">
              <StaticClock time={getCalculatedTime(apiResponse, "sunrise")} />
              <DynamicClock time={localTime} setTime={setLocalTime} />
              <StaticClock time={getCalculatedTime(apiResponse, "sunset")} />
            </div>
          )}
          <div className="clock-values">
            <span className="sunrise-value">{apiResponse?.forecast?.forecastday[0]?.astro?.sunrise}</span>
            <span className="sunset-value">{apiResponse?.forecast?.forecastday[0]?.astro?.sunset}</span>
          </div>
          <Divider sx={dividerStyles} />
          <div className="AQI-stats-wrapper">
            <h1>AIR QUALITY INDEX</h1>
            <div className="AQI-stats">
              <span>
                <span>CO</span>
                <strong>{`${apiResponse?.current?.air_quality?.co}`}</strong>
              </span>
              <span>
                <span>NO2</span>
                <strong>{`${apiResponse?.current?.air_quality?.no2}`}</strong>
              </span>
              <span>
                <span>O3</span>
                <strong>{`${apiResponse?.current?.air_quality?.o3}`}</strong>
              </span>
              <span>
                <span>UV</span>
                <strong>{`${apiResponse?.current?.uv}`}</strong>
              </span>
            </div>
            <div className="AQI-stats">
              <span>
                <span>PM2.5</span>
                <strong>{`${apiResponse?.current?.air_quality?.pm2_5}`}</strong>
              </span>
              <span>
                <span>PM10</span>
                <strong>{`${apiResponse?.current?.air_quality?.pm10}`}</strong>
              </span>
              <span>
                <span>SO2</span>
                <strong>{`${apiResponse?.current?.air_quality?.so2}`}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App
