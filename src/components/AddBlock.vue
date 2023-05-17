<template>
    <div class="modal" v-bind:class="{'active': modalIsOpen}">
        <div class="overlay" @click="closeModal()"></div>
        <div class="form-container">
          <h4>New Note</h4>
          <h5>Title Note</h5>
          <input type="text" class="title-note" placeholder="Enter title" v-model="note.title">
          <h5>Celect Category</h5>
          <select name="category" id="category" v-model="note.category">
            <option v-for="(items, index) in categories" :key="index">{{ items }}</option>
          </select>
          <h5>Content</h5>
          <textarea name="contain" id="contain" cols="30" rows="10" v-model="note.content"></textarea>
          <div class="btn-container">
              <button class="btn-add" @click="addNotes()">ADD</button>
              <button class="btn-cancel" @click="closeModal()">CANCEL</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'AddBlock',
    props: [],
    data: function() {
      return {
        modalIsOpen: false,
        note: {
          category: '',
          content: '',
          id: '',
          title: '',
          x: 0,
          y: 50
        }
      }
    },
    methods: {
      openModal () {
        this.modalIsOpen = true;
      },
      closeModal () {
        this.modalIsOpen = false;
        this.note.category = '';
        this.note.content = '';
        this.note.title = '';
      },
      addNotes () {
        this.note.id = Date.now().toString();
        this.$store.dispatch('addNoteToDB', this.note);
        this.$store.dispatch('fetchNote');
        this.$emit('message', this.note.title);
        this.closeModal();
      }
    },
    computed: {
      categories () {
        return this.$store.getters['getCategories'];
      }
    }
  }
</script>