import { Template } from "../types";

const expressTemplate = new Template({
  fileName: "index.js",
  content: {
    0: "import Express from 'Express",
    1: "const app = Express();",
    2: `app.listen(8080, ()=> "App is listening on PORT ", 8080);`,
  },
});

export function getExpressIndex(params: { ts?: boolean }) {
    const {ts = false} = params;


  const template = structuredClone(expressTemplate);

    if(ts){
        const parts = template.fileName.split(".");
        parts[1] = "ts"
        template.fileName = parts.join(".")
    }



}
