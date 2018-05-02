import projService from '../services/projService.js'

export default {
    state: {
        projs: [],
        selectedProj: null
    },
    getters: {
        projsForDisplay(state) {
            return state.projs;
        },
        selectedProj(state) {
            return state.selectedProj;
        }
    },
    mutations: {
        setProjs(state, { projs }) {
            state.projs = projs;
        },
        setSelectedProj(state, { proj }) {
            state.selectedProj = proj;
        }
    },
    actions: {
        loadProjs(store) {
            return projService.getProjs(null)
                .then(projs => {
                    store.commit({ type: 'setProjs', projs });
                })
        },
        setSelectedProj(store, { projId }) {
            return projService.getById(projId)
                .then(proj => {
                    store.commit({ type: 'setSelectedProj', proj });
                })
        },
    }
}