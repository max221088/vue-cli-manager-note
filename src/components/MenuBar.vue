<template>
  <div class="menu-container">
    <button @click="showModal">Add notes</button>
    <input type="text" placeholder="Enter search query" id="search" v-model="query" @input="searchOnNotes()">
    <h5>Filter by category</h5>
    <select class="cat-filt" v-model="celectedCategory" @change="filtByCategory()">
      <option value="all">All</option>
      <option v-for="(items, index) in categories" :key="index">{{ items }}</option>
     </select>
     <button class="login" @click="click()" >Login</button>
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
        celectedCategory: 'all',
        query: ''
      }
    },
    methods: {
      filtByCategory () {
        this.$store.dispatch('fetchNoteFromSearch');
        this.notes = this.getNoteFromSearch;
        if (this.celectedCategory != 'all') {
          for (let i = 0; i < this.notes.length; i++ ) {
            if (this.celectedCategory === this.notes[i].category) {
              this.filtNotes.push(this.notes[i]);
            } 
          } 
        } else {
          this.filtNotes = this.notes;
        }
        this.$store.commit('filteredNotes', this.filtNotes);
        this.filtNotes = [];
      }, 
      searchOnNotes () {
        let filtByQuery = [];
        this.$store.dispatch('fetchNoteFromSearch');
        this.notes = this.getNoteFromSearch;
        filtByQuery = this.notes.filter(function (el) {
          if (el.category.toLowerCase().indexOf(this.query.toLowerCase()) != -1) {
            return true;
          } else {
            if (el.content.toLowerCase().indexOf(this.query.toLowerCase()) != -1) {
              return true;
            } else {
              if (el.title.toLowerCase().indexOf(this.query.toLowerCase()) != -1) {
                return true
              } else {
                return false;
              }
            }
          }
        }.bind(this))
        this.$store.commit('filteredNotes', filtByQuery);
      },
      click () {
        this.$store.dispatch('fetchNoteFromID', '1684349695599');
      }
    },
    computed: {
      categories () {
        return this.$store.getters['getCategories'];
      },
      getNoteFromSearch () {
        return this.$store.getters['getNotesFromSearch'];
      },
    },
  }
</script>


