// types
import express from 'express';

const user = require('./user.route');
const router = express.Router();

const defaultRoutes = [
    {
      path: '/user',
      route: user,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
