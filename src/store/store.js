import Vue from 'vue' 
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'active',
        todos: [
            {
                'id': 1,
                'title': 'Finish Vue Screencast',
                'completed': false,
                'editing': false
            },
            {
                'id': 2,
                'title': 'Take over world',
                'completed': false,
                'editing': false
            }
        ]
    },

    getters: {
        remaining(state){
            let a = state.todos.filter(todo => !todo.completed);
            return a.length;
        },
        anyRemaining(state, getters){
            return getters.remaining !=0
        },
        todosFiltered(state){
            if(state.fiter == 'all'){
                return state.todos
            }else if(state.fiter == 'active'){
                return state.todos.filter(todo => !todo.completed)
            }else if(state.fiter == 'completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos;
        },
        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0
        }
    }
})