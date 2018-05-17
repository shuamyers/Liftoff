import projService from '../services/projService.js';

export const UPDATE_EDITED_PROJ = 'updateEditedProj';


function recursiveAssign(a, b) {
    if (Object(b) !== b) return b;
    if (Object(a) !== a) a = {};
    for (let key in b) {
        a[key] = recursiveAssign(a[key], b[key]);
    }
    return a;
}

export default {
	state: {
		editedProj: {},
	},
	getters: {
		editedProj(state) {
			return state.editedProj;
		}
	},
	mutations: {
		[UPDATE_EDITED_PROJ](state, { proj }) {
            let editedProj = state.editedProj;
            // state.editedProj = {...editedProj,...proj};
            state.editedProj = recursiveAssign(editedProj, proj);
            
            console.log('editedProj',state.editedProj)
		},
	},
	actions: {

		// [SET_SELECTED_PROJ](store, { projId }) {
		// 	return projService.getById(projId).then(proj => {
		// 		console.log('got proj', proj);
		// 		store.commit({ type: 'setSelectedProj', proj });
		// 	});
		// },

		// [SAVE_PROJ](store, { proj }) {
		// 	const isEdit = !!proj._id;
		// 	return projService.saveProj(proj).then(proj => {
		// 		if (isEdit) {
		// 			store.commit({ type: 'updateProj', proj });
		// 		} else {
		// 			store.commit({ type: 'addProj', proj });
		// 		}
		// 		return proj;
		// 	});
		// },

		// [DELETE_PROJ](store, { projId }) {
		// 	projService.deleteProj(projId).then(_ => {
		// 		store.commit({ type: 'deleteProj', projId });
		// 	});
		// },

	}
};
