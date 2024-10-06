import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Card from '@mui/joy/Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Forecastday } from '../interfaces';
import { getFormattedDate, getShortWeekDay } from '../assets/ImprotantInfo';

export default function ForecastCardsDaily({ forecastArray, tempUnit }: { forecastArray: Forecastday[], tempUnit: string }) {
  return (
    <div className="container-box">
        <div className="small-container">
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={50} slidesPerView={5} autoHeight={true}
            navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }} pagination={{ clickable: true, dynamicBullets: true }}>
            {forecastArray?.map((dayWeather: Forecastday) => {
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
  )
}
