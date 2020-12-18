
const urlParams = new URLSearchParams(window.location.search);
let movieWishList;
if(localStorage.wishList){
    movieWishList =  JSON.parse(localStorage.wishList).movies;
}
//mendapatkan data genre
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

//mendapatkan halaman sekarang
let page = urlParams.get('page') || 1;

//menampilkan data film
function renderMovie(movie, index,movieList){
    try{
        var movieContainer = document.getElementById('movie-container');
        if(index % 5 == 0){
            let newRow = `<div class="row"></div>`;
            movieContainer.insertAdjacentHTML('beforeend', newRow);
        }
        let movieCard = `<div class="movieCard"><a href="movie.html?movie=${movie.id}">`;
    
        let yearRelease = movie.release_date.split('-')[0];
        movieCard+= `<img src="${imgPath}${movie.poster_path}" style="width:100%;"/>`
        movieCard+= `<span class="titleMovie">${movie.title}<br /> ( ${yearRelease} )</span></a><br>`;
    
        movieCard+= `<div class="genre">`;
    
        let essentialData = {
            title : movie.title.replace("'","petiksatudiilangin"),
            cover : movie.poster_path,
            genre : [],
            year : yearRelease,
            id : movie.id
        }
    
        for(let i=0;i<movie.genre_ids.length;i++){
            let genre_id = movie.genre_ids[i];
            let genre = JSON.parse(localStorage.getItem("genre")).genres.find(o => o.id === genre_id);
            movieCard+= `${genre.name}`
            essentialData.genre.push(genre.name);
            if(i != movie.genre_ids.length-1)
                movieCard += ', '
        }
        let notInList = true;
        if(movieWishList){
            let inList = movieWishList.find(m => m.id == movie.id);
    
            if(inList) 
                notInList = false;
        }
        if(notInList){
            movieCard+= `<button type="button" onClick='addToWishList(this,${JSON.stringify(essentialData)})' class="addToWishList">WishList</button>`
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
            pagination+=`</a></div>`;
            movieContainer.insertAdjacentHTML('beforeend', pagination);
        }
    }catch(err){
        location.reload();
    }
    
}

//mendapatkan data film
(function () {
    fetch(`${apiUrl}/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`)
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


//menambah ke wishlist
function addToWishList(el,movie){
    let wishList = {"movies" : []};

    if(movieWishList){
        wishList.movies = movieWishList;
    }
    wishList.movies.push(movie);

    localStorage.setItem('wishList',JSON.stringify(wishList));

    el.remove();

}