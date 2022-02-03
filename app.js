import express from "express";
import Axios from "axios";

const app = express();
const PORT = 8000;

app.get("/todos", async (req, res) => {
  const response = await Axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (!response) {
    return res.status(404).json({ message: "Todos API not found" });
  }
  const resp = response.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      completed: item.completed,
    };
  });
  return res.status(200).send(resp);
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  const todoResponse = await Axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (!todoResponse) {
    return res.status(403).json({ message: "Todo API is not working" });
  }

  const filtered_todo = todoResponse.data.filter((item) => {
    return item.userId == userId;
  });

  const response = await Axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response) {
    res
      .status(403)
      .send("Either the API is not working or the userId is not found!!");
  }

  const finalData = {
    id: response.data.id,
    name: response.data.name,
    email: response.data.email,
    phone: response.data.phone,
    todos: filtered_todo,
  };
  res.status(200).send(finalData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
