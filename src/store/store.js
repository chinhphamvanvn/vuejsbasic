import Vue from 'vue' 
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: []
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
            if(state.filter == 'all'){
                return state.todos
            }else if(state.filter == 'active'){
                return state.todos.filter(todo => !todo.completed)
            }else if(state.filter == 'completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos;
        },
        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations: {
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            })
        },

        updateTodo(state, todo){
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing
            });
        },

        deleteTodo(state, id){
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index, 1);
        },

        checkAll(state, checked){
            state.todos.forEach((todo) => todo.completed = event.target.checked);
        },

        updateFilter(state, filter){
            state.filter = filter
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        retrieveTodos(state, todos){
            state.todos = todos
        }
    },

    actions:{
        retrieveTodos(context){
            db.collection('todos').get()
            .then(querySnapshot => {
                let tempTodos = [];
                querySnapshot.forEach(doc => {
                    console.log(doc.data());
                    const data = {
                        id: doc.id,
                        title: doc.data().title,
                        completed: doc.data().completed
                    }
                    tempTodos.push(data)
                })
                context.commit('retrieveTodos', tempTodos)
            })
        },

        addTodo(context, todo){
            axios.post('/todos', {
                title: todo.title,
                completed: false
            })
            .then(response => {
                context.commit('addTodo', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        updateTodo(context, todo){
            axios.patch('/todos/' + todo.id, {
                title: todo.title,
                completed: false
            })
            .then(response => {
                context.commit('updateTodo', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },

        checkAll(context, checked){
            axios.patch('/todosCheckAll',{
                completed: checked,
            })
            .then(response => {
                context.commit('checkAll', checked)
            })
            .catch(error => {
                console.log(error)
            })
        },

        deleteTodo(context, id){
            axios.delete('/todos/' + id)
            .then(response => {
                context.commit('deleteTodo', id)
            })
            .catch(error => {
                console.log(error)
            })
        },

        updateFilter(context, filter){
            context.commit('updateFilter', filter)
        },
        clearCompleted(context){

            const completed = store.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id);
            
            axios.delete('/todosDeleteCompleted', {
                data: {
                    todos: completed
                }
            }).then(response => {
                context.commit('clearCompleted')
            }).catch(error => {
                console.log(error)
            })
        }
    }
})