const apiKey = 'c3fd6f0f39760614747cf702d6c44b11';
const apiUrl = 'https://api.themoviedb.org';
const imgPath = 'https://image.tmdb.org/t/p/original/';
const urlParams = new URLSearchParams(window.location.search);
if(!localStorage.genre){
    fetch(`${apiUrl}/3/genre/movie/list?api_key=${apiKey}&language=en-US`).then(function(response){
    if (response.status !== 200) {
        location.reload();
        return;
      }
      response.json().then(function(data) {
          localStorage.setItem('genre',JSON.stringify(data));
      });
   }).catch(function(){
    location.reload();
})
}

let page = urlParams.get('page') || 1;

function renderMovie(movie, index,movieList){
    var movieContainer = document.getElementById('movie-container');
    if(index % 5 == 0){
        let newRow = `<div class="row"></div>`;
        movieContainer.insertAdjacentHTML('beforeend', newRow);
    }
    let movieCard = `<div class="movieCard">`;
    let yearRelease = movie.release_date.split('-')[0];
    movieCard+= `<img src="${imgPath}${movie.poster_path}" style="width:100%;"/>`
    movieCard+= `<span class="titleMovie">${movie.title}<br /> ( ${yearRelease} )</span><br>`;
    movieCard+= `<div class="genre">`;
    for(let i=0;i<movie.genre_ids.length;i++){
        let genre_id = movie.genre_ids[i];
        let genre = JSON.parse(localStorage.getItem("genre")).genres.find(o => o.id === genre_id);
        movieCard+= `<div class="genreMovie">${genre.name}</div>`
    }
    movieCard+= `</div>`;
    movieContainer.insertAdjacentHTML('beforeend', movieCard);
    if(index == movieList.length - 1){
        let pagination = `<div class="pagination">`;
        let firstPage = page <= 5 ? 1 : page-4;
        let lastPage = page <= 5 ? 10 : Number(page) + 5;
        for(let i=firstPage; i<=lastPage;i++){
            pagination+=`<a href="?page=${i}">${i}</a>`
        }
        pagination+=`</div>`;
        movieContainer.insertAdjacentHTML('beforeend', pagination);
    }
}

(function () {
    fetch(`${apiUrl}/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then(
        function(response) {
          if (response.status !== 200) {
            alert('Gagal Meload Data Film.')
            location.reload();
            return;
          }
          response.json().then(function(data) {
              data.results.forEach(renderMovie);
          });
        }
      )
      .catch(function(err) {
        alert('Gagal Meload Data Film.')
        location.reload();
      });
    ;
})();