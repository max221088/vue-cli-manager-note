<template>
  <div id="app">
    <MenuBar :showModal="showModal" @sendFiltCategoty="filteredByCategory" @sendFiltQuery="filterByQuery"/>
    <ShowNotes v-for="(item, index) in notes" :note="item" :key="index" :i="index" />
    <AddBlock ref="modal" @sendNotes="getNote"/>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import AddBlock from './components/AddBlock.vue'
import ShowNotes from './components/ShowNotes.vue'

export default {
  name: 'App',
  components: {
    MenuBar,
    AddBlock,
    ShowNotes
  },
  data: function () {
    return {
      notes: []
    }
  },
  methods: {
    showModal () {
      this.$refs.modal.openModal();
    },
    filteredByCategory: function (data) {
      this.notes = data;
      console.log(this.notes);
    },
    filterByQuery: function (data) {
      this.notes = data;
    },
    getNote: function () {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    },
    
  },
  computed: {
    getNotesFromLS () {
            return this.$store.getters['getNotesFromLS'];
        },
  },
  created() {
    this.$store.dispatch('getFromLS');
    this.notes = (JSON.parse(localStorage.getItem('notes')) != 0) 
       ? JSON.parse(localStorage.getItem('notes')) : this.notes = []
  }
  
}
</script>

<style lang="less">
@import './assets/less/style.less';
</style>
