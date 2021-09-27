/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */

export default {
  name: 'APIAdaptorMixin',
  methods: {
    getScheduleSlots() {
      let rawData;

      try {
        rawData = require('@/assets/scheduleSlots.json');
      } catch (e) {
        return {};
      }

      const processedData = {};

      rawData.available.forEach((slot) => {
        const dateString = new Date(slot.start).toLocaleDateString();

        if (!(dateString in processedData)) {
          processedData[dateString] = [];
        }

        processedData[dateString].push({
          start: new Date(slot.start),
          end: new Date(slot.end),
          status: 'available',
        });
      });

      rawData.booked.forEach((slot) => {
        const dateString = new Date(slot.start).toLocaleDateString();

        if (!(dateString in processedData)) {
          processedData[dateString] = [];
        }

        processedData[dateString].push({
          start: new Date(slot.start),
          end: new Date(slot.end),
          status: 'booked',
        });
      });

      for (const dateString of Object.keys(processedData)) {
        processedData[dateString].sort((p, q) => p.start - q.start);
      }

      return processedData;
    },
  },
};
