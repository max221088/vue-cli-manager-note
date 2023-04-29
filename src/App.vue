<template>
  <div id="app">
    <MenuBar :showModal="showModal" @sendFiltCategoty="filteredByCategory" @sendFiltQuery="filterByQuery"/>
    <ShowNotes v-for="(item, index) in notes" :note="item" :key="index" :i="index" 
    @moveNote="move" @message="showMessage"/>
    <AddBlock ref="modal" @sendNotes="getNote" :name="delElement"/>
    <MessageDelElement ref="message" :name="delElement"/>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import AddBlock from './components/AddBlock.vue'
import ShowNotes from './components/ShowNotes.vue'
import MessageDelElement from './components/MessageDelElement.vue'


export default {
  name: 'App',
  components: {
    MenuBar,
    AddBlock,
    ShowNotes,
    MessageDelElement
  },
  data: function () {
    return {
      notes: [],
      delElement: ''
    }
  },
  methods: {
    showModal () {
      this.$refs.modal.openModal();
    },
    showMessage (data) {
      this.delElement = data;
      this.$refs.message.sendMessage();
    },
    filteredByCategory: function (data) {
      this.notes = data;
    },
    filterByQuery: function (data) {
      this.notes = data;
    },
    getNote: function () {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    },
    move: function (data) {
      this.notes = data;
    }
  },
  computed: {
    getNotesFromLS () {
            return this.$store.getters['getNotesFromLS'];
        },
  },
  created() {
    this.$store.dispatch('getFromLS');
    this.notes = (JSON.parse(localStorage.getItem('notes')) != 0) 
       ? JSON.parse(localStorage.getItem('notes')) : this.notes = [];
    
    
  }
  
}
</script>

<style lang="less">
@import './assets/less/style.less';
</style>
