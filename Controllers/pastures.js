import status from 'http-status';
import PastureSchema from '../Models/pastures';

const getPasture = (req, res) => {
    PastureSchema.find()
        .then(events => {
            res.status(status.OK).send(events);
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'No Events!',
                err,
            });
        });
};

const addPasture = (req, res) => {
    const { name,
        pastureNumber,
        Temprature,
        condition
        } = req.body;

    const event = new PastureSchema({
        name,
        pastureNumber,
        Temprature,
        condition
      
    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'Record Created Successfully',
                type: status.Ok,
            });
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: status.INTERNAL_SERVER_ERROR,
                err,
            });
        });
};







export default { getPasture, addPasture  };
