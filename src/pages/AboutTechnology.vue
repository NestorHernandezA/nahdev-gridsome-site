<template>
  <v-container class="tech-container">
    <v-layout
      row
      wrap
    >
      <v-flex
        class="tech-cards"
        v-for="{ fields: { description, technologyLogo, title } } in techCards"
        :key="title"
      >
        <v-card
          color="darken-4"
          style="height:100%"
          class="white--text"
        >
          <v-layout>
            <v-flex xs5>
              <v-img
                :src="technologyLogo.fields.file.url"
                height="125px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline"> {{ title }}</div>
                  <div>
                    <vue-markdown :source="description"></vue-markdown>
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import contentful from '../utils/contentful';

export const TECH = 'hbNbfJ6RZ8DIVvUFGpq3N';

export default {
  name: 'about-technology',
  mounted: async function() {
    try {
      this.cms = await contentful.getEntry(TECH);
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
    techCards: function() {
      const { fields } = this.cms;
      let cards = [];

      if (fields && fields.card) {
        cards = fields.card;
      }
      return cards;
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
.tech-container {
  position: absolute;
  height: 100%;
  top: 5px;
  overflow: scroll;
}

.tech-cards {
  max-width: 350px;
  max-height: 350px;
  margin: 5px;
}
</style>

