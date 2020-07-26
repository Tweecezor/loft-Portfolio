import Vue from "vue";
const axios = require("axios");
axios.defaults.baseURL = "https://webdev-api.loftschool.com";

const devStack = {
  template: "#myWorks__dev_stack",
  props: {
    devStack: Array,
  },
};
const info = {
  template: "#myWorks__info",
  components: {
    devStack,
  },
  props: {
    currentWork: Object,
  },
  computed: {
    devStackArray() {
      return this.currentWork.techs.split(",");
    },
  },
};

const controls = {
  template: "#myWorks__btn_controls",
};

const preview = {
  template: "#myWorks__preview",
  data() {
    return {
      itemsArr: [],
    };
  },
  props: {
    splicedWorks: Array,
    works: Array,
    currentWork: Object,
    currentIndex: Number,
  },
};

const display = {
  template: "#myWorks__display",
  components: {
    preview,
    controls,
  },
  props: {
    splicedWorks: Array,
    works: Array,
    currentWork: Object,
    currentIndex: Number,
  },
};
new Vue({
  el: "#myWorks__component",
  template: "#myWorks__container",
  components: {
    display,
    info,
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      isCreate: false,
      newSplicePos: 0,
      interval: 600,
      currentTriple: 0,
      // countOfWorksTriple: Math.trunc(this.works.length / 3),
    };
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },
    splicedWorks() {
      if (this.currentIndex < 3) {
        this.currentTriple = 0;
        return [...this.works].splice(0, 3);
      }
      if (this.currentIndex == 3 || this.currentIndex < 6) {
        this.currentTriple = 1;
        return [...this.works].splice(3, 3);
      }
      if (this.currentIndex + 3 > this.works.length) {
        // this.currentTriple = 1;
        return [...this.works].splice(this.works.length - 3, 3);
      }

      // if ((this.currentIndex - 1) % 2 === 0 && this.currentIndex - 1 > 0) {
      //   console.log((this.currentIndex - 1) % 3);
      //   this.currentTriple += 1;
      //   return [...this.works].splice(this.currentIndex, 3);
      // }
      // if (this.currentIndex % 2 === 0 && this.currentIndex != 0) {
      //   console.log((this.currentIndex - 1) % 3);
      //   this.currentTriple -= 1;
      //   return [...this.works].splice(this.currentIndex, 3);
      // }
      // // console.log(this.currentTriple);
      // // console.log((this.currentTriple - 1) * 3);
      // return [...this.works].splice((this.currentTriple - 1) * 3, 3);
      // if (this.currentIndex % 2 == 0 && this.currentIndex != 0) {
      //   return [...this.works].splice(this.newSplicePos, 3);
      // } else if (this.currentIndex > 2) {
      //   return [...this.works].splice(this.newSplicePos, 3);
      // } else if (this.currentIndex < 2) {
      //   this.newSplicePos = 0;
      //   return [...this.works].splice(0, 3);
      // }
    },
  },
  watch: {
    currentIndex(value) {
      const lenghtOfElem = this.works.length - 1;
      if (value < 0) this.currentIndex = lenghtOfElem;
      if (value == lenghtOfElem) this.newSplicePos = this.works.length - 3;
    },
  },

  methods: {
    // getTriple() {
    //   if (this.currentIndex - (1 % 3) == 0) {
    //     if (this.currentIndex > this.currentTriple * 3) {
    //       this.currentTriple += 1;
    //     }
    //     return [...this.works].splice((this.currentTriple - 1) * 3, 3);
    //   } else {
    //     return [...this.works].splice((this.currentTriple - 1) * 3, 3);
    //   }
    // if(this.countOfWorksTriple < )
    // let triple = [...this.works].splice(this.countOfWorksTriple-1,3);
    // return [...this.works].splice(this.currentIndex,3);
    // },
    makeArrayWithRequiredImages(data) {
      return data.map((item) => {
        const requirePic = `https://webdev-api.loftschool.com/${item.photo}`;
        item.photo = requirePic;
        return item;
      });
    },

    async handleSlide(direction) {
      switch (direction) {
        case "next":
          this.animationsAction({
            imageAction: "leave",
          });
          this.blockButtons();
          setTimeout(this.changeCurrentItemNext, this.interval);
          break;

        case "prev":
          this.animationsAction({
            imageAction: "leave",
          });
          this.blockButtons();
          setTimeout(this.changeCurrentItemPrev, this.interval);
          break;
      }
    },

    animationsAction(obj) {
      if (obj.direction !== undefined) {
        let button = document.querySelector(
          `.myWorks__slider-${obj.direction}`
        );
        switch (obj.btnAction) {
          case "remove":
            button.classList.remove("disabledBtn");
            button.removeAttribute("disabled");
            break;
          case "add":
            button.classList.add("disabledBtn");
            button.setAttribute("disabled", "disabled");
        }
      }

      let image = document.querySelector(".myWorks__slider-current-pic-wrap");

      switch (obj.imageAction) {
        case "leave":
          image.classList.remove("slide-enter");
          image.classList.add("slide-leave");

          break;
        case "enter":
          image.classList.remove("slide-leave");
          image.classList.add("slide-enter");

          break;
      }
    },

    changeCurrentItemNext() {
      let worksLength = this.works.length - 1;

      if (this.currentIndex !== worksLength) {
        this.currentIndex++;
        this.animationsAction({
          direction: "prev",
          btnAction: "remove",
        });
      }

      if (this.currentIndex === worksLength) {
        this.animationsAction({
          direction: "next",
          btnAction: "add",
        });
      }

      this.animationsAction({
        imageAction: "enter",
      });
      this.unblockButtons();
    },

    changeCurrentItemPrev() {
      if (this.currentIndex !== 0) {
        this.currentIndex--;
        this.animationsAction({
          direction: "next",
          btnAction: "remove",
        });
      }

      if (this.currentIndex === 0) {
        this.animationsAction({
          direction: "prev",
          btnAction: "add",
        });
      }

      this.animationsAction({
        imageAction: "enter",
      });
      this.unblockButtons();
    },

    changeCurrentItemPreview(currentId) {
      console.log("currenId при сменен " + currentId);
      this.currentIndex = currentId;

      this.animationsAction({
        imageAction: "enter",
      });

      if (this.currentIndex != this.works.length - 1)
        document
          .querySelector(".myWorks__slider-next")
          .classList.remove("disabledBtn");
      else {
        document
          .querySelector(".myWorks__slider-next")
          .classList.add("disabledBtn");
      }

      if (this.currentIndex == 0) {
        document
          .querySelector(".myWorks__slider-prev")
          .classList.add("disabledBtn");
      } else {
        document
          .querySelector(".myWorks__slider-prev")
          .classList.remove("disabledBtn");
      }
    },

    sliderPreviewClick(currentId) {
      console.log("текущий id " + currentId);
      console.log("текущий тройка " + this.currentTriple);
      let newCurrentId = currentId + 3 * this.currentTriple;
      if (newCurrentId < 0) {
        console.log(newCurrentId);
        newCurrentId = -1 * newCurrentId;
      }
      // if (this.newSplicePos != 0) {
      this.animationsAction({
        imageAction: "leave",
      });
      setTimeout(this.changeCurrentItemPreview, this.interval, newCurrentId);
      // } else {
      //   this.animationsAction({
      //     imageAction: "leave",
      //   });
      //   setTimeout(this.changeCurrentItemPreview, this.interval, newCurrentId);
      // }
    },

    blockButtons() {
      document
        .querySelector(".myWorks__slider-next")
        .setAttribute("disabled", "disabled");
      document
        .querySelector(".myWorks__slider-prev")
        .setAttribute("disabled", "disabled");
      console.log("blocked");
    },

    unblockButtons() {
      document
        .querySelector(".myWorks__slider-next")
        .removeAttribute("disabled", "disabled");
      document
        .querySelector(".myWorks__slider-prev")
        .removeAttribute("disabled", "disabled");
      console.log("unblocked");
    },
  },

  async created() {
    console.log(this.currentTriple);
    const responseWorks = await axios.get("/works/154");
    this.works = this.makeArrayWithRequiredImages(responseWorks.data);
    this.isCreate = true;
  },
});
