<template>
  <v-app
    id="inspire"
    dark
  >
    <v-content>
      <v-container
        :class="background"
        fill-height
        @mouseover="hideNav()"
      >
        <transition
          name="page"
          mode="out-in"
        >
          <router-view v-on:switch-change="backgroundChange" />
        </transition>
      </v-container>
    </v-content>
    <div id="navigation">
      <v-btn
        flat
        v-if="!isMobile()"
        style="width:100%"
        color="white"
        @mouseover="showNav = true"
      >
        <v-icon>fa-arrow-up</v-icon>
      </v-btn>
      <v-bottom-nav
        center
        :active.sync="activeBtn"
        :value="showNav"
        absolute
        dark
      >
        <router-link
          to="/"
          tag="span"
          exact
        >
          <v-btn
            flat
            color="white"
          >
            <span>Home</span>
            <v-icon>fa-home</v-icon>
          </v-btn>
        </router-link>
        <router-link
          to="/about"
          tag="span"
          exact
        >
          <v-btn
            flat
            color="white"
          >
            <span>About</span>
            <v-icon>fa-male</v-icon>
          </v-btn>
        </router-link>
        <router-link
          to="/about-technology"
          tag="span"
          exact
        >
          <v-btn
            flat
            color="white"
          >
            <span>Skills</span>
            <v-icon>fa-book</v-icon>
          </v-btn>
        </router-link>
      </v-bottom-nav>
    </div>
  </v-app>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Porfolio',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: 'Porfolio website'
        }
      ]
    };
  },
  name: 'App',
  data() {
    return {
      background: 'code',
      activeBtn: 1,
      showNav: this.isMobile() | false
    };
  },
  computed: {
    isHome() {
      return this.$route.name === 'home';
    }
  },
  methods: {
    backgroundChange() {
      if (this.background === 'code') this.background = 'dance';
      else this.background = 'code';
    },
    isMobile() {
      if (process.isClient) {
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    hideNav() {
      if (this.isMobile()) {
        this.showNav = true;
      }
      this.showNav = false;
    }
  }
};
</script>
<style lang="stylus">
.code {
  background-image: url('assets/brackets.png') !important;
  background-repeat: no-repeat;
  background-position: center;
}

.dance {
  background-image: url('assets/dance.png') !important;
  background-repeat: no-repeat;
  background-position: center;
}

@media only screen and (max-width: 768px) {
  .my-background {
    background-position: center;
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}

.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-70%);
}

#navigation {
  text-align: center;
}
</style>
