const API_KEY = '47661758-276cd75f39684298817518b5c';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImg(searchQuery) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.hits;
        });
}