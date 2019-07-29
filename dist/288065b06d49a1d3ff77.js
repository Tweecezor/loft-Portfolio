(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{446:function(t,e,a){"use strict";a.d(e,"a",function(){return r});var o=a(97),r=function(t){var e=o.a.defaults.baseURL;return"".concat(e,"/").concat(t)}},447:function(t,e,a){},453:function(t,e,a){"use strict";var o=a(447);a.n(o).a},459:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addWorks__content"},[a("div",{staticClass:"addWorks__content-caption-wrap"},["add"==t.mode?a("h2",{staticClass:"addWorks__content-caption"},[t._v("Добавление работы")]):"edit"==t.mode?a("h2",{staticClass:"addWorks__content-caption"},[t._v("Редактирование работы")]):t._e(),a("div",{staticClass:"addWorks__form"},[a("div",{staticClass:"addWorks__file",style:{"background-image":"url("+this.photoURl+")"}},[a("div",{staticClass:"addWorks__file-upload"},[a("div",{staticClass:"addWorks__load-text"},[a("p",[t._v("Перетащите или загрузите для загрузки изображения")]),a("input",{staticClass:"addWorks__file-input",attrs:{type:"file",id:"photoFile",accept:"image/*"},on:{change:t.loadPhoto}}),a("label",{staticClass:"addWorks__file-btn btn",attrs:{for:"photoFile"}},[t._v("Загрузить")])])])]),a("div",{staticClass:"addWorks__info"},[a("div",{staticClass:"addWorks__label-wrap"},[a("label",{staticClass:"addWorks__label",attrs:{for:"input-title"}},[t._v("Название")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.workData.title,expression:"workData.title"}],staticClass:"addWorks__input addWorks__input--title",attrs:{type:"text",name:"title",id:"input-title"},domProps:{value:t.workData.title},on:{input:function(e){e.target.composing||t.$set(t.workData,"title",e.target.value)}}})]),a("div",{staticClass:"addWorks__label-wrap"},[a("label",{staticClass:"addWorks__label",attrs:{for:"input-link"}},[t._v("Ссылка")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.workData.link,expression:"workData.link"}],staticClass:"addWorks__input addWorks__input--link",attrs:{type:"text",name:"link",id:"input-link"},domProps:{value:t.workData.link},on:{input:function(e){e.target.composing||t.$set(t.workData,"link",e.target.value)}}})]),a("div",{staticClass:"addWorks__label-wrap"},[a("label",{staticClass:"addWorks__label",attrs:{for:"input-desc"}},[t._v("Описание")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.workData.description,expression:"workData.description"}],staticClass:"addWorks__input addWorks__input--desc",attrs:{name:"desc",id:"input-desc"},domProps:{value:t.workData.description},on:{input:function(e){e.target.composing||t.$set(t.workData,"description",e.target.value)}}})]),a("div",{staticClass:"addWorks__label-wrap"},[a("label",{staticClass:"addWorks__label",attrs:{for:"input-tag"}},[t._v("Добавление тега")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.workData.techs,expression:"workData.techs"}],staticClass:"addWorks__input addWorks__input--tags",attrs:{type:"text",name:"tag",id:"input-tag"},domProps:{value:t.workData.techs},on:{input:function(e){e.target.composing||t.$set(t.workData,"techs",e.target.value)}}})]),a("div",{staticClass:"addWorks__tags-list-wrap"},[a("ul",{staticClass:"addWorks__tags-list"},t._l(t.tagsArray,function(e){return 0!=t.tagsArray&&""!=e?a("li",{staticClass:"addWorks__tags-item"},[t._v(t._s(e))]):t._e()}),0)]),a("div",{staticClass:"addWorks__buttons"},[a("button",{staticClass:"addWorks__reset",attrs:{type:"reset",name:"cancel",value:"Отменить"},on:{click:t.toogleAddingForm}},[t._v("Отменить")]),"add"==t.mode?a("button",{staticClass:"btn addWorks__submit",attrs:{type:"submit",name:"submit",value:"Сохранить"},on:{click:t.addNewWorks}},[t._v("Сохранить")]):t._e(),"edit"==t.mode?a("button",{staticClass:"btn addWorks__submit",attrs:{type:"submit",name:"submit",value:"Сохранить"},on:{click:t.updateCurrentWork}},[t._v("Сохранить")]):t._e()])])])])])};o._withStripped=!0;var r,s=a(11),i=a(446),n=a(52);function d(t,e,a,o,r,s,i){try{var n=t[s](i),d=n.value}catch(t){return void a(t)}n.done?e(d):Promise.resolve(d).then(o,r)}function l(t){return function(){var e=this,a=arguments;return new Promise(function(o,r){var s=t.apply(e,a);function i(t){d(s,o,r,i,n,"next",t)}function n(t){d(s,o,r,i,n,"throw",t)}i(void 0)})}}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},o=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),o.forEach(function(e){u(t,e,a[e])})}return t}function u(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var p={mixins:[a(52).mixin],validators:(r={"workData.title":function(t){return n.Validator.value(t).required("Поле навык обязательно для заполнения")},"workData.link":function(t){return n.Validator.value(t).required("Поле навык обязательно для заполнения")},"workData.description":function(t){return n.Validator.value(t).required("Поле навык обязательно для заполнения")}},u(r,"workData.title",function(t){return n.Validator.value(t).required("Поле навык обязательно для заполнения")}),u(r,"workData.techs",function(t){return n.Validator.value(t).required("Поле навык обязательно для заполнения")}),u(r,"workData.photo",function(t){return n.Validator.value(t).required("Вставьте файл")}),r),props:{mode:String},data:function(){return{workData:{title:"",link:"",description:"",techs:"",photo:""},photoURl:"",hasImage:!1,tagsArray:[]}},methods:c({},Object(s.b)("works",["addWork","updateWork"]),Object(s.b)("tooltips",["showTooltip","hideTooltip"]),{toogleAddingForm:function(){this.$emit("toogleAddingForm")},loadPhoto:function(t){var e=this,a=t.target.files[0];this.workData.photo=a,this.hasImage=!0;var o=new FileReader;try{o.readAsDataURL(a),o.onload=function(){e.photoURl=o.result,console.log(e.photoURl)}}catch(t){alert(t.message),console.log(t.message)}},addNewWorks:function(){var t=l(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$validate();case 2:if(t.t0=t.sent,!1!==t.t0){t.next=6;break}return this.showTooltip({type:"error",text:"Ошибка валидации"}),t.abrupt("return");case 6:return t.next=8,this.addWork(this.workData);case 8:this.showTooltip({type:"success",text:"Работа успешно добавлена"}),this.$emit("toogleAddingForm");case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),updateCurrentWork:function(){var t=l(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$validate();case 2:if(t.t0=t.sent,!1!==t.t0){t.next=7;break}return this.showTooltip({type:"error",text:"Ошибка валидации"}),this.workData=c({},this.currentWork),t.abrupt("return");case 7:return t.prev=7,t.next=10,this.updateWork(this.workData);case 10:this.showTooltip({type:"success",text:"Работа успешно обновлена"}),this.$emit("toogleAddingForm"),t.next=17;break;case 14:t.prev=14,t.t1=t.catch(7),alert(t.t1.message);case 17:case"end":return t.stop()}},t,this,[[7,14]])}));return function(){return t.apply(this,arguments)}}(),addingMode:function(){this.workData={title:"",link:"",description:"",techs:"",photo:""},this.photoURl=""},editingMode:function(){this.workData=c({},this.currentWork),this.photoURl=Object(i.a)(this.workData.photo)}}),watch:{"workData.techs":function(){this.tagsArray=this.workData.techs.split(",")},mode:function(){"add"==this.mode?(alert("вотчер добавления"),console.log("Режим добавления"),this.addingMode()):"edit"==this.mode&&(alert("вотчер редактирования"),console.log("Режим редактирования"),this.editingMode())},currentWork:function(){this.workData=c({},this.currentWork)}},computed:c({},Object(s.c)("works",{currentWork:function(t){return t.currentWork}})),created:function(){"add"==this.mode?(console.log("Режим добавления"),this.addingMode(),console.log(this.workData)):"edit"==this.mode&&(console.log("Режим редактирования"),this.editingMode(),console.log(this.workData))}},k=(a(453),a(24)),h=Object(k.a)(p,o,[],!1,null,"3aaed66e",null);h.options.__file="src/admin/components/works-add-new.vue";e.default=h.exports}}]);