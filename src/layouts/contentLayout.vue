<template>
  <div>
    <div class="calendar-wrap">
      <div class="month-wrap">
        <button class="btn-prev-month">&lt;</button>

        <!--TODO: 고쳐야함 -->
        <p class="curr-month">{{ this.today.year }}년 {{ this.today.month }}월</p>

        <button class="btn-next-month">&gt;</button>
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

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentLayout",
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
    }
  },
  beforeMount() {


  },
  mounted() {
    // 참고 블로그: https://songsong.dev/11
    // API: 121.161.237.50:50005/swagger-ui/index.html

    const today = new Date();
    this.today.year = today.getFullYear();
    this.today.month = today.getMonth() + 1;
    this.today.date = today.getDate();
    this.today.day = today.getDay();

    console.log('today');
    console.log(this.today.year, this.today.month, this.today.date);
    console.log(this.today.year, this.today.month - 1, this.today.date);

    // 달력에서 표기하는 년, 월, 일
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    // const renderCalendar = function (thisMonthDate) { // this를 vue의 this가 아니라 함수의 this로 인식하니까 사용하지 말자
    const renderCalendar = (thisMonthDate) => {
      // month 는 0이 1월, 1이 2월 ... 11이 12월
      // day는 0이 일요일, 1이 월요일 ... 6이 토요일

      currentYear = thisMonthDate.getFullYear();
      currentMonth = thisMonthDate.getMonth() + 1;
      currentDate = thisMonthDate.getDate();

      console.log(currentYear, currentMonth, currentDate);


      // Date 객체를 만들 때 날짜를 0으로 지정하면 지난 달의 마지막 날짜를 가진 Date 객체가 반환된다.

      // 지난 달의 마지막 날의 날짜와 요일
      // const lastMonthLastD = new Date(this.today.year, this.today.month - 1, 0);
      const lastMonthLastD = new Date(currentYear, currentMonth - 1, 0);
      console.log( `지난 달의 마지막 날의 일 : ${ lastMonthLastD.getDate() }`); // 31
      console.log( `지난 달의 마지막 날의 요일 : ${ lastMonthLastD.getDay() }`); // 6
      this.lastMonthLastDate = lastMonthLastD.getDate();
      this.lastMonthLastDay = lastMonthLastD.getDay();

      // 이번 달의 마지막 날의 날짜와 요일
      // const thisMonthLastD = new Date(this.today.year, this.today.month, 0);
      const thisMonthLastD = new Date(currentYear, currentMonth, 0);
      console.log( `이번 달의 마지막 날의 일 : ${ thisMonthLastD.getDate() }` ); // 31
      console.log( `이번 달의 마지막 날의 요일 : ${ thisMonthLastD.getDay() }` ); // 2
      this.thisMonthLastDate = thisMonthLastD.getDate();
      this.thisMonthLastDay = thisMonthLastD.getDay();


      const calContent = document.querySelector('.cal-content');
      calContent.innerHTML = '';

      // 지난달 렌더링
      for (let i = this.lastMonthLastDate - this.lastMonthLastDay + 1; i <= this.lastMonthLastDate; i++) {
        calContent.innerHTML += `<div class="date disable">${ i }</div>`;
      }

      // 이번달 렌더링
      for (let i = 1; i < this.thisMonthLastDate + 1; i++) {
        calContent.innerHTML += `<div class="date">${ i }</div>`;
      }

      // 다음달 렌더링
      for (let i = 1; i <= 7 - this.thisMonthLastDay; i++) {
        calContent.innerHTML += `<div class="date disable">${ i }</div>`;
      }

      // 오늘 날짜 표시
      calContent.querySelectorAll('.date').forEach(v => {
        if ( currentYear == this.today.year && currentMonth == this.today.month && v.textContent == this.today.date) {
          v.classList.add('today');
        }
      });
    }

    renderCalendar(today);


    // 지난달 보기
    const btnPrevMonth = document.querySelector('.btn-prev-month');
    btnPrevMonth.addEventListener('click', () => {
      renderCalendar(new Date(currentYear, currentMonth - 1, 1));
    });

    // 다음달 보기
    const btnNextMonth = document.querySelector('.btn-next-month');
    btnNextMonth.addEventListener('click', () => {
      renderCalendar(new Date(currentYear, currentMonth + 1, 1));
    });
  }


}
</script>

<style scoped>

</style>
