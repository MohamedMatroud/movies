$(document).ready(() =>{
$('#searchForm').on('submit', (e)=>{
  let searchText = $('#searchText').val();
  getMovies(searchText);

  e.preventDefault();
});
});


function getMovies(searchText) {
  axios.get(' http://www.omdbapi.com/?i=tt3896198&apikey=20229c40&s='+searchText)
  .then((response) =>{
    console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies ,(index,movie) =>{
      output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}" alt="" />
          <h5>${movie.Title}</h5>
          <a href="#"onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details </a>
        </div>
      </div>
      `;
    });

   $('#movies').html(output);
  })
  .catch((err) =>{
    console.log("test",err);
  });

}


function movieSelected(id) {
  sessionStorage.setItem('movieId' ,id);
  window.location = 'movie.html';
  return false;
}
function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios.get(' http://www.omdbapi.com/?i=' +movieId+'&apikey=20229c40')
  .then((response) =>{
    console.log(response);
    let movie = response.data;

    let output = `
    <div class="row">
      <div class="col-md-4">
         <img src="${movie.Poster}" class="thumbnail"alt="nnnnnnnnnnnnn" />
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Gener:</strong>${movie.Genre}</li>
          <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
          <li class="list-group-item"><strong>imdbRating:</strong>${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
          <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h2>Plot</h2>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}"target="_blank" class="btn btn-primary">View iMDB </a>
        <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
    </div>
    `;
    $('#movie').html(output);
  })
  .catch((err) =>{
    console.log("test",err);
  });
}
