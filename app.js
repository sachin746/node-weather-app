var express =require("express");
const app=express();
const bodyParser = require('body-parser');
const request = require('request');


app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
  const city = 'Delhi';
  const apiKey='3692c718f9b2adeee2fc399580dad789';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, function (err, response, body) {
      if(err){
        res.render('home', {weather: null, error: 'Something went wrong, please try again',body:weather,urle:urle});
      }
      else {
          const weather = JSON.parse(body);
          console.log(weather);
          other={
            p:weather.main.pressure,
            h:weather.main.humidity,
            tm:weather.main.temp_min,
            tM:weather.main.temp_max
          }
          urle=`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
           if(weather.main == undefined){
            res.render('home', {weather: null, error: 'Error, please try again',other:other,body:weather,urle:urle});
          } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}, ${weather.sys.country}!`;
            res.render('home', {weather: weatherText, error: null,other:other,description:weather.weather[0].description,main:weather.weather[0].main,urle:urle});
          }
        }
  })
})

app.post('/', function (req, res) {
    const city = req.body.city;
    const apiKey='3692c718f9b2adeee2fc399580dad789';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if(err){
          res.render('home', {weather: null, error: 'Error, please try again',body:null,urle:null});
        }
        else {
            const weather = JSON.parse(body);
            console.log(weather);
            other={
            p:weather.main.pressure,
            h:weather.main.humidity,
            tm:weather.main.temp_min,
            tM:weather.main.temp_max}
            
            if(weather.cod == 404){
              res.render('home', {weather: null,other:other, error: 'Location not found',main:null,description:null,urle:null});
            } else{
            urle=`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            let weatherText = ` ${weather.main.temp} °C in ${weather.name}, ${weather.sys.country}!`;
            res.render('home', {weather: weatherText, other:other,error: null,description:weather.weather[0].description,main:weather.weather[0].main,urle:urle});
            }
          }
    })
})

port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running on port "+port)
})