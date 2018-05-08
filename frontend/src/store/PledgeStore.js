import pledgesService from '../services/pledgesService.js';

export const LOAD_PLEDGES_BY_USER_ID = 'loadPledgesByUserId';
export const LOAD_PLEDGES_BY_PROJ_ID = 'loadPledgesByProj';
export const SAVE_PLEDGE = 'savePledge';
// export const SET_SELECTED_PROJ = 'setSelectedPledge';
export const DELETE_PLEDGE = 'deletePledge';

export default {
	state: {
		pledges: []
	},
	getters: {
		pledgesForDisplay(state) {
			return state.projs;
		},
	},
	mutations: {
		addPledge(state, { pledge }) {
			state.pledges.push(pledge);
		},
		setPledge(state,{pledges}){
			state.pledges = pledges;
		}
	},
	actions: {
		[SAVE_PLEDGE](store, { pledge }) {
			console.log('front store', pledge);
			return pledgesService.savePledge(pledge).then(pledge => {
				store.commit({ type: 'addPledge', pledge });
				return pledge;
			});
		},
		[LOAD_PLEDGES_BY_USER_ID](store, { userId }) {
			console.log('front userId store', userId);
			return pledgesService.getByUserId(userId).then(pledges => {
				console.log('got proj', pledges);
				store.commit({ type: 'setPledge',  pledges });
			});
		},
		[LOAD_PLEDGES_BY_PROJ_ID](store, { projId }) {
			return projService.getById(projId).then(proj => {
				console.log('got proj', proj);
				store.commit({ type: 'setPledge', pledges });
			});
		},

		// [DELETE_PLEDGE](store, { pledgeId }) {
		// 	projService.deleteProj(pledgeId).then( _ => {
		// 		store.commit({ type: 'deleteProj', pledgeId });
		// 	});
		// }
	

	}
};
