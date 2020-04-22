<template lang="pug">
  .container
    .groups 
      //- pre {{groups}}
      ADD_NEW_GROUP(v-if="showAddGroup")
      ul.groups__list
        li.groups__item.groups__add_new(@click="showAddNew")
          .groups__new  
            .groups__new-icon
            .groups__new-text Добавить группу
        li.groups__item(v-for="group in groups")
          GROUP_ITEM(:group="group")

        
        
</template>

<script>
import { mapActions, mapState } from "vuex";
import ADD_NEW_GROUP from "./groups_add-new";
import GROUP_ITEM from "./groups_item";
export default {
  components: {
    ADD_NEW_GROUP,
    GROUP_ITEM
  },
  data() {
    return {
      // currentGroup: "",
      // groupsArray: []
    };
  },
  methods: {
    ...mapActions("helped", ["changeShowGroupStatus"]),
    showAddNew() {
      this.changeShowGroupStatus(true);
    }
  },
  computed: {
    ...mapState("groups", {
      groups: state => state.groups
    }),
    ...mapState("helped", {
      showAddGroup: state => state.showAddGroup
    })
  },
  mounted() {
    this.changeShowGroupStatus(false);
  }
};
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.groups {
  width: 100%;
  height: 100%;
  /* background: red; */
  /* border: 1px solid black; */
}
.groups__list {
  display: flex;
  flex-wrap: wrap;
}
.groups__item {
  min-height: 380px;
  padding: 15px 10px;
  width: calc((100%-2%) / 2);
  margin-right: 1%;
  margin-bottom: 5%;
  background: white;
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  position: relative;
  padding-bottom: 50px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  @include tablets {
    width: 48%;
    margin-right: 4%;
    &:nth-child(2n) {
      margin-right: 0px;
    }
    &:nth-child(3n) {
      margin-right: 4%;
    }
  }
  @include phones {
    width: 100%;
    margin-right: 0%;
    &:nth-child(2n) {
      margin-right: 0px;
    }
    &:nth-child(3n) {
      margin-right: 0%;
    }
  }
}
.groups__add_new {
  background: linear-gradient(to left, #ea7400 0%, #f29400 100%);
  /* width: 30%; */
}
.groups__new {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @include phones {
    flex-direction: row;
    height: 100%;
  }
}
.groups__new-icon {
  display: flex;
  width: 150px;
  height: 150px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  &:before {
    content: "";
    background: svg-load("remove.svg", fill= "#fff") center center no-repeat /
      contain;
    width: 2.125rem;
    height: 2.125rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  @include phones {
    width: 4.375rem;
    height: 4.375rem;
    margin-bottom: 0;
  }
}
.groups__new-text {
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  color: white;
  width: 5.875rem;
  text-align: center;
  @include phones {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.875rem;
    color: #fff;
    width: 9.875rem;
    text-align: center;
  }
}
</style>