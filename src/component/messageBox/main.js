import Vue from 'vue';
import msgboxVue from './main.vue';

const MessageBoxConstructor = Vue.extend(msgboxVue);

let instance;

const initInstance = () => {
  instance = new MessageBoxConstructor({
      el: document.createElement('div')
  });
};

const MessageBox = function(options) {
    initInstance();
    
    for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
        }
    }

    document.body.appendChild(instance.$el);
}


export default MessageBox;