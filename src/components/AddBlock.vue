<template>
    <div class="modal" v-bind:class="{'active': modalIsOpen}">
        <div class="overlay" @click="closeModal()"></div>
        <div class="form-container">
            <h5>Celect Category</h5>
            <select name="category" id="category" v-model="cat">
                <option v-for="(items, index) in categories" :key="index">{{ items }}</option>
            </select>
            <h5>Content</h5>
            <textarea name="contain" id="contain" cols="30" rows="10" v-model="con"></textarea>
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
      cat: '',
      con: '',
      notes: [],
    }
  },
  methods: {
    openModal () {
      this.modalIsOpen = true;
    },
    closeModal () {
      this.modalIsOpen = false;
      this.cat = '';
      this.con = '';
    },
    addNotes () {
      this.notes = JSON.parse(localStorage.getItem('notes'));
        this.notes.push({
            cat: this.cat,
            con: this.con,
            x: 0,
            y: 50
        });
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