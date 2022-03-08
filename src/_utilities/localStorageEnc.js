export const localStorageEnc = {
    setItem: function(key, value){
        key = btoa(key);
        value = btoa(value);
        localStorage.setItem(key, value);
    },
    getItem: function(key){
        key = btoa(key);
        let value = localStorage.getItem(key);
        if(value){
            return atob(value);
        }
        return value;
    },
    removeItem: function(key){
        key = btoa(key);
        localStorage.removeItem(key);
    },
    clear: function(){
        localStorage.clear();
    }
};