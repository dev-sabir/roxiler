import express from "express";
import Axios from "axios";

const app = express();
const PORT = 8000;

app.get("/todos", async (req, res) => {
  try {
    const response = await Axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const resp = response.data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        completed: item.completed,
      };
    });
    return res.send(resp);
  } catch (error) {
    return res.status(403).json({ message: "Todo API is not wokring" });
  }
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const response = await Axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response) {
    return res.status(403).json({ message: "Users API is not working" });
  }

  const todoResponse = await Axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (!todoResponse) {
    return res.status(403).json({ message: "Todo API is not working" });
  }

  let filtered_todo;
  if (todoResponse) {
    filtered_todo = todoResponse.data.filter((item) => {
      return item.userId == userId;
    });
  }

  if (response) {
    const final = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      todos: filtered_todo,
    };
    res.send(final);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
