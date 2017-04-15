import Vue from 'vue';
import loadingVue from './main.vue';

const LoadingConstructor = Vue.extend(loadingVue);

let instance;

const initInstance = () => {
    instance = new LoadingConstructor({
        el: document.createElement('div')
    });
};

const Loading = function (options) {
    if (!instance) {
        initInstance();
    }

    instance.show = true;

    for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
        }
    }

    document.body.appendChild(instance.$el);
}


export default Loading;