import ReactGA from 'react-ga';
import config from '../config';
export const GA = {
    dispatchGAEvent,
    initialize
};

function dispatchGAEvent(category, action, label){
    if(config.enableGA){
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }
}

function initialize(){
    if(config.enableGA){
        ReactGA.initialize("UA-187791512-1");
    }
}