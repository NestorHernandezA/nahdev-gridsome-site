<template>

  <v-layout
    align-center
    column
    class="about-layout"
  >

    <h1 class="display-2 font-weight-thin mb-3">{{ title }}</h1>
    <v-card class="about-card responsive">
      <h4 class="subheading text-md-center text-sm-center">
        <div class="about-content">
          <vue-markdown :source="content.markdown"></vue-markdown>
        </div>
      </h4>
    </v-card>

  </v-layout>

</template>

<script>
import contentful from '../utils/contentful';

export const ABOUT = '3AjMDpHNZTNe0Mg9rlIJ2Q';

export default {
  name: 'about',
  mounted: async function() {
    try {
      this.cms = await contentful.getEntry(ABOUT);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  computed: {
    // The page title
    title: function() {
      const { fields } = this.cms;
      if (fields) return fields.title;
      return '';
    },
    // Contentful content for this page
    content: function() {
      const { fields } = this.cms;
      const content = { contentTitle: '', markdown: '' };

      if (fields && fields.content) {
        content.title = fields.content[0].fields.title;
        content.markdown = fields.content[0].fields.markdown;
      }
      return content;
    }
  },
  data() {
    return {
      cms: {}
    };
  },
  methods: {}
};
</script>
<style lang="stylus">
.about-card {
  overflow: auto;
  width: 80%;
  background-color: rgba(66, 66, 66, 0.5) !important;
}

.about-content {
  padding: 2em 2em;
}
</style>

