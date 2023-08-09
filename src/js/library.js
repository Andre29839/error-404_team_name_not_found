const myLibraryDiv = document.querySelector("#my-library");

const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
    if (savedMovies.length === 0) {
        const oopsMarkup = `<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     You don’t have any movies at your library.</p>`
       
        myLibraryDiv.insertAdjacentHTML("afterBegin", oopsMarkup);
    } else {
        const libraryMarkup = ` <select name="Genre" id="filter">Genre
            <option value="romance">Romance</option>
            <option value="Detective">Detective</option>
            <option value="Thriller">Thriller</option>
            <option value="Action">Action</option>
            <option value="Documentary">Documentary</option>
            <option value="Horror">Horror</option>
          </select>`;
        
        savedMovies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.textContent = movie;
            myLibraryDiv.appendChild(movieDiv);
        });
        
        myLibraryDiv.insertAdjacentHTML("afterstart",libraryMarkup)
    }

}

renderMovies()