<template>
    <div><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked">Check All</label></div>
</template>

<script>
export default {
    name: 'todo-check-all',
    computed: {
        anyRemaining(){
            return this.$store.getters.anyRemaining
        }
    },
    methods: {
        allChecked(){
            this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked);
        }
    }
}
</script>