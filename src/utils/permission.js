const constants = require('./constants');
module.exports = {
  rolePermissions: {
    // Oxit Users
    oxit: {
      level: 1,
      user: {
        create: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
        list: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
        read: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
        update: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
          allowed_value: ['update-type-role'],
        },
        delete: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
      },
      client: {
        create: {
          allowed_value: ['api-key'],
        },
        update: {
          allowed_value: ['api-key'],
        },
        read: {
          allowed_value: ['api-key', 'count', 'app-client', 'user-type-role'],
        },
      },
      assigned_property: {
        list: {
          allowed_level: ['same', 'lower'],
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
      },
      assigned_zone: {
        list: {
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
      },
      dashboard: {
        list: {
          allowed_type: [
            constants.userType.OXIT,
            constants.userType.CLIENT,
            constants.userType.CUSTOMER,
          ],
        },
      },
      alert: {
        update: {
          allowed_value: ['update-all-fields'],
        },
      },
    },
    // Oxit Client Users
    client: {
      level: 2,
      user: {
        create: {
          allowed_level: ['lower', 'same'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
        },
        list: {
          allowed_level: ['lower'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
        },
        read: {
          allowed_level: ['lower'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
        },
        update: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
        },
        delete: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
        },
      },
      client: {
        read: {
          // allowed_value: ['status', 'count', 'user-type-role']
          allowed_value: ['count', 'user-type-role'],
        },
      },
      property: {
        create: {},
        list: {
          // allowed_value: ['status']
        },
        read: {
          // allowed_value: ['status']
        },
      },
      assigned_property: {
        list: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
          // allowed_value: ['status'],
          allowed_check: ['client-property'],
        },
        unassign: {
          allowed_check: ['client-property'],
        },
      },
      zone: {
        create: {
          allowed_check: ['client-property'],
          allowed_value: ['assign-to-user'],
        },
        list: {
          // allowed_value: ['status']
        },
        update: {
          allowed_check: ['client-property'],
        },
      },
      gateway: {
        create: {
          allowed_check: ['client-property'],
        },
        list: {
          // allowed_value: ['status']
        },
        read: {
          // allowed_value: ['status'],
          allowed_check: ['client-gateway'],
        },
        update: {
          allowed_check: ['client-property'],
        },
        delete: {
          allowed_check: ['client-gateway'],
        },
      },
      assigned_zone: {
        list: {
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
          // allowed_value: ['status']
        },
        unassign: {
          allowed_check: ['client-zone'],
        },
      },
      end_device: {
        create: {
          allowed_check: ['client-property'],
        },
        list: {
          // allowed_value: ['status']
        },
        read: {
          // allowed_value: ['status']
        },
        update: {
          allowed_check: ['client-property'],
        },
      },
      zone_gateways: {
        list: {
          // allowed_value: ['status'],
          allowed_check: ['client-zone', 'client-gateway'],
        },
        unassign: {
          allowed_check: ['client-zone'],
        },
      },
      zone_end_device: {
        assign: {
          allowed_check: ['client-zone'],
        },
        list: {
          // allowed_value: ['status'],
          allowed_check: ['client-zone', 'client-device'],
        },
      },
      alert: {
        read: {
          // allowed_value: ['status']
        },
        list: {
          // allowed_value: ['status','snooze','hide']
          allowed_value: ['snooze'],
        },
      },
      dashboard: {
        list: {
          allowed_type: [constants.userType.CLIENT, constants.userType.CUSTOMER],
          // allowed_value: ['status']
        },
      },
      project: {
        list: {
          // allowed_value: ['status']
        },
      },
      project_property: {
        list: {
          // allowed_value: ['status']
        },
      },
      checklist: {
        list: {
          // allowed_value: ['status']
        },
        read: {
          // allowed_value: ['status']
        },
      },
    },
    // Oxit Client's Customer Users
    customer: {
      level: 3,
      user: {
        create: {
          allowed_level: ['lower', 'same'],
          allowed_type: [constants.userType.CUSTOMER],
        },
        list: {
          allowed_level: ['lower'],
          allowed_type: [constants.userType.CUSTOMER],
        },
        read: {
          allowed_level: ['lower'],
          allowed_type: [constants.userType.CUSTOMER],
        },
        update: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CUSTOMER],
        },
        delete: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CUSTOMER],
        },
      },
      client: {
        read: {
          // allowed_value: ['status', 'limited-client-details', 'user-type-role']
          allowed_value: ['limited-client-details', 'user-type-role'],
        },
      },
      property: {
        create: {
          allowed_value: ['assign-to-user'],
        },
        list: {
          allowed_check: ['assigned-user'],
          // allowed_value: ['status']
        },
        read: {
          allowed_check: ['assigned-user'],
          // allowed_value: ['status']
        },
        update: {
          allowed_check: ['assigned-user'],
        },
        delete: {
          allowed_check: ['assigned-user'],
        },
      },
      assigned_property: {
        list: {
          allowed_level: ['same', 'lower'],
          allowed_type: [constants.userType.CUSTOMER],
          // allowed_value: ['status'],
          allowed_check: ['client-property', 'assigned-user'],
        },
      },
      zone: {
        create: {
          allowed_check: ['assigned-user'],
          allowed_value: ['assign-to-user'],
        },
        list: {
          // allowed_value: ['status'],
          allowed_check: ['assigned-zone', 'property-id-in-request'],
        },
        read: {
          allowed_check: ['assigned-zone'],
        },
        update: {
          allowed_check: ['assigned-user'],
        },
        delete: {
          allowed_check: ['assigned-zone'],
        },
      },
      gateway: {
        create: {
          allowed_check: ['assigned-user'],
        },
        list: {
          // allowed_value: ['status'],
          allowed_check: ['property-id-in-request'],
        },
        read: {
          // allowed_value: ['status'],
          allowed_check: ['assigned-user'],
        },
        update: {
          allowed_check: ['assigned-user'],
        },
        delete: {
          allowed_check: ['assigned-user'],
        },
      },
      assigned_zone: {
        list: {
          allowed_type: [constants.userType.CUSTOMER],
          // allowed_value: ['status'],
          allowed_check: ['client-property', 'assigned-user'],
        },
      },
      end_device: {
        create: {
          allowed_check: ['assigned-user'],
        },
        list: {
          allowed_check: ['assigned-user', 'property-id-in-request'],
          // allowed_value: ['status']
        },
        read: {
          allowed_check: ['assigned-user'],
          // allowed_value: ['status']
        },
        update: {
          allowed_check: ['assigned-user'],
        },
      },
      zone_gateways: {
        list: {
          allowed_level: ['same', 'lower'],
          // allowed_value: ['status'],
          allowed_check: ['client-gateway', 'client-zone', 'assigned-zone', 'assigned-user'],
        },
      },
      zone_end_device: {
        list: {
          allowed_level: ['same', 'lower'],
          // allowed_value: ['status'],
          allowed_check: ['client-zone', 'assigned-zone', 'client-device', 'assigned-user'],
        },
      },
      alert: {
        read: {
          // allowed_value: ['status'],
          allowed_check: ['assigned-user'],
        },
        list: {
          // allowed_value: ['hide', 'snooze', 'status'],
          allowed_value: ['hide', 'snooze'],
          allowed_check: ['assigned-user', 'property-id-in-request'],
        },
        delete: { allowed_check: ['assigned-user'] },
      },
      dashboard: {
        list: {
          allowed_type: [constants.userType.CUSTOMER],
          // allowed_value: ['status', 'read-only']
          allowed_value: ['read-only'],
        },
      },
      project: {
        list: {
          // allowed_value: ['status']
        },
      },
      project_property: {
        list: {
          // allowed_value: ['status']
        },
      },
      checklist: {
        list: {
          // allowed_value: ['status']
        },
        read: {
          // allowed_value: ['status']
        },
      },
    },
  },
};
