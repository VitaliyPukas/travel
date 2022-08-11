
// window.onload = function() {

// let map;
// navigator.geolocation.getCurrentPosition(getLocation)
// function getLocation(position) {
    
//     map = new google.maps.Map(document.getElementById("googleMap"), {
//          mapOptions = {
//         center: { lat: position.coords.latitude, lng: position.coords.longitude },
//         zoom: 18,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     }
        
//       });

// };
// ---------------------------------------------------------------------------------------------------------




    ﻿//javascript.js
//set map options


var myLatLng = { lat: 49.842957, lng: 24.031111};
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

}



//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//Створіть цільовий об'єкт, щоб використовувати метод маршруту та отримати результат для нашого запиту
var directionsService = new google.maps.DirectionsService();

//Створіть об'єкт direxionrender, який ми будемо використовувати для відображення маршруту
var directionsDisplay = new google.maps.DirectionsRenderer();

//Зв'язати directiesrender до карти
directionsDisplay.setMap(map);


//Визначте функцію CALCROUTE
function calcRoute() {
    //Створити запит
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //Передайте запит на метод маршруту
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Отримати відстань і час
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>Від: " + document.getElementById("from").value + ".<br />До: " + document.getElementById("to").value + ".<br /> Відстань <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + "<br />Тривалість<i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //Відображати маршрут
            directionsDisplay.setDirections(result);
        } else {
            //Видалити маршрут з карти
            directionsDisplay.setDirections({ routes: [] });
            //Карта центру у Лондоні
            map.setCenter(myLatLng);

            //Показати повідомлення про помилку
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Не вдалося отримати відстань.</div>";
        }
    });

}



//Створіть автозаповнення об'єктів для всіх входів
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

