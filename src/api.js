import axios from "axios";
import { md5 } from "js-md5";

const BASE_URL = 'https://api.valantis.store:41000/';

const password = process.env.REACT_APP_PASSWORD;

const getFullPassword = () => {
  const date = new Date();
  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const srtingDate = `${year}${month}${day}`;
  return password + '_' + srtingDate;
}

const request = async (action, params) => {
  const res = await axios.post(
    BASE_URL,
    { action, params },
    {
      headers: {
        'X-Auth': md5(getFullPassword())
      }
    }
  )
  return res.data;
}

export const getItems = async (page = 1, filter = {}) => {
  if (filter.searchText) {
    return await getFilteredItems(filter.searchText, filter.filterBy, page);
  }
  
  const qty = 50;
  const ids = await request(
    'get_ids', 
    {
      "offset": (page-1)*50, 
      "limit": qty + 5,
    }
  );
  if (!ids.result) {
    return [];
  }

  const items = await request(
    'get_items',
    {
      "ids": ids.result
    }
  );
  if (!items.result) {
    return [];
  }
  const uniqueItems = removeDoubledIds(items.result);
  const result = uniqueItems.slice(0, qty);

  return result;
}

const removeDoubledIds = (arr) => {
  const newArr = arr.reduce((accumulator, currentItem) => {
    if (!accumulator.find((value) => value.id === currentItem.id)) 
      accumulator.push(currentItem);
    return accumulator;
  }, []);
  return newArr;
}

export const getFilteredItems = async (
  searchText, 
  filterBy,
  page = 1
) => {
  const params = {
    [filterBy]: searchText,
  };
  const qty = 50;

  if (filterBy === 'price') 
    params[filterBy] = Number(searchText);

  const ids = await request(
    'filter', 
    params
  );
  if (!ids.result) {
    return [];
  }

  const firstPosition = (page - 1) * qty;
  const requiredIds = ids.result.slice(firstPosition, firstPosition + qty);

  const items = await request(
    'get_items',
    {
      "ids": requiredIds
    }
  );
  if (!items.result) {
    return [];
  }
  const uniqueItems = removeDoubledIds(items.result);

  return uniqueItems;
}

export const getNumberOfPages = async (searchText, filterBy) => {  
  
  let numberOfItems = 0;
  let numberOfPages = 0;
  if (searchText) {
    const params = { [filterBy]: searchText };
    if (filterBy === 'price') 
      params[filterBy] = Number(searchText);
    const ids = await request('filter', params);
    if (!ids.result) return 0;
    numberOfItems = ids.result.length;
  } else {
    const ids = await request('get_ids', {});
    if (!ids.result) return 0;
    numberOfItems = ids.result.length;
  }

  if (numberOfItems % 50 === 0) {
    numberOfPages = numberOfItems / 50;
  } else {
    numberOfPages = Math.floor(numberOfItems / 50) + 1;
  }

  return numberOfPages;
}

