import express from 'express';
import pasture from '../Controllers/pastures';



const PastureRouter = express.Router();

PastureRouter.post(
	'/add',
	pasture.addPasture
);

PastureRouter.get('/', pasture.getPasture);







export default PastureRouter;
