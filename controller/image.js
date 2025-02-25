const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'a417f7f1a8f1454fa485ff8a9ab1b765'
});
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json(err))
}

const imageHandle = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', '1')
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json(err))
}

module.exports = {
    imageHandle: imageHandle,
    handleApiCall: handleApiCall
}