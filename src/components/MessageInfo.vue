<template>
    <div class="message" v-bind:class="{'active': isMessageShow}">
        <p>Note <span>{{ name }}</span> has been <span>{{ content }}</span> !!!</p>
    </div>
</template>

<script>
export default {
  name: 'MessageInfo',
  props: ['name', 'content'],
  data: function () {
    return {
        isMessageShow: false,
    }
  },
  methods: {
    closeMessage () {
        this.isMessageShow = false;
    },
    sendMessage () {
        this.isMessageShow = true;
        setTimeout(this.closeMessage, 3000);
    }
  }
}
</script>