var express = require('express');
var router = express.Router();
const request = require('request');


const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next()
});

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
   const parsedData = JSON.parse(movieData);
    console.log(error);
   // console.log(movieData);
   res.render('index', {
    parsedData: parsedData.results
  });
    
  });
  
});


router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  
  request.get(thisMovieUrl, ( request, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('single-movie', {
      parsedData
    })
  });
  //res.send(thisMovieUrl);
});

module.exports = router;
