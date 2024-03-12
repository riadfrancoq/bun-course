import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia")
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

  console.log(store);
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
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
