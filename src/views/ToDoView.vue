

<template>
  <div>
    <h1>Tasks for {{ date }}</h1>

    <form @submit.prevent="addTask">
      <input type="text" v-model="newTask" placeholder="Enter a new task" />
      <button type="submit">Add Task</button>
    </form>

    <form v-if="selectedDate">
      <input type="text" v-model="newTask" placeholder="Enter a new task" />
      <button @click.prevent="addTask">Add Task</button>
    </form>

    <!-- Display the tasks -->
    <ul v-if="tasks && tasks.length">
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" :id="'taskDisplay' + index" v-model="task.completed" />
        <label :for="'taskDisplay' + index">{{ task.description }}</label>
        <button @click="deleteTask(index)">Delete</button>
      </li>
    </ul>
    <p v-else>No tasks available for the selected date</p>
  </div>
</template>
  
<script>
import { data } from "c:/gitreps/vue-weather/src/shared/data.js";

export default {
  props: {
    date: {
      type: String,
      required: true, // To ensure the date prop is required
    },
  },

  data() {
    return {
      newTask: "",
      tasks: [], // Array to hold tasks
      selectedDate: null,
    };
  },

  async created() {
    await this.loadTasks();
  },

  methods: {
    async addTask() {
      try {
        // Add tasks using this.date instead of this.selectedDate
        const response = await data.addTasks({
          description: this.newTask,
          completed: false,
          date: new Date(this.date).toISOString().substring(0, 10),
        });

      

        this.tasks.push(response);
        this.newTask = "";
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async deleteTask(index) {
      const taskId = this.tasks[index].id; // Assuming each task has an 'id' field
      try {
        await data.deleteTask(taskId); // Call the function to delete the task
        this.tasks.splice(index, 1); // Remove the task from the local list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    async loadTasks() {
      try {
        // Fetch tasks related to the selected date
        const response = await data.getTasks();
        this.tasks = response.filter((task) => task.date === this.date);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
  },
};
</script>
  
  