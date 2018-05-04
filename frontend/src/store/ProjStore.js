import projService from "../services/projService.js";

export const LOAD_PROJS = "loadProjs";
export const SAVE_PROJ = "saveProj";
export const SET_SELECTED_PROJ = "setSelectedProj";
export const DELETE_PROJ = "deleteProj";

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
    }
  },
  actions: {
    [LOAD_PROJS](store) {
      return projService.query().then(projs => {
        store.commit({ type: "setProjs", projs });
      });
    },

    [SET_SELECTED_PROJ](store, { projId }) {
      return projService.getById(projId).then(proj => {
        console.log("got proj", proj);
        store.commit({ type: "setSelectedProj", proj });
      });
    },

    [SAVE_PROJ](store, { proj }) {
      const isEdit = !!proj._id;

      return projService.saveProj(proj).then(proj => {
        if (isEdit) {
          store.commit({ type: "updateProj", proj });
        } else {
          store.commit({ type: "addProj", proj });
        }
        return proj;
      });
    },

    [DELETE_PROJ](store, { projId }) {
      projService.deleteProj(projId).then(_ => {
        store.commit({ type: "deleteProj", projId });
      });
    }
  }
};
