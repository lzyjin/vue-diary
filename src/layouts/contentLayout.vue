<template>
  <div>
    <div class="calendar-wrap">
      <div class="month-wrap">
        <button class="prev">&lt;</button>
        <p class="curr-month">{{ this.today.year }}년 {{ this.today.month }}월</p>
        <button class="next">&gt;</button>
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
      lastMonthLastDate: '',
      lastMonthLastDay: '',
      thisMonthLastDate: '',
      thisMonthLastDay: '',
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

    // month 는 0이 1월, 1이 2월 ... 11이 12월
    // day는 0이 일요일, 1이 월요일 ... 6이 토요일

    // 지난 달의 마지막 날의 날짜와 요일
    const lastMonthLastD = new Date(this.today.year, this.today.month - 1, 0);
    console.log( `지난 달의 마지막 날의 일 : ${ lastMonthLastD.getDate() }`); // 31
    console.log( `지난 달의 마지막 날의 요일 : ${ lastMonthLastD.getDay() }`); // 6
    this.lastMonthLastDate = lastMonthLastD.getDate();
    this.lastMonthLastDay = lastMonthLastD.getDay();


    // 이번 달의 마지막 날의 날짜와 요일
    const thisMonthLastD = new Date(this.today.year, this.today.month, 0);
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
      if (v.textContent == this.today.date) {
        v.classList.add('today');
      }
    });
  }

  // 1월 31일
  // 2월 28일
  // 3월 31일
  // 4월 30일
  // 5월 31일
  // 6월 30일
  // 7월 31일
  // 8월 31일
  // 9월 30일
  // 10월 31일
  // 11월 30일
  // 12월 31일
}
</script>

<style scoped>

</style>
