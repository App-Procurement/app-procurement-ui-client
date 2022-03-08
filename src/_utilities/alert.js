import { toast } from 'react-toastify';
export const alert = {
    success,
    error,
    clear,
};

function success(message) {
    toast(message, {containerId: 'TOP_RIGHT', autoClose: 5000, type: toast.TYPE.SUCCESS});
}

function error(message) {
    toast(message, {containerId: 'TOP_RIGHT', autoClose: 5000, type: toast.TYPE.ERROR});
}

function clear() {
    // toast.dismiss();
}