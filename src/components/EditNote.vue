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
        note: [],
      }
    },
    methods: {
      openModal (data) {
        let index = data;
         this.editIsOpen = true;
         this.note = this.editNote[index];
         this.tit = this.note.title;
         this.con = this.note.content;
         this.cat = this.note.category;
      },
      closeModal () {
        this.editIsOpen = false;
        this.tit = '';
        this.cat = '';
        this.con = '';
      },
      saveNotes () {
        this.note.title = this.tit;
        this.note.content = this.con;
        this.note.category = this.cat;
        this.$store.dispatch('addNoteToDB', this.note);
        this.closeModal();
      }
    },
    computed: {
      categories () {
        return this.$store.getters['getCategories'];
        },
      editNote () {
        return this.$store.getters['getNotesFromDB'];
      }
    }
  }
</script>