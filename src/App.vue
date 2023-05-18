<template>
  <div id="app">
    <LoginWindow ref="login" v-if="!getIsLoggedIn"/>
      <template v-if="getIsLoggedIn">
        <MenuBar :showModal="showModal"/>
        <div class="wropp">
          <!-- <transition-group tag="div" name="list"> -->
          <ShowNotes v-for="(item, index) in getNotesFromDB" :note="item" :key="index.id" 
          :i="index" :data-id="item.id" 
          @message="showMessageDel"
          @sendIndex="startEditNote"/>
        <!-- </transition-group> -->
        </div>
        <AddBlock ref="modal" @message="showMessageAdd"/>
        <MessageInfo ref="messageDel" :name="Element" :content="remove"/>
        <MessageInfo ref="messageAdd" :name="Element" :content="added"/>
        <EditNote ref="edit" />
      </template>
    </div>
</template>

<script>
  import MenuBar from './components/MenuBar.vue'
  import AddBlock from './components/AddBlock.vue'
  import ShowNotes from './components/ShowNotes.vue'
  import MessageInfo from './components/MessageInfo.vue'
  import EditNote from './components/EditNote.vue'
  import LoginWindow from './components/LoginWindow.vue'


  export default {
    name: 'App',
    components: {
      MenuBar,
      AddBlock,
      ShowNotes,
      MessageInfo,
      EditNote,
      LoginWindow
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
    },
    computed: {
      getNotesFromDB () {
          return this.$store.getters['getNotesFromDB'];
      }, 
      getIsLoggedIn () {
          return this.$store.getters['getIsLoggedIn'];
      }, 
    },
    // created() {
    //   this.$store.dispatch('fetchNote');
    // } 
  }
</script>

<style lang="less">
  @import './assets/less/style.less';
</style>
