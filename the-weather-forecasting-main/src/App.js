import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Link, SvgIcon, Typography, Divider } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/sun-Photoroom.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import GitHubIcon from '@mui/icons-material/GitHub';
import Footer from "./components/Reusable/Footer";

import { getTodayForecastWeather, getWeekForecastWeather } from './utilities/DataUtils';

const ISTDatetime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const formatISTDate = (date) => {
   
    const istDate = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
    
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC', 
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(istDate) + ' IST'; 
  };

  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontFamily: 'Poppins',
        fontSize: { xs: '13px', sm: '13px' },
        color: 'rgba(0, 0, 0, 0.8)',
        lineHeight: 1,
        paddingLeft: '0.1rem',
      }}
    >
      {formatISTDate(dateTime)}
    </Typography>
  );
};

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(weekForecastResponse, currentDate, dt_now);
      const all_week_forecasts_list = getWeekForecastWeather(weekForecastResponse, ALL_DESCRIPTIONS);

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({ city: enteredData.label, list: all_week_forecasts_list });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let splashContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ 
          fontSize: { xs: '130px', sm: '160px', md: '180px' },  
          color: 'lavenderblush'  
        }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(1, 1, 1, 0.85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
          fontWeight: 500,
        }}
      >
        Explore current weather forecast and 6-day forecast for more than 200,000 cities!
      </Typography>
    </Box>
  );

  let mainContent = null;
  let weeklyForecastContent = null;

  if (isLoading) {
    mainContent = (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" minHeight="500px">
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '13px', sm: '15px' },
              color: 'lavenderblush', 
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  } else if (error) {
    mainContent = <ErrorBox margin="3rem auto" flex="inherit" errorMessage="Something went wrong" />;
  } else if (todayWeather && todayForecast) {
    mainContent = (
      <TodayWeather data={todayWeather} forecastList={todayForecast} />
    );
    
    if (weekForecast) {
      weeklyForecastContent = (
        <>
          <Divider 
            sx={{ 
              my: 4, 
              borderColor: 'lavenderblush', 
              width: '100%',
              '&::before, &::after': {
                borderColor: 'lavenderblush', 
              }
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{
                px: 2,
                color: 'lavenderblush', 
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.2rem' }
              }}
            >
              Extended Forecast
            </Typography>
          </Divider>
          
          <WeeklyForecast data={weekForecast} />
        </>
      );
    }
  }

  return (
    <>
      <Container
        sx={{
          maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
          width: '100%',
          margin: '0 auto',
          padding: '1rem 0 3rem',
          borderRadius: { xs: 'none', sm: '0 0 1rem 1rem' },
          boxShadow: {
            xs: 'none',
            sm: 'rgba(0, 0, 0, 0.7) 0px 10px 15px -3px, rgba(0,0,0, 0.7) 0px 4px 6px -2px',
          },
        }}
      >
        <Grid container columnSpacing={2}>
        
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%', marginBottom: '1rem' }}>
              <Box
                component="img"
                sx={{
                  height: { xs: '28px', sm: '30px', md: '32px' }, 
                  width: 'auto',
                }}
                alt="logo"
                src={Logo}
              />

              <ISTDatetime />
              <Link href="https://github.com/sammy0318" target="_blank" underline="none" sx={{ display: 'flex' }}>
                <GitHubIcon
                  sx={{
                    fontSize: { xs: '32px', sm: '32px', md: '32px' }, 
                    color: 'lavenderblush', 
                    '&:hover': { color: '#2d95bd' },
                  }}
                />
              </Link>
            </Box>
            <Search onSearchChange={searchChangeHandler} />
          </Grid>
          
         
          <Grid item xs={12}>
           
            {!todayWeather && !isLoading && !error && splashContent}
            
        
            {mainContent}
            
            
            {weeklyForecastContent}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default App;