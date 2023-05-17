<template>
  <div id="app">
    <MenuBar :showModal="showModal" @sendFiltCategoty="filteredByCategory" @sendFiltQuery="filterByQuery"/>
    <div class="wropp">
      <!-- <transition-group tag="div" name="list"> -->
      <ShowNotes v-for="(item, index) in getNotesFromDB" :note="item" :key="index.id" 
      :i="index" :data-id="item.id" 
      @moveNote="move" @message="showMessageDel"
      @sendIndex="startEditNote"/>
      <!-- </transition-group> -->
    </div>
    <AddBlock ref="modal" @message="showMessageAdd"/>
    <EditNote ref="edit" />
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
        this.$refs.edit.openModal(data);
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
      move: function (data) {
        this.notes = data;
      }
    },
    computed: {
      getNotesFromDB () {
          return this.$store.getters['getNotesFromDB'];
      },  
    },
    created() {
      this.$store.dispatch('fetchNote');
    } 
  }
</script>

<style lang="less">
  @import './assets/less/style.less';
</style>
