<template lang="pug">
  .group__content.content
    //- pre {{currentGroup}}
    //- pre {{group_id}}
    //- pre {{groupName}}
    .group__title-wrap
      h2.group__title.tittle Новая группа
    .group__form
      .group__info.group__info--group
        .group__label-wrap.group__label-wrap--name
          label().group__label.label Введите название группы
          input(type="text" v-model="groupName" name="name" id="name").input.group__input

        .group__label-wrap.group__label-wrap--status
          label().group__label.label Введите почту старосты
          input(type="email" name="email" id="email" v-model="headmanEmail").input.group__input
        //- .group__label-wrap.group__label-addGroup
        //-   button(type="button" name="submit" value="Сохранить" @click="addGroup" v-if="isNewGroup" ).btn.group__submit Создать группу
      .group__info.group__info--student()
        h2.group__title.tittle.group__title--student Студент

        .group__label-wrap.group__label-wrap--student.group__label-wrap--surname
          label().group__label.label Фамилия
          input(type="text" v-model="student_surname" name="student" id="student").input.group__input

        .group__label-wrap.group__label-wrap--student
          label().group__label.label Имя
          input(type="text" v-model="student_name" name="student" id="student").input.group__input
        
        .group__label-wrap.group__label-wrap--student.group__label-wrap--thirdname
          label().group__label.label Отчество
          input(type="text" v-model="student_thirdname" name="student" id="student").input.group__input
        .group__label-wrap.group__label-addGroup
          button(type="submit" name="submit" value="Сохранить" @click="addStudent" ).btn.group__submit Добавить студента

      .group__buttons
          button(type="reset" name="cancel" value="Отменить" @click="closeEdit" ).group__reset Отменить
          button(type="submit" name="submit" value="Сохранить" v-if="mode=='add'" @click="submitNewGroup" ).btn.group__submit Создать группу
          button(type="submit" name="submit" value="Сохранить" v-if="mode=='edit'" ).btn.group__submit Сохранить
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      isNewGroup: true,
      currentGroup: "",
      mode: "add",
      groupName: "ИДБ 16 01",
      student_name: "Никита",
      student_surname: "Еремеев",
      student_thirdname: "Владиславович",
      showStudent: false,
      studentsArray: [],
      headmanEmail: "test@mail.ru",
      group_id: ""
    };
  },
  mounted() {
    this.addGroup();
  },
  methods: {
    ...mapActions("groups", ["addNewGroup"]),
    ...mapActions("helped", ["changeShowGroupStatus"]),
    addGroup() {
      if (this.groupName) {
        let groupId = this.groupId();
        if (groupId === "empty") {
          this.group_id = 1;
        } else {
          this.group_id = groupId + 1;
        }
        // this.showStudent = !this.showStudent;
        this.isNewGroup = false;
      }
    },

    addStudent() {
      let studentsData = {
        name: this.student_name,
        surname: this.student_surname,
        thirdname: this.student_thirdname,
        group_id: this.group_id,
        student_id: this.studentsArray.length + 1
      };
      this.studentsArray.push(studentsData);
      this.student_name = "";
      this.student_surname = "";
      this.student_thirdname = "";
    },
    submitNewGroup() {
      let groupWithStudents = {
        group_id: this.group_id,
        groupName: this.groupName,
        headmanEmail: this.headmanEmail,
        studentsInGroup: this.studentsArray
      };
      console.log(groupWithStudents);
      this.addNewGroup(groupWithStudents);
      this.changeShowGroupStatus(false);
    },
    ...mapActions("helped", ["changeShowGroupStatus"]),
    closeEdit() {
      this.changeShowGroupStatus(false);
    }
  },
  computed: {
    ...mapGetters("groups", ["groupId"])
  }
};
</script>

<style lang="postcss" scoped>
@import url("../../styles/mixins.pcss");
.group__user-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.group__user-file + label {
  cursor: pointer;
}

.group__title {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #414c63;
  margin-bottom: 4.625rem;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.group__user-avatar {
  width: 200px;
  height: 200px;
  background-color: #dee4ed;
  border-radius: 50%;
  margin-bottom: 20px;
  position: relative;
  background-size: cover;
  &:before {
    content: "";
    background: svg-load("user-admin.svg", fill= "#fff") center center no-repeat /
      contain;
    width: 5.125rem;
    height: 5.125rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.imaged {
  &:before {
    display: none;
  }
}

.group__label {
  margin-bottom: 20px;
  display: block;
  opacity: 0.5;
  color: #414c63;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
}
.group__input {
  width: 100%;
  background-color: transparent;
  color: #414c63;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  border: none;
  border-bottom: 2px solid #414c63;
  padding: 0px 5px 10px 5px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  &:hover {
    border-bottom: 2px solid $orange;
  }
  &:active {
    border-bottom: 2px solid $orange;
  }
}
.group__content {
  background-color: white;
  border: 1px solid #efefef;
  border-radius: 6px;
  box-shadow: 0.25rem 0.1875rem 1.25rem rgba(0, 0, 0, 0.14);
}
.group__form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @include phones {
    flex-direction: column;
    align-items: center;
  }
}
.group__user {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include tablets {
    width: 24%;
  }
  @include phones {
    width: 100%;
    margin-bottom: 50px;
  }
}
.group__info {
  width: 100%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* padding-right: 15%; */
  @include tablets {
    padding: 0;
    width: 71%;
  }

  @include phones {
    width: 100%;
  }
}
.group__label-wrap {
  position: relative;
  &--name {
    width: 47%;
    margin-right: 6%;
    @include tablets {
      width: 75%;
    }
  }
  &--status {
    width: 47%;
    @include tablets {
      width: 75%;
    }
  }
  &--review {
    width: 100%;
  }
  @include phones {
    width: 100%;
  }
}
.group__input--desc {
  border: 1px solid #414c63;
  height: 180px;
  &:hover {
    border: 1px solid $orange;
  }
  &:active {
    border: 1px solid $orange;
  }
}
.group__buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}
.group__reset {
  background: transparent;
  border: none;
  color: $orange;
  margin-right: 30px;
  cursor: pointer;
}
.group__user-text {
  text-align: center;
  color: $orange;
  font-weight: 600;
}

.validErrorImg {
  border: 2px solid #cd1515;
  &:hover {
    border: 2px solid #cd1515;
  }
}
.validError {
  border-bottom: 2px solid #cd1515;
  &:hover {
    border-bottom: 2px solid #cd1515;
  }
}
.error-input {
  background: #cd1515;
  font-size: 0.75rem;
  position: absolute;
  bottom: -1.5rem;
  z-index: 5;
  left: 0;
  color: white;
  padding: 15px 20px;
  &:after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7.5px 15px 7.5px;
    border-color: transparent transparent #cd1515 transparent;
    position: absolute;
    top: -0.225rem;
    left: 50%;
    transform: translate(0, -50%);
  }
}
.validErrorTextarea {
  border: 2px solid #cd1515;
  &:hover {
    border: 2px solid #cd1515;
  }
}
.group__label-wrap--course {
  width: 10%;
}
.group__title--student {
  width: 100%;
  /* margin-bottom: 40px; */
}
.group__label-wrap--student {
  width: 30%;
  margin-right: 5%;
  &:last-child {
    margin-right: 0px;
  }
}
.group__label-wrap--thirdname {
  margin-right: 0px;
}
.group__label-addGroup {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.group__info {
  margin-bottom: 30px;
}
.group__info--student {
}
</style>