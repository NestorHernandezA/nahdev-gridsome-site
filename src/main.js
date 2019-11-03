// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueMarkdown from "vue-markdown";
import VueAnalytics from "vue-analytics";
import "vuetify/src/stylus/app.styl";
import "@fortawesome/fontawesome-free/css/all.css";

//  { router, head, isClient } as an option is available
export default function(Vue, { router }) {
  Vue.config.productionTip = false;
  Vue.component("vue-markdown", VueMarkdown);
  Vue.use(Vuetify, {
    theme: {
      primary: "#2d2d2d",
      secondary: "#d2e7f9",
      thirdiary: "#90A4AE",
      accent: "#BDBDBD",
      error: "#455A64",
      warning: "#90A4AD",
      info: "#37474F",
      success: "#000080"
    },
    iconfont: "fa"
  });
  Vue.use(VueAnalytics, {
    id: process.env.GRIDSOME_GA,
    router
  });
}
