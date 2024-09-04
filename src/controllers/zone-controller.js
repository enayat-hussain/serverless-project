const Zone = require('../services/zone-service');
module.exports = {
  create: async (req, res) => {
    const { body, headers } = req;
    const clientId = headers['client-id'];

    if (!body) return res.status(400).send({ message: 'Please provide zone details' });

    const result = await Zone.create({ body, clientId });
    res.send(result);
  },
  update: async (req, res) => {
    const { body, headers } = req;
    const clientId = headers['client-id'];

    if (!body) return res.status(400).send({ message: 'Please provide zone details' });

    const result = await Zone.update({ body, clientId });
    res.send(result);
  },
  list: async (req, res) => {
    const { headers } = req;
    const clientId = headers['client-id'];
    const result = await Zone.list(clientId);
    res.send(result);
  },
  getZoneInfo: async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: 'Zone id required' });

    const result = await Zone.zoneInfo(id);
    return res.status(200).send(result);
  },
  deleteZone: async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: 'Zone id required' });

    const result = await Zone.deleteZone(id);
    return res.status(200).send(result);
  },
};
