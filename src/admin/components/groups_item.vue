<template lang="pug">
  div
    //- pre {{group}}
    .group__preview
      //- .group__avatar
        //- img(src="../../images/content/user2.jpg").user__img
        //- img(:src="review.photo").user__img
      .group__preview-info
        .group__name-wrap 
          input(:class="{group__active:editMode}" type="text" ref="groupName" :disabled="!editMode" v-model="currentGroup.groupName").group__name
        .group__status-wrap
          input(type="text" :class="{group__active:editMode}" :disabled="!editMode" v-model="currentGroup.headmanEmail").group__status
    .group__desc(ref="studentsList")
      .group__desc-text(v-for="student in group.studentsInGroup")
        STUDENT_IN_GROUP(:student="student")
    label Добавить студента:
    .group__desc-student.student
        input(type="text" placeholder="Фамилия" v-model="studentSurname ").student__input.student__input--surname
        input(type="text" placeholder="Имя"  v-model="studentName").student__input
        input(type="text" placeholder="Отчество"  v-model="studentThirdname").student__input.student__input--thirdname
        .student__add(@click="addStudent")
    .group__desc-controls(v-if="!editMode")
      .group__desc-correct(@click="correctGroup") Править
      .group__desc-remove(@click="deleteCurrentGroup(group.group_id)") Удалить
    .group__desc-controls(v-else)
      .group__desc-correct(@click="saveGroup") Сохранить
      .group__desc-remove(@click="cancelEdited") Отменить

</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import STUDENT_IN_GROUP from "./groups__student";
export default {
  components: {
    STUDENT_IN_GROUP
  },
  props: {
    group: Object
  },
  data() {
    return {
      currentGroup: { ...this.group },
      editMode: false,
      editedGroup: "",
      studentSurname: "",
      studentName: "",
      studentThirdname: ""
    };
  },
  methods: {
    ...mapActions("groups", ["editGroup", "deleteGroup", "addNewStudent"]),
    cancelEdited() {
      this.editMode = !this.editMode;
      this.currentGroup = { ...this.group };
    },
    deleteCurrentGroup(groupID) {
      console.log(groupID);
      this.deleteGroup(groupID);
    },
    correctGroup() {
      this.editMode = !this.editMode;
      // document.querySelector("#groupName").focus();
      this.$refs.groupName.focus();
      // console.log(document.querySelector("#groupName"));
    },
    saveGroup() {
      this.editedGroup = {
        ...this.currentGroup,
        groupName: this.currentGroup.groupName,
        headmanEmail: this.currentGroup.headmanEmail
      };
      console.log(this.editedGroup);
      this.editMode = !this.editMode;
      this.editGroup(this.editedGroup);
    },
    addStudent() {
      let newStudent = {
        name: this.studentName,
        surname: this.studentSurname,
        thirdname: this.studentThirdname,
        group_id: this.group.group_id,
        student_id: this.group.studentsInGroup.length + 1
      };
      // console.log(newStudent);
      this.addNewStudent(newStudent);
      this.studentName = "";
      this.studentSurname = "";
      this.studentThirdname = "";
      this.$refs.studentsList.scrollTop = 999;
    }
  }
};
</script>

<style lang="postcss" scoped>
.student__add {
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    background: svg-load("remove.svg", fill= "#fff") center center no-repeat /
      contain;
    /* width: 2.125rem;
    height: 2.125rem; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.student {
  padding-left: 55px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.student__input {
  border: none;
  border-bottom: 1px solid black;
  margin-right: 1%;
  width: 25%;
  &--thirdname {
    width: 30%;
    margin-right: 0;
  }
  &--surname {
    width: 28%;
  }
}
.group__preview {
  display: flex;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #414c63;
  margin-bottom: 20px;
}
.group__avatar {
  margin-right: 20px;
}
.group__name {
  color: #414c63;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 5px;
}

.group__status {
  opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  border: none;
}
.group__desc-text {
  width: 100%;
  opacity: 0.7;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 20px;
}
.group__desc-controls {
  display: flex;
  justify-content: space-between;
  min-width: 95%;
}
.group__desc {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.group__desc-controls {
  align-items: flex-end;
  position: absolute;
  bottom: 2%;
}
.group__desc-controls {
  display: flex;
  justify-content: space-between;
  /* opacity: 0.5; */
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.group__desc-correct {
  padding-right: 50px;
  position: relative;
  margin-right: 40px;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("pencil.svg", fill= "#383bcf") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.group__desc-remove {
  padding-right: 3.125rem;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    background: svg-load("remove.svg", fill= "red") center center no-repeat /
      contain;
    width: 20px;
    height: 20px;
    opacity: initial;
    position: absolute;
    top: 15%;
    left: 63%;
  }
}
.group__desc {
  height: 200px;
  overflow: auto;
}

.group__name-wrap {
  margin-bottom: 5px;
}
.group__status {
  padding-bottom: 5px;
  border-bottom: 1px solid transparent;
}
.group__active {
  border-bottom: 1px solid orange;
}
.student__input {
  padding-bottom: 5px;
}
</style>