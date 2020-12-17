const imgPath = 'https://image.tmdb.org/t/p/original/';
let movieWishList;
if(localStorage.wishList){
    movieWishList =  JSON.parse(localStorage.wishList).movies;
}
if(movieWishList){
    movieWishList.forEach(renderMovie)
}
//menampilkan data film
function renderMovie(movie, index){
    var movieContainer = document.getElementById('movie-container');
    if(index % 5 == 0){
        let newRow = `<div class="row"></div>`;
        movieContainer.insertAdjacentHTML('beforeend', newRow);
    }
    let movieCard = `<div class="movieCard"><a href="movie.html?movie=${movie.id}">`;
    movieCard+= `<img src="${imgPath}${movie.cover}" style="width:100%;"/>`
    movieCard+= `<span class="titleMovie">${movie.title.replace('petiksatudiilangin',"'")}<br /> ( ${movie.year} )</span></a><br>`;

    movieCard+= `<div class="genre">`;
    for(let i=0;i<movie.genre.length;i++){
        let genre = movie.genre[i];
        movieCard+= `${genre}`
        if(i != movie.genre.length-1)
            movieCard += ', '
    }
    movieCard+= `<div class="btn-container">`
    movieCard+= `<div onClick='completeWishList(this,${movie.id})' class="completeWishList">Complete</div>`
    movieCard+= `<div onClick='removeWishList(this,${movie.id})' class="removeWishList">Remove</div>`
    movieCard+= `</div>`;
    movieCard+= `</div>`;

    movieContainer.insertAdjacentHTML('beforeend', movieCard);
}

//mendapatkan data film


//menambah ke wishlist
function removeWishList(el,movie_id){
    movieWishList = movieWishList.filter(m => m.id != movie_id)
    let wishList = {"movies" : movieWishList};
    localStorage.setItem('wishList',JSON.stringify(wishList));
    el.closest('.movieCard').remove();
}

function completeWishList(el,movie_id){
    let completeMovie = movieWishList.filter(m => m.id == movie_id)
    movieWishList = movieWishList.filter(m => m.id != movie_id)
    let wishList = {"movies" : movieWishList};
    localStorage.setItem('wishList',JSON.stringify(wishList));

    let completeMovies = {"movies" : []};

    if(localStorage.completeMovies){
        completeMovies.movies = JSON.parse(localStorage.completeMovies).movies;
    }

    completeMovies.movies.push(completeMovie);

    localStorage.setItem('completeMovies',JSON.stringify(completeMovies));

    el.closest('.movieCard').remove();
}