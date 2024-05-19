export function createMarkup(arr) {
  return arr
    .map(
      ({
        id,
        tags,
        largeImageURL,
        webformatURL,
        comments,
        likes,
        downloads,
        views,
      }) =>
        `<li class="gallery-item" id="${id}">
            <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"
                    />               
            </a>
            <ul class="gallery-stat-list">
                    <li class="stat-item"><h2 class="title">Likes</h2><p class="stat-data">${likes}</p></li>
                    <li class="stat-item"><h2 class="title">Views</h2><p class="stat-data">${views}</p></li>
                    <li class="stat-item"><h2 class="title">Comments</h2><p class="stat-data">${comments}</p></li>
                    <li class="stat-item"><h2 class="title">Downloads</h2><p class="stat-data">${downloads}</p></li>
            </ul>
            
        </li>`
    )
    .join('');
}
