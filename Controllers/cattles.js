import status from 'http-status';
import CattleSchema from '../Models/cattles';
import PastureSchema from '../Models/pastures';

const getCattle = (req, res) => {
    CattleSchema.find()
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
const addCattleRefToPasture = (pId, CId) => {
	return new Promise((resolve, reject) => {
		// pushing id of comment to Article Model to get the comment by referemnce is articles
				PastureSchema.findOneAndUpdate(
					{ _id: pId },
					{ $push: { cattleId: CId } },
					{ upsert: true, new: true },
					(err, doc) => {
						if (err) {
							// eslint-disable-next-line prefer-promise-reject-errors
							reject(
								`Internal Server error. Cannot add categories reference in menu ${err}`,
							);
						} else {
							resolve(doc);
						}
					});
			});

		};
const addCattle = (req, res) => {
    const { name,
        age,
        gender,
        weight,
        height,
        color,
        health,
        price,
        cattlestatus,
        pastureId
        } = req.body;

    const event = new CattleSchema({
        name,
        age,
        gender,
        weight,
        height,
        color,
        health,
        price,
        cattlestatus,
        pastureId
      
    });
    event
        .save()
        .then(savedEvent => {
            // eslint-disable-next-line no-underscore-dangle
            addCattleRefToPasture(pastureId, savedEvent._id);
            // eslint-disable-next-line no-underscore-dangle
            CattleSchema.findOne({ _id: savedEvent._id })
                .populate('pastureId', 'pastureNumber')
                .then(cmnt => {
					if (cmnt) {
						res.status(status.OK).send({
							savedCategory: cmnt,
							Message: 'Record Created Successfully',
							type: status.Ok,
						});
					}
				})
				.catch(err => {
					res.status(status.INTERNAL_SERVER_ERROR).send({
						Message: 'Can not send saved Item ',
						err,
					});
					// console.log('err', err);
				});

		})
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: status.INTERNAL_SERVER_ERROR,
                err,
            });
        });
};

const deleteCattle = (req, res) => {
    const { id } = req.params;
    CattleSchema.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(status.OK).send({
                Message: 'Event Deleted Successfully.',
            });
        } else {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Unable to Delete.',
                err,
            });
        }
    });
};





export default { getCattle, addCattle, deleteCattle };
