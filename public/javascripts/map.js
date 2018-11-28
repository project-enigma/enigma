function startMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 3,
          center: center || {
            lat: 41,
            lng: 41,
          },
        },
      );
      axios.get('/social/GetTrips')
        .then((res) => {
          res.data.myUser.reviews.forEach((elem) => {
            if (elem.location) {
              const infowindow = new google.maps.InfoWindow({
                content: `<h1>${elem.title}</h1>`,
              });
              const marker = new google.maps.Marker({
                position: new google.maps.LatLng({
                  lat: parseFloat(elem.location.lat),
                  lng: parseFloat(elem.location.lng),
                }),
                // icon: 'https://dl1.cbsistatic.com/i/r/2016/08/27/1e48396c-0da3-4ab7-8aa3-9b5205538916/thumbnail/64x64/154c8defdb5919fdf0f9ec1fce494d31/imgingest-1640293997453913673.png',
                map,
              });
              marker.addListener('click', () => {
                window.location.href = `/social/reviews/${elem._id}`;
              });
              marker.addListener('mouseover', () => {
                infowindow.open(map, marker);
              });
              marker.addListener('mouseout', () => {
                infowindow.close();
              });
            }
          });
        })
        .catch(err => console.log(err));
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}


window.onload = () => {
  startMap();
};
