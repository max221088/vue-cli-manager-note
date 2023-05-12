<template>
  <div id="app">
    <MenuBar :showModal="showModal" @sendFiltCategoty="filteredByCategory" @sendFiltQuery="filterByQuery"/>
    <!-- <transition-group tag="div" name="list"> -->
    <div class="wropp">
      <ShowNotes v-for="(item, index) in getNotesFromDB" :note="item" :key="index" 
      :i="index" :data-id="item.id" 
      @moveNote="move" @message="showMessageDel"
      @sendIndex="startEditNote"/>
    </div>
  <!-- </transition-group> -->
    <AddBlock ref="modal" @sendNotes="getNote" @message="showMessageAdd"/>
    <EditNote ref="edit" @sendNotes="getNote"/>
    <MessageInfo ref="messageDel" :name="Element" :content="remove"/>
    <MessageInfo ref="messageAdd" :name="Element" :content="added"/>
  </div>
</template>

<script>
  import MenuBar from './components/MenuBar.vue'
  import AddBlock from './components/AddBlock.vue'
  import ShowNotes from './components/ShowNotes.vue'
  import MessageInfo from './components/MessageInfo.vue'
  import EditNote from './components/EditNote.vue'


  export default {
    name: 'App',
    components: {
      MenuBar,
      AddBlock,
      ShowNotes,
      MessageInfo,
      EditNote
    },
    data: function () {
      return {
        notes: [],
        Element: '',
        added: 'Added',
        remove: 'Removed'
      }
    },
    methods: {
      showModal () {
        this.$refs.modal.openModal();
      },
      startEditNote (data) {
        this.editIndex = data;
        this.$refs.edit.openModal();
      },
      showMessageDel (data) {
        this.Element = data;
        this.$refs.messageDel.sendMessage();
      },
      showMessageAdd (data) {
        this.Element = data;
        this.$refs.messageAdd.sendMessage();
      },
      filteredByCategory: function (data) {
        this.notes = data;
      },
      filterByQuery: function (data) {
        this.notes = data;
      },
      getNote: function () {
        // this.notes = JSON.parse(localStorage.getItem('notes'));
        this.notes = this.getNotesFromDB ();
      },
      move: function (data) {
        this.notes = data;
      }
    },
    computed: {
      // getNotesFromLS () {
      //         return this.$store.getters['getNotesFromLS'];
      //     },
      getNotesFromDB () {
          return this.$store.getters['getNotesFromDB'];
      },
    },
    created() {
      //this.$store.dispatch('getFromLS');
      this.$store.dispatch('fetchNote');
      // this.notes = (JSON.parse(localStorage.getItem('notes')) != 0) 
      //   ? JSON.parse(localStorage.getItem('notes')) : this.notes = [];
    } 
  }
</script>

<style lang="less">
  @import './assets/less/style.less';
</style>
