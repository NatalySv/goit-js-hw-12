import axios from 'axios';

import { refs, querySearch, page, per_page } from '../main';

export async function getSearch() {
  const ApiKey = '43688767-8e78f2c96043da1155d4d6687';
  const searchParams = new URLSearchParams({
    key: ApiKey,
    q: querySearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page,
    page,
  });

  const { data } = await axios(`https://pixabay.com/api/?${searchParams}`);
  return data;
}
