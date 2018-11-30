axios.get('/trips/getAll')
  .then((trips) => {
    trips.data.trips.forEach((elem, index) => {
      for (let i = 0; i < elem.stars; i++) {
        document.querySelectorAll('.mystery')[index].querySelectorAll('.fa-star')[i].classList.add('checked');
      }
    });
  });
