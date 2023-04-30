<template>
    <div class="edit-modal" v-bind:class="{'active': editIsOpen}">
        <div class="overlay"></div>
        <div class="edit-note">
            <h4>Edit Note</h4>
            <h5>Title Note</h5>
            <input type="text" class="title-note" v-model="tit">
            <h5>Celect Category</h5>
            <select name="category" id="category" v-model="cat">
                <option v-for="(items, index) in categories" :key="index">{{ items }}</option>
            </select>
            <h5>Content</h5>
            <textarea name="contain" id="contain" cols="30" rows="10" v-model="con"></textarea>
            <div class="btn-container">
                <button class="btn-save" @click="saveNotes()">SAVE</button>
                <button class="btn-cancel" @click="closeModal()">CANCEL</button>
                </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'EditNote',
    props: [],
    data: function() {
      return {
        editIsOpen: false,
        tit: '',
        cat: '',
        con: '',
        notes: [],
        index: ''
      }
    },
    methods: {
      openModal () {
        this.editIsOpen = true;
        this.notes = JSON.parse(localStorage.getItem('notes'));
        this.index = localStorage.getItem('index');
        this.tit = this.notes[this.index].tit;
        this.con = this.notes[this.index].con;
        this.cat = this.notes[this.index].cat;
      },
      closeModal () {
        this.editIsOpen = false;
        this.tit = '';
        this.cat = '';
        this.con = '';
      },
      saveNotes () {
        if (localStorage.getItem('notes')) {
          this.notes = JSON.parse(localStorage.getItem('notes'));
        }
        this.notes[this.index].tit = this.tit;
        this.notes[this.index].con = this.con;
        this.notes[this.index].cat = this.cat;
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.$emit('sendNotes');
        this.closeModal();
      }
    },
    computed: {
      categories () {
        return this.$store.getters['getCategories'];
        },
    }
  }
</script>