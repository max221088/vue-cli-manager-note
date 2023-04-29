<template>
    <div class="note" v-bind:style="{ top: note.y + 'px', left: note.x + 'px'}" :data-key=i 
    @mousedown="startMove()" @mouseup="finishMove()" @mousemove="move()">
        <h5 class="category-title">{{ note.cat }}</h5>
        <p class="note-text">{{ note.con }}</p>
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
        this.$emit('moveNote', this.notes);
      },
      startMove () {
        this.index = this.$el.getAttribute('data-key');
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
    }
  }
}
</script>