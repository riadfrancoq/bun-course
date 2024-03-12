// plugin 

import { Elysia } from "elysia";

const plugin = new Elysia()
.state('plugin-version', 1)
.get('/form-plugin', ()=> {
  return "Hi";
})
.get('/greet', ()=> "Hello World")
;

export default plugin;