export function prepareQueryInfoCommitPayload(count = 0, queryInfo, workerId) {
    return {
        count,
        queryInfo,
        workerId
    }
}

export function countSelect(value) {
    return value.match(/select/gi)?.length || 0;
}
export function countSelectWhere(value) {
    return value.match(/where/gi)?.length || 0;
}
export function countSelectLeftJoin(value) {
    return value.match(/left join/gi)?.length || 0;
}
