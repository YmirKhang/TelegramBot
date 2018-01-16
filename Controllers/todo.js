'use srict';
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class ToDoController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    addHandler($) {
        let todo = $.message.text.split(' ').slice(1).join(' ');
        if( !todo ) $.sendMessage('Not a valid todo item');
        $.getUserSession('todos').then(todos =>{
            if(!Array.isArray(todos)) $.setUserSession('todos', [todo]);
            else $.setUserSession('todos', todos.concat([todo]));
        });
        console.log(todo);
        $.sendMessage('Sucessfully Added')
    }

    getHandler($) {
        $.getUserSession('todos').then(todos =>{
            $.sendMessage(this.serializeList(todos),{parse_mode: 'Markdown'});
        });
    }

    checkHandler($) {
        let index =parseInt($.message.text.split(' ').slice(1)[0]);
        if(isNaN(index)) return $.sendMessage('Not a valid index');
        $.getUserSession('todos').then(todos => {
          if(index >= todos.length) return $.sendMessage('Not in the list');
            todos.splice(index,1);
            $.setUserSession('todos', todos);
            $.sendMessage('List Updated');
        });
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'checkCommand': 'checkHandler'
        }
    }

    serializeList(todoList){
        let serialized = '*Your to-dos are :*\n';
        console.log(todoList.length);
        if(todoList.length>0){
            todoList.forEach((t,i) => {
              serialized += `*${i}* - ${t} \n`;
            });
            return serialized;
        }else{
            return 'Yapacak işin yok hiç';
        }
    }

}

module.exports = ToDoController;
