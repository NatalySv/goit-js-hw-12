import axios from 'axios';

import { refs, querySearch } from '../main';

export function getSearch() {
  const ApiKey = '43688767-8e78f2c96043da1155d4d6687';
  const searchParams = new URLSearchParams({
    key: ApiKey,
    q: querySearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
