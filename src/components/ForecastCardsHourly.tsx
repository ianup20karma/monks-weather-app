import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Card from '@mui/joy/Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Hour } from '../interfaces';
import { getFormattedDate } from '../assets/ImprotantInfo';

export default function ForecastCardsHourly({ forecastArray, tempUnit }: { forecastArray: Hour[], tempUnit: string }) {
  return (
    <div className="container-box">
        <div className="small-container">
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={50} slidesPerView={5} autoHeight={true}
            navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }} pagination={{ clickable: true, dynamicBullets: true }}>
            {forecastArray?.map((hourWeather: Hour) => {
                return <SwiperSlide key={hourWeather.time_epoch}>
                    <Card className="weather-card">
                    <span>{tempUnit == "Celsius" ? `${hourWeather.temp_c}°C` : `${hourWeather.temp_f}°F` }</span>
                    <img src={hourWeather.condition.icon}></img>
                    <span>{hourWeather.condition.text}</span>
                    <span>{getFormattedDate(hourWeather.time).time}</span>
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
