<template>
  <!-- <div class="wropp"> -->
    <div class="note" v-bind:style="{ top: note.y + 'px', left: note.x + 'px'}" :data-key=i 
    @mousedown="startMove()" @mouseup="finishMove()" @mousemove="move()">
      <h5 class="title-note">{{ note.title }}</h5>
      <h5 class="category-title">{{ note.category }}</h5>
      <div class="btn-block">
        <div class="btn-edit" @click="editNotes ()"></div>
        <div class="btn-del" @click="delNotes()"></div>
      </div>
      <p class="note-text">{{ note.content }}</p>
    </div>
  <!-- </div> -->
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
        this.$emit('moveNote', this.notes);
      },
      startMove () {
        this.index = this.$el.getAttribute('data-key');
        //console.log(this.index);
        this.notes = JSON.parse(localStorage.getItem('notes'));
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
        localStorage.setItem('notes', JSON.stringify(this.notes))
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
        let index = this.$el.getAttribute('data-key');
        this.notes = JSON.parse(localStorage.getItem('notes'));
        let delNote = this.notes.splice(index, 1);
        this.$emit('moveNote', this.notes);
        localStorage.setItem('notes', JSON.stringify(this.notes))
        this.$emit('message', delNote[0].tit);
      },
      editNotes () {
        let index = this.$el.getAttribute('data-key');
        localStorage.setItem('index', index);
        this.$emit('sendIndex');
      }
    } 
  }
</script>