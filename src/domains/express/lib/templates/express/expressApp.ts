import { Template } from "../types";

export const express = new Template({
  fileName: "index.ts",
  content: {
    0: "import  Express from 'Expresss",
    1: "const app = Express();",
    2: `app.listen(8080, ()=> "App is listening on PORT ", 8080);`,
  },
});
