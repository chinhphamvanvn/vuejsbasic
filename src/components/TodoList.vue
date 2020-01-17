<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo"
            @keyup.enter="addTodo">

        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining">
            </todo-item >
        </transition-group>

        <div class="extra-container">
            <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
            <!-- <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div> -->
            <!-- <div>{{remaining}} items left</div> -->
            <todo-items-remaining :remaining="remaining"></todo-items-remaining>
        </div>

        <div class="extra-container">
            <todo-filtered></todo-filtered>

            <div>
                <transition name="fade">
                    <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
    name: 'todo-list',
    components: {
        TodoItem,
        TodoItemsRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },
    data () {
        return {
            newTodo: '',
            idForTodo: 3,
            beforeEditCache: '',
            filter: 'all',
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
        }
    },

    created(){
        eventBus.$on('removedTodo', (index) => this.removeTodo(index))
        eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
        eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
        eventBus.$on('filterChanged', (filter) => this.filter = filter)
        eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
    },
    
    beforeDestroy(){
        
    },

    computed: {
        remaining(){
            let a = this.todos.filter(todo => !todo.completed);
            return a.length;
        },
        anyRemaining(){
            return this.remaining !=0
        },
        todosFiltered(){
            if(this.filter == 'all'){
                return this.todos
            }else if(this.filter == 'active'){
                return this.todos.filter(todo => !todo.completed)
            }else if(this.filter == 'completed'){
                return this.todos.filter(todo => todo.completed)
            }
            return this.todos;
        },
        showClearCompletedButton(){
            return this.todos.filter(todo => todo.completed).length > 0
        }

    },
    
    methods: {
        addTodo(){
            if(this.newTodo.trim().length === 0){
                return
            }
            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false
            })
            this.newTodo = '',
            this.idForTodo++;
        },
        removeTodo(index){
            this.todos.splice(index, 1);
        },

        checkAllTodos(){
            this.todos.forEach((todo) => todo.completed = event.target.checked);
        },
        clearCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed);
        },

        finishedEdit(data){
            console.log(data);
            this.todos.splice(data.index, 1, data.todo);
        }
    }
}
</script>

<style>

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
    .todo-input{
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
    }

    .todo-item{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item{
        cursor: pointer;
        margin-left: 14px;
    }
    .remove-item :hover{
        color: black;
    }

    .todo-item-edit{
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Arial, Helvetica, sans-serif;
    }
    .completed{
        text-decoration: line-through;
        color: grey;
    }

    .input-checkbox{
        float: left;
    }

    .todo-item-label{
        display: inline;
        margin-left: 10px;
    }

    .extra-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button{
        font-size: 14px;
        background-color: white;
        appearance: none;
    }
    .active{
        background: lightgreen;
    }

    /* css transitions */
    .fade-enter-active, .fade-leave-active{
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

</style>
