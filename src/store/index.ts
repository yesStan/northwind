import { createStore } from 'vuex';
import { getCustomersData, getOrdersData, getProductsData, IQuery, workerId } from '../api/interfaces';
import { countSelect, countSelectLeftJoin, countSelectWhere } from '../services/store-helper-service';

type CountDataType = {
    queryInfo: Array<IQuery>
};

export const store = createStore({
    // modules: {
    // },
    state(): CountDataType {
        return {
            queryInfo: [],
        };
    },
    getters: {
        allQueryInfo: state => state.queryInfo,
        count: state => state.queryInfo.reduce((acc, item) => acc + item.count, 0),
        select: state => state.queryInfo.reduce((acc, item) => acc + item.select, 0),
        selectWhere: state => state.queryInfo.reduce((acc, item) => acc + item.selectWhere, 0),
        selectLeftJoin: state => state.queryInfo.reduce((acc, item) => acc + item.selectLeftJoin, 0),

        // result: state => state.result,
        // select: state => state.select,
        // leftJoinCount: state => state.leftJoinCount,
        // selectWhere: state => state.selectWhere,
    },
    actions: {
        // async fetchProducts({commit}) {
        //     try {
        //         const response = await getProductsData();
        //         commit('setProducts', response.data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } 
    },
    mutations: {
        addMultipleQueryInfo(state, payload) {
            const queryInfo = {
                count: payload.count,
                queryCount: payload.queryInfo.length,
                workerId: payload.workerId,
                select: 0,
                selectWhere: 0,
                selectLeftJoin: 0,
            }

            queryInfo.logs = payload.queryInfo.map((item) => {
                queryInfo.select += countSelect(item.queryString);
                queryInfo.selectWhere += countSelectWhere(item.queryString);
                queryInfo.selectLeftJoin += countSelectLeftJoin(item.queryString);

                return {
                    queryString: item.queryString,
                    queryExecutionTime: item.queryExecutionTime,
                    queryTS: item.queryTS
                }
            })

            console.log('state payload', payload);
            state.queryInfo.push(queryInfo)

        },
        addSingleQueryInfo(state, payload) {
            const queryInfo = {
                count: payload.count,
                queryCount: 1,
                workerId: payload.workerId,
                select: countSelect(payload.queryInfo.queryString),
                selectWhere: countSelectWhere(payload.queryInfo.queryString),
                selectLeftJoin: countSelectLeftJoin(payload.queryInfo.queryString),
                logs: [{
                    queryString: payload.queryInfo.queryString,
                    queryExecutionTime: payload.queryInfo.queryExecutionTime,
                    queryTS: payload.queryInfo.queryTS
                }],
            }
            state.queryInfo.push(queryInfo)
        },
        // addQueryInfo(state, queryInfo) {
        //     // mutate state
        //     state.queryInfo.push(queryInfo);

        //     state.result = 0;
        //     // state.queryInfo.map((info: IQuery) => {

        //     //     //@ts-ignore  //have to rewrite types for query string, also IQuery based in interfaces should be rewrite
        //     //     const countTotalResult = info.data.length

        //     //     console.log('info:', info);

        //     //     if (countTotalResult >= 0) {
        //     //         state.result += countTotalResult + 1
        //     //         // countTotalResult
        //     //     }
        //     //     //@ts-ignore
        //     //     const matchResult = info.queryInfo[1].queryString.match(/left join/gi);
        //     //     if (matchResult) {
        //     //         state.leftJoinCount += matchResult.length;
        //     //     }
        //     //     //@ts-ignore
        //     //     const matchCount = info.queryInfo[0].queryString.match(/count/gi);
        //     //     if (matchCount) {
        //     //         state.count += matchCount.length;
        //     //     }
        //     //     //@ts-ignore                
        //     //     const matchCountSecondArray = info.queryInfo[1].queryString.match(/count/gi);
        //     //     if (matchCountSecondArray) {
        //     //         state.count += matchCountSecondArray.length;
        //     //     }
        //     //     //@ts-ignore
        //     //     const matchSelectWhere = info.queryInfo[1].queryString.match(/where/gi);
        //     //     if (matchSelectWhere) {
        //     //         state.selectWhere += matchSelectWhere.length;
        //     //     }
        //     //     //@ts-ignore
        //     //     const matchSelect = info.queryInfo[0].queryString.match(/select/gi);
        //     //     if (matchSelect) {
        //     //         state.select += matchSelect.length;
        //     //     }
        //     //     //@ts-ignore
        //     //     const matchSelectSecondArray = info.queryInfo[1].queryString.match(/select/gi);
        //     //     if (matchSelectSecondArray) {
        //     //         state.select += matchSelectSecondArray.length;
        //     //     }
        //     // });
        // }
    }
});