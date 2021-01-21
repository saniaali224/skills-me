import express from 'express';
import cattle from '../Controllers/cattles';



const cattleRouter = express.Router();

cattleRouter.post(
	'/add',
	cattle.addCattle
);

cattleRouter.get('/', cattle.getCattle);



// only admin can delete
cattleRouter.delete(
	'/delete/:id',
	cattle.deleteCattle
);



export default cattleRouter;
