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
    console.log(content)
    $(".amenities h4").text(content)
  });
});
