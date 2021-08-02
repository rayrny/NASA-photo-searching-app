import axios from 'axios';

export function searchPhoto(searchQuery) {
	return axios.get('https://images-api.nasa.gov/search?q=' + searchQuery);
}