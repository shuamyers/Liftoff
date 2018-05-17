const COMMENT_URL = (process.env.NODE_ENV !== 'development') ? '/comment' : 'http://localhost:3000/comment';

function query() {
	return axios
		.get(COMMENT_URL)
		.then(res => {
			return res.data;
		})
		.catch(err => console.log('No Comments', err));
}

function saveComment(comment) {
	console.log('front services', comment);
	return axios.post(COMMENT_URL, comment).then(res => res.data);
}

function deleteComment(commentId) {
	return axios.delete(_getCommentUrl(commentId));
}

function getByUserId(userId) {
	return axios.get(COMMENT_URL + '/user/' + userId).then(res => res.data);
}

function getByProjId(projId) {
	return axios.get(COMMENT_URL + '/proj/' + projId).then(res => res.data);
}

export default {
	query,
	saveComment,
	deleteComment,
	getByProjId,
	getByUserId
};