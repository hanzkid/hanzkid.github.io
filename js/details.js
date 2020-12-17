const urlParams = new URLSearchParams(window.location.search);

let movieWishList;
if (localStorage.wishList) {
  movieWishList = JSON.parse(localStorage.wishList).movies;
}

if (!urlParams.has("movie")) {
  window.location = "/";
}

const movie_id = urlParams.get("movie");

fetch(`${apiUrl}/3/movie/${movie_id}?api_key=${apiKey}`)
  .then(function (response) {
    if (response.status !== 200) {
      alert("Gagal Meload Data Film.");
      location.reload();
      return;
    }
    response.json().then(function (data) {
      document.querySelector("#text-tagline").innerHTML = data.tagline;
      document.querySelector("#text-description").innerHTML = data.overview;
      document.querySelector("#movie-title").innerHTML = ": " + data.title;
      document.querySelector("#movie-release-date").innerHTML = ": " + data.release_date;
      document.querySelector("#movie-rating").innerHTML =": " + data.vote_average;
      document.querySelector("#movie-rating-count").innerHTML =": " + data.vote_count;
      let production_companies = "Production by : ";
      data.production_companies.forEach(function (comp, index, comp_list) {
        production_companies += comp.name;
        if (index != comp_list.length - 1) {
          production_companies += ", ";
        }
      });
      document.querySelector(
        "#production-companies"
      ).innerHTML = production_companies;
      let yearRelease = data.release_date.split('-')[0];

      let essentialData = {
        title: data.title.replace("'", "petiksatudiilangin"),
        cover: data.poster_path,
        genre: [],
        year: yearRelease,
        id: data.id,
      };
      let movie_genre = "";
      data.genres.forEach(function (genre, index, genres) {
        essentialData.genre.push(genre.name);
        movie_genre += genre.name;
        if(index != genres.length -1){
          movie_genre += ', ';
        }

      });
      document.querySelector("#movie-genre").innerHTML =": " + movie_genre;
      let notInList = true;
      if (movieWishList) {
        let inList = movieWishList.find((m) => m.id == movie_id);
        if (inList) notInList = false;
      }
      if (notInList) {
        document.querySelector("#buttonAddWishList").innerHTML = `<button type="button" onClick='addToWishList(this,${JSON.stringify(essentialData)})' class="addToWishListDetail">WishList</button>`;
      }
    });
  })
  .catch(function (err) {
    alert("Gagal Meload Data Film.");
    location.reload();
  });

fetch(`${apiUrl}/3/movie/${movie_id}/videos?api_key=${apiKey}`)
  .then(function (response) {
    if (response.status !== 200) {
      alert("Gagal Meload Data Film.");
      location.reload();
      return;
    }
    response.json().then(function (data) {
      document
        .querySelector("#trailer-video")
        .setAttribute(
          "src",
          `https://www.youtube.com/embed/${data.results[0].key}`
        );
    });
  })
  .catch(function (err) {
    alert("Gagal Meload Data Film.");
    location.reload();
  });

function addToWishList(el, movie) {
  let wishList = { movies: [] };

  if (movieWishList) {
    wishList.movies = movieWishList;
  }
  wishList.movies.push(movie);

  localStorage.setItem("wishList", JSON.stringify(wishList));

  el.remove();
}
