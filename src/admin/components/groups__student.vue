<template lang="pug">
div
  //- pre {{student}}
  div.student
    input(type="text" :disabled="!editMode" v-model="currentStudent.surname").student__input
    input(type="text" :disabled="!editMode" v-model="currentStudent.name").student__input.student__input--surname
    input(type="text" :disabled="!editMode" v-model="currentStudent.thirdname").student__input.student__input--thirdname
    .student__buttons(v-if="!editMode")
      .student__buttons--edit(@click="editStudent")
      .student__buttons--delete(@click="deleteStudent")
    .student__buttons(v-else)
      .student__buttons--save(@click="saveStudent")
      .student__buttons--cancel(@click="cancelEditStudent")
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    student: Object
  },
  data() {
    return {
      currentStudent: { ...this.student },
      editMode: false
    };
  },
  methods: {
    ...mapActions("groups", ["editStudentInGroup"]),
    editStudent() {
      this.editMode = !this.editMode;
    },
    deleteStudent() {},
    saveStudent() {
      this.editMode = !this.editMode;
      console.log(this.currentStudent);
      this.editStudentInGroup(this.currentStudent);
    },
    cancelEditStudent() {
      this.currentStudent = { ...this.student };
      this.editMode = !this.editMode;
    }
  }
};
</script>
<style lang="postcss" scoped>
.student {
  display: flex;
  width: 100%;
}
.student__input {
  border: none;
  width: 28%;
  margin-right: 2%;
  border-bottom: 1px solid black;
  &--surname {
    width: 25%;
    /* margin-right: 2; */
  }
  &--thirdname {
    width: 33%;
    /* margin-right: 2; */
  }
}
.student__buttons {
  display: flex;
}
.student__buttons--edit {
  /* padding-right: 50px; */
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("pencil.svg", fill= "#383bcf") center center no-repeat /
      contain;
    width: 15px;
    height: 15px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.student__buttons--delete {
  /* padding-right: 3.125rem; */
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("trash.svg", fill= "red") center center no-repeat /
      contain;
    width: 13px;
    height: 13px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.student__buttons--save {
  /* padding-right: 50px; */
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("tick.svg", fill= "green") center center no-repeat /
      contain;
    width: 15px;
    height: 15px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.student__buttons--cancel {
  /* padding-right: 3.125rem; */
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("remove.svg", fill= "red") center center no-repeat /
      contain;
    width: 13px;
    height: 13px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
</style>