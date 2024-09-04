'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gateways extends Model {}
  Gateways.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      imei: DataTypes.STRING,
      imsi: DataTypes.STRING,
      cellProvider: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      batteryVoltage: DataTypes.DOUBLE,
      rssi: DataTypes.DOUBLE,
      snr: DataTypes.DOUBLE,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      firmwareVersion: DataTypes.STRING,
      bluetoothMac: DataTypes.STRING,
      wifiMac: DataTypes.STRING,
      lastCheckIn: DataTypes.DATE,
      manufacturerDate: DataTypes.DATE,
      installationDate: DataTypes.DATE,
      errorCode: DataTypes.STRING,
      carrier: DataTypes.STRING,
      signalStrength: DataTypes.INTEGER,
      propertyId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      zoneId: DataTypes.INTEGER,
      miscData: DataTypes.JSONB,
      thingName: DataTypes.STRING,
      isOnline: DataTypes.BOOLEAN,
      lnsName: DataTypes.STRING,
      bleName: DataTypes.STRING,
      addedBy: DataTypes.INTEGER,
      firstNetworkPreference: DataTypes.STRING,
      secondNetworkPreference: DataTypes.STRING,
      thirdNetworkPreference: DataTypes.STRING,
      simPreference: DataTypes.STRING,
      deviceStateChangedAt: DataTypes.DATE,
      messagesReceived: DataTypes.INTEGER,
      messagesSent: DataTypes.INTEGER,
      messagesResetDate: DataTypes.DATE,
      isGnssEnabled: DataTypes.BOOLEAN,
      wifiConfiguration: DataTypes.JSONB,
      ethernetConfiguration: DataTypes.JSONB,
      cellularConfiguration: DataTypes.JSONB,
      state: {
        type: DataTypes.ENUM,
        values: ['online', 'offline'],
      },
      networkMode: {
        type: DataTypes.STRING,
        default: 'Basics Station',
      },
      connectionStatus: {
        type: DataTypes.STRING,
        default: 'Disabled',
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'Gateways',
    }
  );

  Gateways.associate = function (models) {
    Gateways.belongsTo(models.Properties, {
      foreignKey: 'propertyId',
      onDelete: 'SET NULL',
    });
    Gateways.belongsTo(models.Zones, {
      foreignKey: 'zoneId',
      onDelete: 'SET NULL',
    });
    Gateways.belongsTo(models.Clients, {
      foreignKey: 'clientId',
      onDelete: 'SET NULL',
    });
    Gateways.hasMany(models.Alerts, {
      foreignKey: 'gatewayId',
      as: 'alerts',
    });
    Gateways.belongsToMany(models.Zones, {
      through: 'ZoneGateways',
      as: 'zoneHasGateway',
      foreignKey: 'gatewayId',
    });
    Gateways.belongsTo(models.Users, {
      foreignKey: 'addedBy',
      as: 'addedby',
    });
  };

  return Gateways;
};
