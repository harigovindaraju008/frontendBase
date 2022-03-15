import {
    INPUT_VALUE_CHANGED_GLOBAL,
    GET_CLUB_DETAIL_SUCCESS,
    SET_DATA_FROM_LOCAL,
    ON_LOGIN_SUCCESS,
    GLOBAL_SUCCESS
} from './actions';
import roleInfo from '../utils/roleInfo';

// The initial state of the Dashboard Reducer
export const initialState = {
    sessionToken:null,
    clubDetails:null,
    nearByClub: false,
    myDetails: null,
    loggedInUseId : null,
    clubAdminList: null
  };

export default function(state = initialState,actions){
    switch(actions.type){
        
        case INPUT_VALUE_CHANGED_GLOBAL:
            console.log(actions.id, actions.value)
            return {...state, [actions.id]:actions.value};   

        case ON_LOGIN_SUCCESS:
                let data = actions.data
                console.log('ON_LOGIN_SUCCESS global', actions.data)
                return { ...state, loginUser: data.user, sessiontoken: data.token, userPrivileges: data.user.privileges, loggedInUseId:data.user.id }; 

        case SET_DATA_FROM_LOCAL:
            console.log(roleInfo)
            const sessionToken = localStorage.getItem("token");
            const loggedInUseId = localStorage.getItem("userId");
            
            let user = localStorage.getItem("user");
            let userPrivileges = localStorage.getItem("userPrivileges");
            user = user ? JSON.parse(user.replace(/\r?\n|\r|\t/g, '')) : null
            userPrivileges = userPrivileges ? JSON.parse(userPrivileges) : null
            roleInfo.set(JSON.parse(userPrivileges.replace(/\r?\n|\r|\t/g, '')))
            console.log(roleInfo,"after")

            return {...state, 'sessionToken': sessionToken,"myDetails":user,"userPrivileges":userPrivileges, loggedInUseId,loggedInUseId};   
                
        case GET_CLUB_DETAIL_SUCCESS:
            console.log(actions.id, actions.value)
            return {...state, 'clubDetails':actions.payload};

        case GLOBAL_SUCCESS:
        let key = actions.payload
            return {...state, ...key };
            
            
        default:        
            return state;
    }
}