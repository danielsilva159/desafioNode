const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, tech} = request.body
 const repository = {id: uuid(), title, url, tech, like:0};
 repositories.push(repository);

 return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, tech} = request.body
const repositorieIndex = repositories.findIndex(res => res.id === id)
if(repositorieIndex < 0){
    return response.status(400).json({error: 'repositorie not found.'})
}
const repositorie = {id, title, url, tech}
console.log(request.body);
repositories[repositorieIndex] = repositorie;
    return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositorieIndex = repositories.findIndex(res => res.id === id)
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'repositorie not found.'})
}
repositories.splice(repositorieIndex,1);
return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const repositorieIndex = repositories.findIndex(res => res.id === id)
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'repositorie not found.'})
  }
repositories[repositorieIndex].like++;
return response.json(repositories[repositorieIndex])
});


module.exports = app;
