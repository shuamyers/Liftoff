import axios from 'axios';

const PLEDGE_URL = (process.env.NODE_ENV !== 'development') ? '/pledge' : 'http://localhost:3000/pledge';

function query() {
	return axios
		.get(PLEDGE_URL)
		.then(res => {
			return res.data;
		})
		.catch(err => console.log('No Pledges', err));
}

function savePledge(pledge) {
	console.log('front services', pledge);
	return axios.post(PLEDGE_URL, pledge).then(res => res.data);
}

function deletePledge(pledgeId) {
	return axios.delete(_getPledgeUrl(pledgeId));
}

function getByUserId(userId) {
	return axios.get(PLEDGE_URL + '/user/' + userId).then(res => res.data);
}

function getByProjId(projId) {
	return axios.get(PLEDGE_URL + '/proj/' + projId).then(res => res.data);
}

export default {
	query,
	savePledge,
	deletePledge,
	getByProjId,
	getByUserId
};
