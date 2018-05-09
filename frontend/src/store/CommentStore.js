import commentService from '../services/CommentService.js';

export const LOAD_COMMENTS = 'loadComments';
export const LOAD_COMMENTS_BY_PROJ_ID = 'loadCommentsByProjId';
export const SAVE_COMMENT = 'saveComment';
export const DELETE_COMMENT = 'deleteComment';
export const LOAD_MORE_COMMENTS = 'loadMoreComments';

export default {
	state: {
		comments: []
        
        ,
		numOfComments: 0
	},
	getters: {
		commentsForDisplay(state) {
			return state.comments;
		},
		numOfComments(state) {
			return state.comments.length;
		},
	},
	mutations: {
		setComments(state, { comments }) {
			state.comments = comments;
		},
		setMoreComments(state, { comments }) {
			state.comments.push(...comments);
		},
		
		setNumOfComments(state, { comments }) {
			state.numOfComments = comments.length;
		},
		updateComment(state, { comment }) {
			var idx = state.comments.findIndex(currComment => comment._id === currComment._id);
			state.comments.splice(idx, 1, comment);
		},
		addComment(state, { dBcomment }) {
			state.comments.unshift(dBcomment);
		},
		deleteComment(state, { commentId }) {
			state.comments = state.comments.filter(currComment => {
				return currComment._id !== commentId;
			});
		},
		
	},
	actions: {
		[LOAD_COMMENTS](store) {
			var criteria = {
				skip: 0,
			};
			return commentService.query(criteria).then(comments => {
				store.commit({ type: 'setComments', comments });
				store.commit({ type: 'setNumOfComments', comments });
				return comments.length;
			});
		},
		[LOAD_COMMENTS_BY_PROJ_ID](store, { projId }) {
			return commentService.getByProjId(projId).then(comments => {
				console.log('got comments by projId',projId,':', comments);
				store.commit({ type: 'setComments', comments });
			});
		},

		[LOAD_MORE_COMMENTS](store) {
			var criteria = {
				skip: store.state.numOfComments,
				
			};
			console.log('criteria', criteria);
			return commentService.query(criteria).then(comments => {
				store.commit({ type: 'setMoreComments', comments });
				store.commit({ type: 'setNumOfComments', comments: store.state.comments });
				return comments.length;
			});
		},

		[SAVE_COMMENT](store, { comment }) {
			const isEdit = !!comment._id;
			if (!isEdit) {
				var newComment = {
					userId : comment.user._id,
					projId : comment.projId,
					createdAt : Date.now(),
					userName : comment.user.name,
					userImg:comment.user.imgUrl,
					desc : comment.desc,
					replys : []
				}
			}
			return commentService.saveComment(newComment).then(dBcomment => {
			
				if (isEdit) {
					store.commit({ type: 'updateComment', newComment });
				} else {
					store.commit({ type: 'addComment', dBcomment });
				}
				return dBcomment;
			});
		},

		[DELETE_COMMENT](store, { commentId }) {
			commentService.deleteComment(commentId).then(_ => {
				store.commit({ type: 'deleteComment', commentId });
			});
		}
	}
};
