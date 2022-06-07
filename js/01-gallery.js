import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createImagesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);
galleryContainer.addEventListener('click', onContainerClick);

function createImagesMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>
        `
    })
    .join('');  
}

function onContainerClick(evt){
    if(evt.target.nodeName !== 'IMG'){
        return
    }

    evt.preventDefault();

    const modalImage = basicLightbox.create(`
        <img src="${evt.target.dataset.source}" width="800" height="600">
    `)
    modalImage.show(); 

    if (modalImage.show()){
        galleryContainer.addEventListener('keyup', (e) => {
            if(e.keyCode === 27) modalImage.close();
        })
    }
}
