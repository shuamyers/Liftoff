import axios from "axios"

const PROJ_URL = 'http://localhost:3000/proj';

function query(criteria = '') {
    criteria = flattenNestedObj(criteria);
    criteria = Object
        .keys(criteria)
        .map(key => key + '=' + criteria[key])
        .join('&')
        console.log(PROJ_URL + '?' + criteria);
    return axios
        .get(PROJ_URL + '?' + criteria)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log('No Projs', err))
}

function flattenNestedObj(obj) {
    return Object.assign(
        {},
        ...function _flatten(obj) {
            return [].concat(...Object.keys(obj)
                .map(key =>
                    typeof obj[key] === 'object' ?
                        _flatten(obj[key]) :
                        ({ [key]: obj[key] })
                )
            );
        }(obj))
}

function saveProj(proj) {
    if (proj._id) return axios.put(_getProjUrl(proj._id), proj)
    else return axios.post(PROJ_URL, proj);
}

function deleteProj(projId) {
    return axios.delete(_getProjUrl(projId))
}


function getById(projId) {
    return axios
        .get(_getProjUrl(projId))
        .then(res => res.data)
}


function _getProjUrl(projId) {
    return `${PROJ_URL}/${projId}`;
}

export default {
    query,
    saveProj,
    deleteProj,
    getById,
}