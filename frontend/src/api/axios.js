import axios from 'axios';

export function searchPhoto(searchQuery, page) {
	return axios.get('https://images-api.nasa.gov/search?q=' + searchQuery + '&page=' + page);
}