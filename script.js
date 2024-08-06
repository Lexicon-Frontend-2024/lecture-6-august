window.addEventListener('load', async () => {
    let apiKey = await fetchApiKey();
    console.log(apiKey);
    
    let movies = await fetchMovies(apiKey);
    console.log(movies);
    
    storeMovies(movies);

    createMovieCards(movies);
});

function createMovieCards() {

}

// Jesper: function that takes a list of movies and stores it to local storage
function storeMovies(movieList) {
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

// Jesper: takes an api key and uses it to fetch movies which are then returned
async function fetchMovies(apiKey) {
    let url = `http://localhost:8080/api/movies?key=${apiKey}`;
    let response = await fetch(`http://localhost:8080/api/movies?key=${apiKey}`, {
        method : 'GET',
        headers : {
            'x-zocom' : apiKey
        }
    });
    let data = await response.json();
    return data.data;
    
}

async function fetchApiKey() {
    let url = 'http://localhost:8081/api/keys';
    let response = await fetch('http://localhost:8081/api/keys', {
        method : 'POST'
    });
    let data = await response.json();
    console.log(data.data);
    return data.data;
}