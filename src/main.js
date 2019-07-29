import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/parallax";
import "./scripts/reviews";
import "./scripts/hamburger-menu";
import "./scripts/style";
import "./scripts/myWorks";
import "./scripts/contact-form-validate";
import "./scripts/scrollTo";
