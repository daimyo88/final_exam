$(function () {
  var searchCont = $("#act_cont");
  var input = $(".act__form input");

  function search() {
    searchCont.html('');
    searchCont.masonry('destroy');

    var searchQuery = input.val();
    var URL =
      "https://pixabay.com/api/?key=3548591-78eba01a0681de5f0029bee84&q=" +
      searchQuery + "&per_page=7";

    $.ajax({
        url: URL,
        dataType: 'jsonp'
      })
      .success(function (data) {
        if(data.totalHits == 0) {
          searchCont.html(
            "Sorry, we could'nt find any image on your request:(");
          return;
        }

        var template = $("#masonry-template").html();
        var newData = tmpl(template, {
          data: data
        });

        searchCont.append(newData);
        searchCont.masonry({
          itemSelector: '.masonry__cont',
          columnWidth: '.masonry__cont'

        });
      });

    input.val("");
  }

  $('#search-btn').on('click', function (e) {
    e.preventDefault();
    search();
  });

  input.val("relax");
  search();
});
