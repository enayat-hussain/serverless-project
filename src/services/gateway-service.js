const { Gateways } = require('../../db/models');
const constants = require('./constants');

const create = async ({ body }) => {
  try {
    const result = await Gateways.create({
      status: body.status,
      description: body.description,
      location: body.location,
      name: body.name,
      imageUrl: body.imageUrl,
      imei: body.imei,
      imsi: body.imsi,
      cellProvider: body.cellProvider,
      phoneNumber: body.phoneNumber,
      batteryVoltage: body.batteryVoltage,
      rssi: body.rssi,
      snr: body.rssi,
      latitude: body.latitude,
      longitude: body.longitude,
      firmwareVersion: body.firmwareVersion,
      bluetoothMac: body.bluetoothMac,
      wifiMac: body.wifiMac,
      lastCheckIn: body.lastCheckIn,
      manufacturerDate: body.manufacturerDate,
      installationDate: body.installationDate,
      errorCode: body.errorCode,
      carrier: body.carrier,
      signalStrength: body.signalStrength,
      propertyId: body.propertyId,
      projectId: body.projectId,
      zoneId: body.zoneId,
      miscData: body.miscData,
      thingName: body.thingName,
      isOnline: body.isOnline,
      lnsName: body.lnsName,
      bleName: body.bleName,
      addedBy: body.addedBy,
      firstNetworkPreference: body.firstNetworkPreference,
      secondNetworkPreference: body.secondNetworkPreference,
      thirdNetworkPreference: body.thirdNetworkPreference,
      simPreference: body.simPreference,
      deviceStateChangedAt: body.deviceStateChangedAt,
      messagesReceived: body.messagesReceived,
      messagesSent: body.messagesSent,
      messagesResetDate: body.messagesResetDate,
      isGnssEnabled: body.isGnssEnabled,
      wifiConfiguration: body.wifiConfiguration,
      ethernetConfiguration: body.ethernetConfiguration,
      cellularConfiguration: body.cellularConfiguration,
      state: body.state,
      networkMode: body.networkMode,
      connectionStatus: body.connectionStatus,
    });
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
const list = async () => {
  try {
    const result = Gateways.findAll();
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
const update = async ({ body }) => {
  const gateway = await Gateways.findOne({ where: { id: body.id } });

  if (!gateway) {
    return { message: constants.CLIENT_MESSAGES.CLIENT_NOT_FOUND, error: true };
  }
};
const deleteGateway = async (id) => {
  try {
    const result = await Gateways.destroy({ where: { id } });

    return { message: constants.CLIENT_MESSAGES.CLIENT_DELETED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

module.exports = {
  create,
  list,
  update,
  deleteGateway,
};
