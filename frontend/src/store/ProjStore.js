import projService from '../services/projService.js';

export const LOAD_PROJS = 'loadProjs';
export const SAVE_PROJ = 'saveProj';
export const SET_SELECTED_PROJ = 'setSelectedProj';
export const DELETE_PROJ = 'deleteProj';
export const LOAD_MORE_PROJS = 'loadMoreProjs';
export const UPDATE_FUNDS_RAISED = 'updateFundsRaised';

function _addFavoriteToProj(proj) {
	var userLikes = [
		{ projId: '5af1a19df6d0a90aa07c403a' },
		{ projId: '5af1a19df6d0a90aa07c403b' }
	];
	var index = userLikes.findIndex(like => {
		return like.projId === proj._id;
	});
	return proj;
}

function _checkIfFavorite(projs) {
	console.log(projs);
	var newProjs = projs.map(proj => {
		return _addFavoriteToProj(proj);
	});
	return newProjs;
}

export default {
	state: {
		projs: [],
		selectedProj: null,
		filterBy: {
			searchTxt: '',
			category: ''
			// status:null,
		},
		numOfProjs: 0
	},
	getters: {
		projsForDisplay(state) {
			return state.projs;
		},
		numOfProjs(state) {
			return state.projs.length;
		},
		selectedProj(state) {
			return state.selectedProj;
		}
	},
	mutations: {
		setProjs(state, { projs }) {
			_checkIfFavorite(projs);
			state.projs = projs;
		},
		setMorePorj(state, { projs }) {
			state.projs.push(...projs);
		},
		setSelectedProj(state, { proj }) {
			state.selectedProj = proj;
		},
		updateFundsRaised(state, { fundsRaised }) {
			state.selectedProj.fundsRaised = fundsRaised;
		},
		setNumOfProjs(state, { projs }) {
			state.numOfProjs = projs.length;
		},
		updateProj(state, { proj }) {
			var idx = state.projs.findIndex(currProj => proj._id === currProj._id);
			state.projs.splice(idx, 1, proj);
		},
		addProj(state, { proj }) {
			state.projs.push(proj);
		},
		deleteProj(state, { projId }) {
			state.projs = state.projs.filter(currProj => {
				return currProj._id !== projId;
			});
		},
		setFilterBySearchTxt(state, { searchTxt }) {
			state.filterBy.searchTxt = searchTxt;
		},
		setFilterByCategory(state, { category }) {
			console.log(category);
			state.filterBy.category = category;
		},

	},
	actions: {
		[LOAD_PROJS](store) {
			var criteria = {
				skip: 0,
				// filterBySearchTxt: store.state.filterBy.searchTxt,
				filterBy: {
					searchTxt: store.state.filterBy.searchTxt,
					category: store.state.filterBy.category
					// status:null,
				}
			};
			return projService.query(criteria).then(projs => {
				store.commit({ type: 'setProjs', projs });
				store.commit({ type: 'setNumOfProjs', projs });
				return projs.length;
			});
		},

		[LOAD_MORE_PROJS](store) {
			var criteria = {
				skip: store.state.numOfProjs,
				filterBy: {
					searchTxt: store.state.filterBy.searchTxt,
					category: store.state.filterBy.category
					// status:null,
				}
			};
			console.log('criteria', criteria);
			return projService.query(criteria).then(projs => {
				store.commit({ type: 'setMorePorj', projs });
				store.commit({ type: 'setNumOfProjs', projs: store.state.projs });
				return projs.length;
			});
		},

		[SET_SELECTED_PROJ](store, { projId }) {
			return projService.getById(projId).then(proj => {
				console.log('got proj', proj);
				store.commit({ type: 'setSelectedProj', proj });
			});
		},

		[SAVE_PROJ](store, { proj }) {
			const isEdit = !!proj._id;
			return projService.saveProj(proj).then(proj => {
				if (isEdit) {
					store.commit({ type: 'updateProj', proj });
				} else {
					store.commit({ type: 'addProj', proj });
				}
				return proj;
			});
		},

		[DELETE_PROJ](store, { projId }) {
			projService.deleteProj(projId).then(_ => {
				store.commit({ type: 'deleteProj', projId });
			});
		},
		[UPDATE_FUNDS_RAISED](store,{proj}){
			projService.updateFundsRaised(proj) 
			.then(projDb => {
			  store.commit({type: 'updateFundsRaised', fundsRaised: projDb.fundsRaised});
			})
		 } 
	}
};
