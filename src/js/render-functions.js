import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderCard(hits, gallery) {
    clearGallery(gallery);
    const markup = hits.map(hit => createGalleryCard(hit)).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox('.gallery a');
    }
}

function createGalleryCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <a class="gallery-item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p><span>Likes:</span> ${likes}</p>
        <p><span>Views:</span> ${views}</p>
        <p><span>Comments:</span> ${comments}</p>
        <p><span>Downloads:</span> ${downloads}</p>
      </div>
    </a>
  `;
}

export function clearGallery(gallery) {
    gallery.innerHTML = '';
}

export function showErrorMessage(message) {
    iziToast.error({
        title: "Error",
        message: message,
    });
}

export function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
}

export function hideLoadingIndicator() {
    const loader = document.querySelector('.loader');
    if (loader) {
        document.body.removeChild(loader);
    }
}