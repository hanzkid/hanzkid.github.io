let movieWishList;
if(localStorage.wishList){
    movieWishList =  JSON.parse(localStorage.completeMovies).movies;
}
if(movieWishList){
    // console.log(movieWishList)
    movieWishList.forEach(renderMovie)
}
//menampilkan data film
function renderMovie(movie, index){
    movie = movie[0]
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
    movieCard+= `</div>`;

    movieContainer.insertAdjacentHTML('beforeend', movieCard);
}