<template>
  <div>
    <div class="calendar-wrap">
      <div class="month-wrap">
        <button class="btn-prev-month" @click="renderPrevMonth">&lt;</button>
        <p class="curr-month">{{ currentYear }}년 {{ currentMonth + 1 }}월</p>
        <button class="btn-next-month" @click="renderNextMonth">&gt;</button>
      </div>
      <div class="calendar">
        <div class="cal-header">
          <div class="day">월</div>
          <div class="day">화</div>
          <div class="day">수</div>
          <div class="day">목</div>
          <div class="day">금</div>
          <div class="day">토</div>
          <div class="day">일</div>
        </div>
        <div class="cal-content">
          <div v-for="(item, index) in calendarData" :key="index"
                class="date"
                :class="{
                  disable: item.disable,
                  today: currentYear === today.year && currentMonth === today.month && item.date === today.date }"
                @click="writeCal"
          >{{ item.date }}</div>
        </div>
      </div>
    </div>

<!--    <button class="btn-write-cal" @click="writeCal">-->
<!--      <i class="xi-pen"></i>-->
<!--    </button>-->

    <modal-view :modal-opened="modalOpened"></modal-view>

  </div>
</template>

<script>
import ModalView from '@/components/modalView';

export default {
  name: "CalendarList",

  components: {
    ModalView,
  },

  data() {
    return {
      today: {
        year: '',
        month: '',
        date: '',
        day: ''
      },
      lastMonthLastDate: 0,
      lastMonthLastDay: 0,
      thisMonthLastDate: 0,
      thisMonthLastDay: 0,

      currentYear: 0,
      currentMonth: 0,
      currentDate: 0,

      calendarData: [],

      modalOpened: false,

    }
  },

  methods: {
    renderCalendar(thisMonthDate)  {
      // month 는 0이 1월, 1이 2월 ... 11이 12월
      // day는 0이 일요일, 1이 월요일 ... 6이 토요일

      this.currentYear = thisMonthDate.getFullYear();
      this.currentMonth = thisMonthDate.getMonth();
      this.currentDate = thisMonthDate.getDate();


      // Date 객체를 만들 때 날짜를 0으로 지정하면 지난 달의 마지막 날짜를 가진 Date 객체가 반환된다.

      // 지난 달의 마지막 날의 날짜와 요일
      const lastMonthLastD = new Date(this.currentYear, this.currentMonth, 0);
      this.lastMonthLastDate = lastMonthLastD.getDate();
      this.lastMonthLastDay = lastMonthLastD.getDay();
      // console.log( `지난 달의 마지막 날 : ${ lastMonthLastD }`);
      // console.log( `지난 달의 마지막 날의 일 : ${ this.lastMonthLastDate }`);
      // console.log( `지난 달의 마지막 날의 요일 : ${ this.lastMonthLastDay }`);

      // 이번 달의 마지막 날의 날짜와 요일
      const thisMonthLastD = new Date(this.currentYear, this.currentMonth + 1, 0);
      this.thisMonthLastDate = thisMonthLastD.getDate();
      this.thisMonthLastDay = thisMonthLastD.getDay();
      // console.log( `이번 달의 마지막 날 : ${ thisMonthLastD }`);
      // console.log( `이번 달의 마지막 날의 일 : ${ this.thisMonthLastDate }`);
      // console.log( `이번 달의 마지막 날의 요일 : ${ this.thisMonthLastDay }`);


      let calendarData = [];

      // 지난달 렌더링
      for (let i = this.lastMonthLastDate - this.lastMonthLastDay + 1; i <= this.lastMonthLastDate; i++) {
        calendarData.push({
          date : i,
          disable: true,
        });
      }

      // 이번달 렌더링
      for (let i = 1; i < this.thisMonthLastDate + 1; i++) {
        calendarData.push({
          date : i,
          disable: false,
        });
      }

      // 다음달 렌더링
      for (let i = 1; i <= 7 - this.thisMonthLastDay; i++) {
        calendarData.push({
          date : i,
          disable: true,
        });
      }

      this.calendarData = calendarData;

    },

    renderPrevMonth() {
      this.renderCalendar(new Date(this.currentYear, this.currentMonth - 1, 1));
    },

    renderNextMonth() {
      this.renderCalendar(new Date(this.currentYear, this.currentMonth + 1, 1));
    },

    writeCal() {
      this.modalOpened = true;
    },

  },

  mounted() {
    // 참고 블로그: https://songsong.dev/11
    // API: 121.161.237.50:50005/swagger-ui/index.html

    const today = new Date();
    this.today.year = today.getFullYear();
    this.today.month = today.getMonth();
    this.today.date = today.getDate();
    this.today.day = today.getDay();

    // 달력에서 표기하는 년, 월, 일
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.currentDate = today.getDate();

    this.renderCalendar( new Date( this.currentYear, this.currentMonth, this.currentDate ) );

  },
}
</script>

<style scoped>

</style>
