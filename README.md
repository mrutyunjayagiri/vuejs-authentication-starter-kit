# Vuejs Authentication Starter Kit

Vuejs is the Progressive JavaScript Framework and light weight, simple and easy to use. In this kit you will get simple basic authentication. Yeah, I can not say exactly simple. But lot of things are included such as **[Vuex](https://vuex.vuejs.org/)** (State Management in Vuejs), **[Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)**,  **Cookies** and API Service to the mock server. We will discuss in step by step process.



# Project Setup
   I assume your system has @vue/cli (4.1.2 ) installed. That's great. Download or clone the project and run following command on terminal of project directory.
   ### *Let's get packages*
   ```
npm install
```
 ### Let's run it
   ```
npm run serve
```
Now vuejs authentication starter project run successfully on your system. Congratulations and let's discuss it.

### *Dependencies*
```
"axios": "^0.19.2",
"js-cookie": "^2.2.1",
"localforage": "^1.7.4",
"vue": "^2.6.11",
"vue-router": "^3.2.0",
"vuex": "^3.4.0"
```


## Folder & File Structure
You will find default folders and other folders inside **src**  folders.

**1. api**
Basically **api** folder is used for http request to the server. This folder contains api service related files. 

```api/init.js```
```api/endpoint.js```
```api/user/user-service.js.js```

**2. assets**
It is used for static assets such as images, fonts.

**3. components**
Components are reusable Vue instances with a name.

**4. config**
Config is used for vuejs configuration such as vuejs config variable and axios configuration.
```config/config.js```

**5. router**
Router is used for navigating between pages.
```router/path.js```
```router/router.js```

**6 store**
_Vuex_ is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application. Store has modules for managing scalable and complex applications.
```store/index.js```
```store/core/state.js```
```store/core/actions.js```
```store/core/mutations.js```
```store/core/getters.js```
```store/modules/auth.js```


**7. utils**
Utils folder contains Utility stuffs i.e storage setup for browser, error handlers, auth token handlers etc..
```utils/handler.js```
```utils/auth/auth.js```
```utils/storage/storage.js```

**8. views**
All of your pages must be inside views folder such as home page, about page etc.
```views/adminViews/dashboard.vue```
```views/about/about.vue```

**9. App.vue**
App.vue file is the root component for our single page application.

**10. main.js**
File main.js is the entry file for our app. It runs first while your application runs. There is few code snippets of main.js file.
```
import  Vue  from  'vue'
import  App  from  './App.vue'
import  router  from  './router'
import  store  from  './store'
import {autoAuthenticate} from  './utils/auth/auth'
import  './api/init'

autoAuthenticate()

new  Vue({
router,
store,
render:  h  =>  h(App)
}).$mount('#app')
```
Before creating our vue instance, here ``
./api/init.js
`` is getting called in which we are defining our service configuration and then after ```autoAuthenticate()``` is called for authentication. Then our vue instance is being created with these configurations.

**Thank you & Happy Coding**


