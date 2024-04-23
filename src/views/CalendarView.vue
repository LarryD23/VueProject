<template>
  <div class="calendar">
    <div class="header">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="days">
      <div
        v-for="(day, index) in uniqueDays"
        :key="index"
        @click="goToToDoView(day)"
        class="day"
      >
        {{ day }}
        <span
          v-if="tasksExistForDay(day)"
          style="font-size: 0.7em; color: #ef0b0b"
          >Event!</span
        >
      </div>
    </div>
  </div>
</template>


  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      currentDate: new Date(),
      tasks: [], // Array to hold tasks from db.json
      selectedDay: null, // Track clicked day
      dayTasks: [], // Object to hold tasks for each day
      // allDays: [], //
    };
  },

  async created() {
    // Fetch tasks from  db.json, set them to the component's data
    axios
      .get("http://localhost:8888/tasks")
      .then((response) => {
        console.log("Full response data:", response.data);
        this.tasks = response.data;
        console.log("Tasks data:", this.tasks);
        // Call  method  to process and display tasks in the calendar
        // this.initializeDayTasks();

        console.log("Unique Days:", this.uniqueDays);
        console.log(
          "Tasks Dates",
          this.tasks.map((task) => task.date)
        );
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  },

  computed: {
    currentMonth() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthIndex = this.currentDate.getMonth();
      const year = this.currentDate.getFullYear();

      return `${months[monthIndex]} ${year}`;
    },

    days() {
      const firstDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );
      const daysInMonth = lastDayOfMonth.getDate();
      const startingDay = firstDayOfMonth.getDay();
      const days = [];

      for (let i = 1; i <= startingDay; i++) {
        days.push("");
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      return days.filter((day) => day !== ""); // Filter out empty strings
    },
    uniqueDays() {
      return [...new Set(this.days)];
    },
  },

  methods: {
    tasksExistForDay(day) {
      const formattedDay = this.formatDate(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        day
      );

      // Check if tasks exist for the given day
      return this.tasks.some((task) => task.date === formattedDay);
    },

    getAllDaysInMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate(); // Get the last day of the current month
      return Array.from({ length: lastDay }, (_, index) => index + 1);
    },

    initializeDayTasks() {
      this.allDays = this.getAllDaysInMonth();

      this.allDays.forEach((day) => {
        const formattedDay = this.formatDate(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          day
        );

        const tasksForDay = this.tasks.filter(
          (task) => task.date === formattedDay
        );
        this.dayTasks[formattedDay] = tasksForDay;
      });
    },
    formatDate(year, month, day) {
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      return `${year}-${formattedMonth}-${formattedDay}`;
    },

    previousMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = new Date(this.currentDate);
      // this.initializeDayTasks();
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
      // this.initializeDayTasks();
    },
    goToToDoView(selectedDay) {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const selectedDate = new Date(year, month, selectedDay);

      // Convert the selectedDate to a string before routing
      const dateString = selectedDate.toISOString().substring(0, 10); // Get YYYY-MM-DD format as a String

      console.log("Date before passed", dateString); // Log date before passing it

      // Check if dateString is valid before navigation
      if (dateString) {
        this.$router.push({
          name: "toDo",
          params: { date: dateString },
        });
      } else {
        console.error("Invalid date selected"); // Log an error if dateString is invalid
      }
    },
  },
};
</script>
  
  


  
  <style>
.calendar {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 5px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7f7;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%;
  flex-grow: 1;
}

.day {
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.day:hover {
  background-color: #f0f0f0;
}
</style>
  