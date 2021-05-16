$(document).ready(function () {
  let objs = {};
  $('input').change(function () {
    /* alert('Function input'); */
    if ($(this).is(':checked')) {
      objs[$(this).attr("data-name")] = $(this).attr("data-id");
    } else if ($(this).is(':not(:checked)')) {
      delete objs[$(this).attr("data-name")]
    }
    let content = Object.keys(objs)
    $(".amenities h4").text(content)


    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === OK) {
        $("#api_status").addClass("available")
      }
    });
    $(".container button").click(function () {
      $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        success: function (data) {
          for (const place of data) {
            let place_ = `<article>
                          <div class="title_box">
                              <h2>${place.name}</h2>
                              <div class="price_by_night">${place.price_by_night}</div>
                          </div>
                          <div class="information">
                              <div class="max_guest">${place.max_guest} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
                              <div class="number_rooms">${place.number_rooms} Bedroom{% if place.number_rooms != 1 %}s{% endif
                                  %}</div>
                              <div class="number_bathrooms">${place.number_bathrooms} Bathroom{% if place.number_bathrooms != 1
                                  %}s{% endif %}</div>
                          </div>
                          <div class="user">
                              <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                          </div>
                          <div class="description">
                              ${place.description | safe}
                          </div>
                        </article>`;
            $('SECTION.places').append(place_);
          }
        }
      data = JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
      });
    });
  });
});