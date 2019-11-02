<template>
<!-- Credit goes to https://github.com/DannyFeliz/vue-rocker-switch  -->
  <div class="fun-switch-container">
    <label class="fun" :style="this.funSize" @click.prevent="">
      <input
        type="checkbox"
        v-model="isChecked"
        ref="switch"
        v-bind="$attrs">
      <span
        class="toggle-up"
        @click="changeState(true, $event)">
        <span>{{ onLabel }}</span>
      </span>
      <span
        class="toggle-down"
        @click="changeState(false, $event)">
        <span>{{ offLabel }}</span>
      </span>
    </label>
  </div>
</template>

<script>

export default {
  name: "funSwitch",
  props: {
    value: {
      type: Boolean,
      default: true
    },
    size: {
      type: [String, Number],
      default: "medium",
      validator(size) {
        return (
          ["small", "medium", "large"].includes(
            size.toString().toLowerCase()
          ) || typeof size === "number"
        );
      }
    },
    onLabel: {
      type: [String, Number],
      default: "On"
    },
    offLabel: {
      type: [String, Number],
      default: "Off"
    },
    activeColorLabel: {
      type: String,
      default: "#fff",
    },
    inactiveColorLabel: {
      type: String,
      default: "#333",
    },
    backgroundColorOn: {
      type: String,
      default: "#0084d0",
    },
    backgroundColorOff: {
      type: String,
      default: "#bd5757",
    },
    borderColor: {
      type: String,
      default: "#eee",
    },
    toggle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isChecked: this.value,
      sizes: {
        small: 0.5,
        medium: 0.8,
        large: 0.9
      }
    };
  },
  computed: {
    labelsSize() {
      return { on: this.onLabel.length, off: this.offLabel.length };
    },
    funSize() {
      return {
        fontSize:
          (typeof this.size === "number" ? this.size : this.sizes[this.size]) +
          "em"
      };
    },
    isDisabled() {
      return (
        !!(
          !!this.$attrs.hasOwnProperty("disabled") &&
          this.$attrs.disabled === ""
        ) || this.$attrs.disabled === true
      );
    }
  },
  mounted() {
    this.setUpColors();
  },
  watch: {
    value(currentValue, oldValue) {
      if (!this.isDisabled && currentValue != oldValue) {
          this.isChecked = currentValue;
      }
    },
    isChecked(isOn) {
        this.$emit("change", isOn);
    }
  },
  methods: {
    setUpColors() {
      const root = this.$el;

      root.style.setProperty("--onColor", this.backgroundColorOn);
      root.style.setProperty("--offColor", this.backgroundColorOff);
      root.style.setProperty("--borderColor", this.borderColor);
      root.style.setProperty("--activeColorLabel", this.activeColorLabel);
      root.style.setProperty("--inactiveColorLabel", this.inactiveColorLabel);
    },
    changeState(value, event = {}) {
      if (this.isDisabled) {
        event.preventDefault();
        return;
      }

      if (this.toggle) {
        this.isChecked = !this.isChecked;
      } else {
        if (this.$refs.switch.checked != value) {
          this.isChecked = value;
        }
        event.preventDefault();
      }
    }
  }
};
</script>

<style>
.fun-switch-container {
  display: inline-block;
  --onColor: #0084d0;
  --offColor: #bd5757;
  --borderColor: #eee;
  --activeColorLabel: #fff;
  --inactiveColorLabel: #333;
  transform: rotate(90deg);
}
.fun-switch-container .mid {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1em;
}
.fun-switch-container .fun {
  display: inline-block;
  position: relative;
  font-size: 0.6em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: var(--inactiveColorLabel);
  width: 7em;
  height: 4em;
  overflow: hidden;
  border-bottom: 0.5em solid var(--borderColor);
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  font-size: 100%;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}
.fun-switch-container .fun-small {
  font-size: 0.75em;
  /* Sizes the switch */
  margin: 1em;
}
.fun-switch-container .fun::before {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  border: 0.5em solid var(--borderColor);
  border-bottom: 0;
}
.fun-switch-container .fun input {
  opacity: 0;
  width: 0;
  height: 0;
}
.fun-switch-container .toggle-up,
.fun-switch-container .toggle-down {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  width: 3em;
  transition: 0.2s;
}
.fun-switch-container .toggle-up {
  height: 2.4em;
  width: 2.75em;
  left: 0.85em;
  bottom: 0.4em;
  background-color: #ddd;
  transform: rotate(15deg) skewX(15deg);
}
.fun-switch-container .toggle-up span{
    font-size: 0.6em;
    transform: rotate(-90deg);
}
.fun-switch-container .toggle-down {
  right: 0.5em;
  bottom: 0;
  background-color: var(--offColor);
  color: var(--activeColorLabel);
}
.fun-switch-container .toggle-down span{
    font-size: 0.6em;
    transform: rotate(-90deg);
}
.fun-switch-container .toggle-up::before,
.fun-switch-container .toggle-down::before {
  content: "";
  position: absolute;
  width: 0.4em;
  height: 2.45em;
  bottom: -0.45em;
  background-color: #ccc;
  transform: skewY(-65deg);
}
.fun-switch-container .toggle-up::before {
  left: -0.4em;
}
.fun-switch-container .toggle-down::before {
  right: -0.375em;
  background-color: transparent;
  transform: skewY(65deg);
}
.fun-switch-container input:checked + .toggle-up {
  background-color: var(--onColor);
  color: var(--activeColorLabel);
  bottom: 0px;
  left: 0.5em;
  height: 2.5em;
  width: 3em;
  transform: rotate(0deg) skewX(0deg);
}
.fun-switch-container input:checked + .toggle-up::before {
  background-color: transparent;
  width: 3.0833em;
}
.fun-switch-container input:checked + .toggle-up + .toggle-down {
  background-color: #ddd;
  color: var(--inactiveColorLabel);
  bottom: 0.4em;
  right: 0.8em;
  height: 2.4em;
  width: 2.75em;
  transform: rotate(-15deg) skewX(-15deg);
}
.fun-switch-container input:checked + .toggle-up + .toggle-down::before {
  background-color: #ccc;
}
.fun-switch-container input:focus + .toggle-up {
  color: var(--inactiveColorLabel);
}
.fun-switch-container input:checked:focus + .toggle-up {
  color: var(--activeColorLabel);
}
.fun-switch-container input:focus + .toggle-up + .toggle-down {
  color: var(--activeColorLabel);
}
.fun-switch-container input:checked:focus + .toggle-up + .toggle-down {
  color: var(--inactiveColorLabel);
}
</style>