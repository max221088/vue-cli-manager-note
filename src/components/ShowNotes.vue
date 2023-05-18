<template>
    <div class="note" v-bind:style="{ top: note.y + 'px', left: note.x + 'px'}" :data-key=i 
    @mousedown="startMove()" @mouseup="finishMove()" @mousemove="move()">
      <h5 class="title-note">{{ note.title }}</h5>
      <h5 class="category-title">{{ note.category }}</h5>
      <div class="btn-block">
        <div class="btn-edit" @click="editNotes ()" :data-id="note.id"></div>
        <div class="btn-del" @click="delNotes()" :data-id="note.id"></div>
      </div>
      <p class="note-text">{{ note.content }}</p>
    </div>
</template>

<script>
  export default {
    name: 'ShowNotes',
    props: ['note', 'i'],
    data: function () {
      return {
        startCoords: [],
        saveCoords: [],
        distance: [],
        index: '',
        notes: [],
        action: false,
        areaWidth: window.visualViewport.width,
        areaHeight: window.visualViewport.height,
      }
    },
    methods: {
      show () {
        this.notes[this.index].x = this.distance.x;
        this.notes[this.index].y = this.distance.y;
      },
      startMove () {
        this.index = this.$el.getAttribute('data-key');
        this.notes = this.getNote;
        this.startCoords = ({
          x: event.pageX,
          y: event.pageY
        });
        this.saveCoords = ({
          x: this.notes[this.index].x,
          y: this.notes[this.index].y
        })
        this.action = true;
      },
      finishMove () {
        this.action = false;
        this.$store.dispatch('addNoteToDB', this.notes[this.index]);
      },
      move () {
        if (this.action) {
          this.distance = ({
            x: (this.saveCoords.x + event.pageX - this.startCoords.x),
            y: (this.saveCoords.y + event.pageY - this.startCoords.y)
          });
          if (this.distance.x > this.areaWidth - this.$el.clientWidth) {
            this.distance.x = this.areaWidth - this.$el.clientWidth;
          } 
          if (this.distance.y > this.areaHeight - this.$el.clientHeight) {
            this.distance.y = this.areaHeight - this.$el.clientHeight;
          } 
          if (this.distance.y < 40) {
            this.distance.y = 40;
          }
          if (this.distance.x < 0) {
            this.distance.x = 0;
          } 
          this.show();
        }
      },
      delNotes () {
        let ID = this.$el.getAttribute('data-id');
        let index = this.$el.getAttribute('data-key');
        let delName = this.getNote[index].title;
        this.$store.dispatch('deleteNoteInDB', ID);
        this.$emit('message', delName);
        this.$store.dispatch('fetchNote');
        this.$store.dispatch('fetchNoteFromSearch');
      },
      editNotes () {
        let index = this.$el.getAttribute('data-key');
        this.$emit('sendIndex', index);
      }
    },
    computed: {
      getNote () {
        return this.$store.getters['getNotesFromDB'];
      }
    } 
  }
</script>