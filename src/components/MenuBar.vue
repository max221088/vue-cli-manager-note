<template>
  <div class="menu-container">
    <button @click="showModal">Add notes</button>
    <input type="text" placeholder="Enter search query" id="search">
    <h5>Filter by category</h5>
    <select class="cat-filt" v-model="celectedCategory" @change="filtByCategory()">
      <option selected value="all">All</option>
      <option v-for="(items, index) in categories" :key="index">{{ items }}</option>
     </select>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  props: ['showModal'],
  data:  function () {
    return {
      notes: [],
      filtNotes: [],
      celectedCategory: ''
    }
  },
  computed: {
        categories () {
            return this.$store.getters['getCategories'];
        },
    },
  methods: {
    filtByCategory () {
      this.notes = JSON.parse(localStorage.getItem('notes'));
      if (this.celectedCategory != 'all') {
        for (let i = 0; i < this.notes.length; i++ ) {
          if (this.celectedCategory === this.notes[i].cat) {
            this.filtNotes.push(this.notes[i]);
          } 
        } 
      } else {
        this.filtNotes = this.notes;
      }
      this.$emit('sendFiltCategoty', this.filtNotes);
      this.filtNotes = [];
    }
  }
}
</script>


