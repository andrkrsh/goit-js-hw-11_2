import { fetchImg } from './js/pixabay-api.js';
import { renderCard, showErrorMessage, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions.js';


const searchForm = document.querySelector("form");
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === '') {
        showErrorMessage("Please enter a search query.");
        return;
    }

    showLoadingIndicator();
    fetchImg(searchQuery)
        .then(hits => {
            hideLoadingIndicator();
            if (hits.length === 0) {
                showErrorMessage("Sorry, there are no images matching your search query. Please try again!");
                return;
            }
            renderCard(hits, gallery);
        })
        .catch(error => {
            hideLoadingIndicator();
            console.log(error);
            showErrorMessage("Failed to fetch images. Please try again later.");
        });

    form.reset();
}