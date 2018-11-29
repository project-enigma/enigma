function startMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 3,
      center: {
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
            icon: '/images/map-pin.png',
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
}


window.onload = () => {
  startMap();
};
