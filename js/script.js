
var API_KEY = "f58ac69057a6cd8b75abd4f2ee048ef0"; // constant
var fahr = false; //fahrenheit
var w_data;

function displayTemp(cTemp, f){
	if(f) return Math.round(((cTemp *9) /5) + 32) + "F"; // Math.round() rounds up to nearest integer
	return cTemp + "C";
}

function render(w_data, fahr){
	//declare variables from JSON file
  	var currentLocation = w_data.name; //name taken from JSON file
  	var currentWeather = w_data.weather[0].description; //data in weather object held in array at position 0.
  	var currentTemp = displayTemp(w_data.main.temp, fahr); //passing through displayTemp function.
  	var high = displayTemp(w_data.main.temp_max, fahr);
  	var low = displayTemp(w_data.main.temp_min, fahr);
  	var icon = w_data.weather[0].icon;


  	$('#currentLocation').html(currentLocation); // use id selector from html file to display location
  	$('#currentTemp').html(currentTemp);
  	$('#currentWeather').html(currentWeather);
  	$('#high-low').html(high + "/" + low); // high low combined to single id in html

  	var iconSrc = "http://openweathermap.org/img/w/" + icon + '.png'; //set to icon
  	$('#currentTemp').prepend('<img src="' + iconSrc + '">'); 

}

$(document).ready(function(){

	var loc; //location

	$.getJSON('http://ipinfo.io', function(data){
  		console.log("assigning the data...");
  		loc = data.loc.split(",");  //location property, default is string with lat lon values, .split (",") is returning as array for use in weather API.
  		console.log(loc);

  		$.getJSON('http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + loc[0] + '&lon=' + loc[1] +'&APPID=' + API_KEY, function(apiData){
  			w_data = apiData; //set global variable to apiData

  		render(apiData, fahr); //call function

	  		$('#toggle').click(function(){
	  			fahr = !fahr;
	  			render(w_data, fahr);
	  		})	

  		})


	});


});