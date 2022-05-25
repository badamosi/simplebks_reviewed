import { createRouter, createWebHistory } from "vue-router";

import {
    authenticated,
    notAuthenticated,
    // guest,
  } from "../middleware/authentication";

// Views
import Login from "../pages/Login";
import OrderItems from "../pages/OrderItems";
import EditOrderItem from "../pages/EditOrderItem";
// import CarWash from "../pages/CarWash";

// WebHistory
const history = createWebHistory();

const routes = [
    {
        path: "",
        component: OrderItems,
        name: "Dashboard",
        meta: {
            title: "Order Items",
        },
        beforeEnter:authenticated
    },
    {
        path: "/oder_items",
        component: OrderItems,
        name: "OrderItems",
        meta: {
            title: "Order Items",
        },
        beforeEnter:authenticated
    },
    {
        path: "/Account",
        component: EditOrderItem,
        name: "EditOrderItem",
        meta: {
            title: "Order Items",
        },
        beforeEnter:authenticated
    },
    {
        path: "/login",
        component: Login,
        name: "login",
        meta: {
            title: "Login",
        },
        beforeEnter:notAuthenticated
    },
];

const router = createRouter({
    history,
    routes,
});

export default router;
