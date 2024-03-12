import { Elysia, t } from "elysia";
import plugin from "./plugin";
import { signInDTO } from "./models";

const app = new Elysia().get("/", () => "Hello Elysia")
.use(plugin)
.state({
  id: 1,
  email: "jane@gmail.com",

})
.decorate('getDate', ()=> {return Date.now()})
.get("/post/:id", ({params: {id}})=>  {
  return {id};
}).post('/post', ({body, set, store, getDate})=> {
  console.log(set);
  set.status = 201;
  return body;
})
.get("/track/*", ()=> {return "Track Route"})
.get('/tracks', ({store, getDate})=> {

  console.log(store['plugin-version']);
  console.log(getDate());
    return new Response(JSON.stringify({
      "tracks": [
        'Dancing Feet',
        'Sam I',
        'Animals'
      ]
    }),
    {
      headers: {
        'Content-Type': "application/json"
      }
    });
});

app.group('/user', app => app
.post('/sing-in', ({body}) => body, {
  body: signInDTO,
  response: signInDTO
})
.post('/:id', ({params: {id}}) => {
  return id
},
  {
    params: t.Object({
      id: t.Numeric()
    })
  }
)
);

app.group('/v1', app => app
.post('/a', () => "Sign In route")
.post('/sing-out', () => "Sign In Out")
)

app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
