document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);

axios.get('/trips/getAll')
  .then((trips) => {
    trips.data.trips.forEach((elem, index) => {
      for (let i = 0; i < elem.stars; i++) {
        document.querySelectorAll('.mystery')[index].querySelectorAll('.fa-star')[i].classList.add('checked');
      }
    });
  });


$('.input-cart-number').on('keyup change', function () {
  $t = $(this);

  if ($t.val().length > 3) {
    $t.next().focus();
  }

  let card_number = '';
  $('.input-cart-number').each(function () {
    card_number += `${$(this).val()} `;
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  });

  $('.credit-card-box .number').html(card_number);
});

$('#card-holder').on('keyup change', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-holder').on('keyup change', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(() => {
  m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  m = (m < 10) ? `0${  m}` : m;
  y = $('#card-expiration-year').val().substr(2, 2);
  $('.card-expiration-date div').html(`${m  }/${  y}`);
});

$('#card-ccv').on('focus', () => {
  $('.credit-card-box').addClass('hover');
}).on('blur', () => {
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function () {
  $('.ccv div').html($(this).val());
});


/*--------------------
  CodePen Tile Preview
  --------------------*/
setTimeout(() => {
  $('#card-ccv').focus().delay(1000).queue(function () {
    $(this).blur().dequeue();
  });
}, 500);
