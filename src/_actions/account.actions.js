import { status } from '../_constants';
import { accountServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const accountAction ={
    addAccount
};

function addAccount(data){
    return dispatch=>{
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data:{
                add_action_status: status.IN_PROGRESS,
                addAccount: null
            }
        }));
        accountServices.addAccount(data)
        .then(
            response =>{
                if(response.code===200){
                    dispatch(dispatchFunction({
                        type: status.SUCCESS,
                        data:{
                            add_action_status: status.SUCCESS,
                            addAccount: response.object
                        }
                    }));
                    alert.success(response.message);
                }else{
                    dispatch(dispatchFunction({
                        type:status.SUCCESS,
                        data:{
                            add_action_status:status.FAILURE,
                            addAccount: response
                        }
                    }));
                    alert.error(response.message);
                }
            },
            error =>{
                dispatch(dispatchFunction({
                    type: status.SUCCESS,
                    data:{
                        add_action_status:status.FAILURE,
                        addAccount: error.message
                    }
                }));
                alert.error(error.message);
            }
        );
    };
}

function dispatchFunction(data) {
    return {
        type: data.type,
        data: data.data
    };
}

/*import {ADD_USER} from "../_constants";
export const account = (Data) => {

    return {
        
            type: "ADD_USER",
            data:
       
    }
}*/
