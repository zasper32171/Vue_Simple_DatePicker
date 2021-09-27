<template>
  <div class="schedule">
    <div v-for="(data, index) in scheduleSlots" :key="data" class="schedule-column"
      :class="{'active': data.active}">
      <div class="schedule-column_week-day">{{ weekDays[index] }}</div>
      <div class="schedule-column_date">{{ (new Date(data.date)).getDate() }}</div>
      <div class="schedule-column_time-slots">
        <div v-for="slot in data.slots" :key="slot" class="schedule-column_time-slot">
          <button type="button" class="time-slot_time"
            :class="{'available': slot.status === 'available'}">
            {{('0'+slot.start.getHours()).slice(-2)}}:{{('0'+slot.start.getMinutes()).slice(-2)}}
          </button>
          <div class="time-slot_tooltip">預約課程</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  props: ['scheduleSlots'],
  data() {
    return {
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    };
  },
  created() {
    console.log(this.scheduleSlots);
  },
};
</script>

<style lang="scss">
.schedule {
  display: flex;
}

.schedule-column {
  flex: 1 0;
  text-align: center;
  border-top: 4px solid var(--color-active);
  margin: 0rem 0.25rem;

  &:not(.active) {
    border-color: var(--color-inactive);

    .schedule-column_week-day,
    .schedule-column_date {
      color: var(--color-inactive);
    }
  }
}

.schedule-column_week-day {
  margin-top: 1rem;
}

.schedule-column_date {
  margin-top: 0.25rem;
}

.schedule-column_time-slots {
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.schedule-column_time-slot {
  position: relative;
}

.time-slot_time {
  width: 100%;
  padding: 0.375rem 0rem;
  border: 1px solid transparent;
  background-color: transparent;
  color: var(--color-inactive);
  cursor: pointer;
  user-select: none;

  &.available {
    color: var(--color-active);
    font-weight: 900;
  }

  &:hover {
    color: var(--color-active);
    border-color: var(--color-active);
    font-weight: 900;

    & ~ .time-slot_tooltip {
      opacity: 1;
      transform: translateX(-50%) scale(1);
      z-index: 1;
    }
  }
}

.time-slot_tooltip {
  opacity: 0;
  position: absolute;
  left: 50%;
  top: -150%;
  transform: translateX(-50%) scale(0.3);
  transition: opacity 0.5s, transform 0.2s ease;
  padding: 0.375rem 0.75rem;
  border-radius: 3px;
  color: white;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: -1;
  user-select: none;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}
</style>
