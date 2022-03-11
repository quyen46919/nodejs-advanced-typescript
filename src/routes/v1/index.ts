// types
import express from 'express';

const userRoute = require('./user.route');
const dishRoute = require('./dish.route');
const router = express.Router();

const defaultRoutes = [
    {
      path: '/user',
      route: userRoute,
    },
    {
      path: '/dish',
      route: dishRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
