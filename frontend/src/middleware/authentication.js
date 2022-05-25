// import store from '../store'
// import {Api} from '../utils/axios'

const authenticated = (to, from, next) => {
    if (!localStorage.getItem('user')) {
        next({
            path:'/login'
        });
    }
  
    next();
}

const notAuthenticated = function(to, from, next) {
    if(localStorage.getItem('user')) {
        next({path: '/'})
    } else {
        next()
    }
};



export {authenticated, notAuthenticated}