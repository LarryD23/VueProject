import { createRouter, createWebHistory } from 'vue-router';
import CalendarView from '@/views/CalendarView.vue';
import WeatherView from '@/views/WeatherView.vue';
import ToDoView from '@/views/ToDoView.vue';
import AboutView from '@/views/AboutView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
const parseProps = r => ({ date: r.params.date });


const routes = [

  {
    path: '/WelcomeView',
    name: 'welcome',
    component: WelcomeView,
  },
    {
    path: '/WeatherView',
    name: 'weather',
    component: WeatherView,
  },
  {
    path: '/CalendarView',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/AboutView',
    name: 'about',
    component: AboutView,
  },

  {
    path: '/ToDoView/:date', // Updated path to include a dynamic date parameter
    name: 'toDo', 
    component: ToDoView,
    props: parseProps, 
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
