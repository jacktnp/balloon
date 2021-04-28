import { request } from './api'

const HOSTNAME = 'http://localhost:8080';

export function getEquipment(data) {
    const url = `${HOSTNAME}/device/search`
    return request('post', url, {data}, true)
}
