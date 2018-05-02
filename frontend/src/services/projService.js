const PROJ_URL = 'http://localhost:3000/proj';

import axios from "axios"

function getProjs() {
    return axios
            .get(PROJ_URL)
            .then(res => {
                console.log("service", res.data)
                res.data})
            .catch(e => console.log('No Projs', e))
}

function saveProj(proj) {
    if (proj._id) return axios.put(_getProjUrl(proj._id), proj)
    else return axios.post(PROJ_URL, proj);  
}

function deleteProj(projId) {
    return axios.delete(_getProjUrl(projId))
}


function getProjById(projId) {
    return axios
    .get(_getProjUrl(projId))
    .then(res => res.data)
}


function _getProjUrl(projId) {
    return `${PROJ_URL}/${projId}`;
}

export default {
    getProjs,
    saveProj,
    deleteProj,
    getProjById,
}