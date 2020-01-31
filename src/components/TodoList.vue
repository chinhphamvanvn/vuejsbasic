<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo"
            @keyup.enter="addTodo">

        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
            </todo-item >
        </transition-group>

        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>

        <div class="extra-container">
            <todo-filtered></todo-filtered>

            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
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
            beforeEditCache: ''
        }
    },

    created(){
        // eventBus.$on('removedTodo', (index) => this.removeTodo(index))
        // eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
        eventBus.$on('checkAllChanged', checked => this.checkAllTodos(checked))
        eventBus.$on('filterChanged', filter => (this.$store.state.filter = filter))
        eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
    },
    
    beforeDestroy(){
        // eventBus.$off("removedTodo");
        // eventBus.$off("finishedEdit");
        eventBus.$off("checkAllChanged");
        eventBus.$off("filterChanged");
        eventBus.$off("clearCompletedTodos");
    },

    computed: {
        remaining(){
            return this.$store.getters.remaining
        },
        anyRemaining(){
            return this.$store.getters.anyRemaining
        },
        todosFiltered(){
            return this.$store.getters.todosFiltered
        },
        showClearCompletedButton(){
            return this.$store.getters.showClearCompletedButton
        }

    },
    
    methods: {
        addTodo(){
            if(this.newTodo.trim().length === 0){
                return
            }
            this.$store.state.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false
            })
            this.newTodo = '',
            this.idForTodo++;
        },
        // removeTodo(id){
        //     this.$store.state.todos.splice(index, 1);
        // },

        // checkAllTodos(){
        //     this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked);
        // },
        // clearCompleted(){
        //     this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed);
        // },

        // finishedEdit(data){
        //     console.log(data);
        //     this.$store.state.todos.splice(data.index, 1, data.todo);
        // }
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
