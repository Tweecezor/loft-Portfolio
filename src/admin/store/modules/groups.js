export default {
  namespaced: true,
  state: {
    groups: [],
  },
  actions: {
    addNewGroup(store, newGroup) {
      store.commit("ADD_NEW_GROUP", newGroup);
    },
    editGroup(store, editedGroup) {
      store.commit("EDIT_GROUP", editedGroup);
    },
    deleteGroup(store, groupID) {
      store.commit("DELETE_GROUP", groupID);
    },
    editStudentInGroup(store, editedStudent) {
      console.log(editedStudent);
      store.commit("EDIT_STUDENT", editedStudent);
    },
    addNewStudent(store, newStudent) {
      console.log(newStudent);
      store.commit("ADD_STUDENT", newStudent);
    },
  },
  mutations: {
    ADD_STUDENT(state, newStudent) {
      // console.log(newStudent);
      state.groups = state.groups.map((item) => {
        // console.log(item);
        // console.log(newStudent);
        if (item.group_id === newStudent.group_id) {
          item.studentsInGroup.push(newStudent);
        }
        return item;
      });
    },
    EDIT_STUDENT(state, editedStudent) {
      state.groups = state.groups.map((item) => {
        // console.log(item);
        if (item.group_id === editedStudent.group_id) {
          item.studentsInGroup = item.studentsInGroup.map((student) => {
            // console.log(student);
            // console.log(editedStudent);
            // if (student.student_id === editedStudent.student_id) {
            //   console.log("меняем студента");
            //   return editedStudent;
            // } else {
            //   return student;
            // }
            return student.student_id === editedStudent.student_id
              ? editedStudent
              : student;
          });
        }
        return item;
      });
      console.log(state.groups);
    },
    DELETE_GROUP(state, groupID) {
      state.groups = state.groups.filter((item) => {
        return item.group_id !== groupID;
      });
      console.log(state.groups);
    },
    ADD_NEW_GROUP(state, newGroup) {
      state.groups.push(newGroup);
    },
    EDIT_GROUP(state, editedGroup) {
      state.groups = state.groups.map((item) => {
        // console.log(item);
        // console.log(editedGroup);
        // if (item.group_id === editedGroup.group_id) {
        //   console.log("Нужная группа и меняем");
        //   return editedGroup;
        // } else {
        //   return item;
        // }
        return item.group_id === editedGroup.group_id ? editedGroup : item;
      });
      console.log(state.groups);
    },
  },
  getters: {
    groupId: (state) => () => {
      let ID = "empty";
      state.groups.forEach((item) => {
        return (ID = item.group_id);
      });
      return ID;
    },
  },
};
