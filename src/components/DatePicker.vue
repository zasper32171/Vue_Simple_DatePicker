<template>
  <div class="date-picker">
    <h3 class="date-picker_title">授課時間</h3>
    <div class="date-picker_control-bar">
      <div class="control-bar_btn-group">
        <button type="button" class="control-bar_btn btn-prev" @click="decreaseWeekOffset"
          :class="{'btn-disabled': !isDecreaseWeekOffsetEnabled}"></button>
        <button type="button" class="control-bar_btn btn-next" @click="increaseWeekOffset"></button>
      </div>
      <div class="control-bar_date-range">
        {{ startDateStringOfWeek }} - {{ endDateStringOfWeek }}
      </div>
      <div class="control-bar_timezone">
        * 時間以 {{ currentTimezone }} 顯示
      </div>
    </div>
    <Schedule :scheduleSlots="filteredScheduleSlot"></Schedule>
  </div>
</template>

<script>
import APIAdaptorMixin from '@/mixins/APIAdaptorMixin';
import Schedule from '@/components/Schedule.vue';

export default {
  name: 'DatePicker',
  mixins: [APIAdaptorMixin],
  components: { Schedule },
  data() {
    return {
      currentTime: new Date(),
      weekOffset: 0,
      scheduleSlots: {},
    };
  },
  computed: {
    isDecreaseWeekOffsetEnabled() {
      return this.weekOffset > 0;
    },
    currentWeekDay() {
      return this.currentTime.getDay();
    },
    currentDateString() {
      return this.currentTime.toLocaleDateString();
    },
    currentDate() {
      return new Date(this.currentDateString);
    },
    currentTimezone() {
      return `GMT+0${-this.currentTime.getTimezoneOffset() / 60}:00`;
    },
    startDateStringOfWeek() {
      return new Date(
        this.currentTime.valueOf()
          - this.currentWeekDay * 86400000
          + this.weekOffset * 7 * 86400000,
      ).toLocaleDateString();
    },
    startDateOfWeek() {
      return new Date(this.startDateStringOfWeek);
    },
    endDateStringOfWeek() {
      return new Date(
        this.currentTime.valueOf()
          - (this.currentWeekDay - 6) * 86400000
          + this.weekOffset * 7 * 86400000,
      ).toLocaleDateString();
    },
    endDateOfWeek() {
      return new Date(this.endDateStringOfWeek);
    },
    filteredScheduleSlot() {
      const filteredScheduleSlots = [];
      const startDate = this.startDateOfWeek;

      for (let i = 0; i < 7; i += 1) {
        const date = new Date(startDate.valueOf() + i * 86400000);
        const dateString = date.toLocaleDateString();
        let slots = [];

        if (dateString in this.scheduleSlots && date >= this.currentDate) {
          if (dateString === this.currentDateString) {
            slots = this.scheduleSlots[dateString].filter((slot) => slot.end > this.currentTime);
          } else {
            slots = this.scheduleSlots[dateString];
          }
        }

        filteredScheduleSlots.push({
          date: dateString,
          slots,
          active: date >= this.currentDate && slots.length,
        });
      }

      return filteredScheduleSlots;
    },
  },
  methods: {
    increaseWeekOffset() {
      this.weekOffset += 1;
    },
    decreaseWeekOffset() {
      if (this.weekOffset === 0) return;
      this.weekOffset -= 1;
    },
  },
  created() {
    this.scheduleSlots = this.getScheduleSlots();
  },
};
</script>

<style lang='scss'>
.date-picker {
  width: 100%;
  margin: auto;
  text-align: start;
}

@media screen and (min-width: 700px) {
  .date-picker {
    width: 700px;
  }
}

.date-picker_control-bar {
  margin-bottom: 0.5rem;

  &::after {
    display: block;
    content: '';
    clear: both;
  }
}

.control-bar_btn-group {
  display: inline-block;
  margin-right: 1rem;
}

.control-bar_date-range {
  display: inline-block;
  font-size: 1rem;
}

.control-bar_timezone {
  float: right;
  font-size: 0.875rem;
}

.control-bar_btn {
  padding: 0.375rem 1.125rem;
  background-color: transparent;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.5s;

  &:not(.btn-disabled):hover {
    color: var(--color-active);
    border-color: var(--color-active);
  }
}

.btn-prev {
  border-radius: 5px 0px 0px 5px;
  border-right-width: 0px;

  &::after {
    content: '<';
  }
}

.btn-next {
  border-radius: 0px 5px 5px 0px;

  &::after {
    content: '>';
  }
}

.btn-disabled {
  color: var(--color-disabled);
  border-color: var(--color-disabled);
  cursor: auto;
}
</style>
