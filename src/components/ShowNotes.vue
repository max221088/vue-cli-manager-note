<template>
    <div class="note" v-bind:style="{ top: note.y + 'px', left: note.x + 'px'}" :data-key=i @click="move()">
        <h5 class="category-title">{{ note.cat }}</h5>
        <p class="note-text">{{ note.con }}</p>
    </div>
</template>

<script>
export default {
    name: 'ShowNotes',
    props: ['note', 'i'],
    methods: {
        move () {
      console.log(this.$el.getAttribute('data-key'));
    }
  }
}
</script>