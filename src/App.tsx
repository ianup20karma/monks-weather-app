import './App.scss'
import Clock from './components/Clock';
import { useEffect, useState } from 'react'
import { WeatherAPIResponse } from './interfaces';
import { fetchWeatherReport, getFormattedDate, getShortWeekDay } from './assets/ImprotantInfo';
import TempToggle from './components/TempToggle';
import RainSVG from './assets/Rain.svg';
import WindDirection from './assets/wind-direction-icon.svg';
import Humidity from './assets/hum.svg';
import Frame from './assets/Frame.svg';
import Card from '@mui/joy/Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function App() {
    const [localTime, setLocalTime] = useState<Date>(new Date("2024-10-05 13:10"));
    const [apiResponse, setApiResponse] = useState<WeatherAPIResponse>({} as WeatherAPIResponse);
    const [tempUnit, setTempUnit] = useState<string>('Celsius');
    const [loading, setLoading] = useState<boolean>(true);
    const [today, setToday] = useState<string>("");
    const [weekDay, setWeekDay] = useState<string>("");
    const [time, setTime] = useState<string>("");
    // const swiperRef = useRef<SwiperContainer>(null);

    useEffect(() => {
      setLoading(true);
      const requestParams = { requestURL: "Forecast", location: "New Delhi", days: "15", aqi: "yes" };
      fetchWeatherReport(requestParams).then(res => {
        setApiResponse(res);
        setLocalTime(new Date(res.location.localtime));
        const { today, weekDay, time } = getFormattedDate(res.location.localtime);
        setToday(today);
        setWeekDay(weekDay);
        setTime(time);
        // adjustSwiperArrows();
        setLoading(!loading);
      })
    }, [])

    // const adjustSwiperArrows = () => {
      // const swiperContainer = swiperRef.current;
      // const params = {
      //   navigation: true,
      //   pagination: true,
      //   injectStyles: [
      //     `
      //       .swiper-button-next,
      //       .swiper-button-prev {
      //         background-color: white;
      //         padding: 8px 16px;
      //         border-radius: 100%;
      //         border: 2px solid black;
      //         color: red;
      //       }
      //       .swiper-pagination-bullet{
      //         width: 40px;
      //         height: 40px;
      //         background-color: red;
      //       }
      //     `,
      //   ],
      // };
      // Object.assign(swiperContainer, params);
      // (swiperContainer as any)?.initialize();
      
    // }
    
    return (
      <div className='app-wrapper'>
        <div className='weather-report'>
          <div className="temp-units">
            <TempToggle tempUnit={tempUnit} setTempUnit={setTempUnit}/>
          </div>
          <div className="temp-and-units">
            <div className='icon-and-text'><img src={apiResponse?.current?.condition.icon} alt="" /><span>{apiResponse?.current?.condition.text}</span></div>
            <span className='temp'>{apiResponse?.current?.[tempUnit == "Celsius" ? "temp_c" : "temp_f" ]}</span>
            <span className='unit'>{tempUnit == "Celsius" ? "°C" : "°F" }</span>
          </div>
          <div className="date-and-time">
            <div className='today'>{today}</div>
            <div className='weekday-and-time'>
              {weekDay} {time}
            </div>
          </div>
          <div className='weather-stats'>
            <span><img src={WindDirection} /><span>Wind</span>{`${apiResponse?.current?.wind_kph} km/h`}</span>
            <span><img src={Humidity} /><span>Humidity</span>{`${apiResponse?.current?.humidity} %`}</span>
            <span><img src={RainSVG} /><span>Precipitation</span>{`${apiResponse?.current?.precip_mm} mm`}</span>
          </div>
          <div className='cards'>
            <div className="container-box">
              <div className="small-container">
                <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={50} slidesPerView={5} autoHeight={true}
                  navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }} pagination={{ clickable: true, dynamicBullets: true }}>
                  {apiResponse?.forecast?.forecastday?.map(dayWeather => {
                    return <SwiperSlide key={dayWeather.date_epoch}>
                      <Card className="weather-card">
                        <span>{tempUnit == "Celsius" ? `${dayWeather.day.avgtemp_c}°C` : `${dayWeather.day.avgtemp_f}°F` }</span>
                        <img src={dayWeather.day.condition.icon}></img>
                        <span>{getShortWeekDay(dayWeather.date)}</span>
                        <span>{getFormattedDate(dayWeather.date).today}</span>
                      </Card>
                    </SwiperSlide>
                  })}
                </Swiper>
              </div>
              <button className="arrow-left"><NavigateBeforeIcon /></button>
              <button className="arrow-right"><NavigateNextIcon /></button>
            </div>
          </div>
        </div>
        <div className='sidebar'>
          <div className='location-wrapper'>
            <span className='location'><img src={Frame} alt="" /><span>{`${apiResponse?.location?.name}, ${apiResponse?.location?.country}`}</span></span>
            <Paper className='search-bar' component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 40 }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter Location" />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div className="clocks">
            <Clock updatable={false} time={new Date(`${apiResponse?.forecast?.forecastday[0]?.date} ${apiResponse?.forecast?.forecastday[0]?.astro?.sunrise}`)} />
            <Clock updatable time={localTime} setTime={setLocalTime} />
            <Clock updatable={false} time={new Date(`${apiResponse?.forecast?.forecastday[0]?.date} ${apiResponse?.forecast?.forecastday[0]?.astro?.sunrise}`)} />
          </div>
        </div>
      </div>
    )
}

export default App
