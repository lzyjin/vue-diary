<template>
  <div>
    <div class="memory-wrap">
      <div class="top">
        <div class="wrap">
          <input type="text" name="" id="" placeholder="검색어를 입력해주세요">
          <div class="btn-filter">
            <span>필터</span>
          </div>
        </div>
        <div class="wrap">
          <p class="total">전체 n개 중 k개</p>
          <div class="btn-add">등록</div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="img">
            <img src="https://lipsum.app/random/200x200" alt="">
          </div>
          <div class="text">
            <div class="edit"><i class="xi-ellipsis-h"></i></div>
            <p class="desc">성수에서 재밌게 보낸날 - 자전거도 타고 맛있는 것도 먹고 한강도 갔다</p>
            <p class="date">2023.02.27</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modal.editModalOpened">
      <div class="modal" :class="{opened: modal.editModalOpened}">
        <div class="modal-top">
          <button @click="" style="margin-left: auto;">
            <i class="xi-close"></i>5
          </button>
        </div>
        <div class="modal-content">

          <!--  카테고리(셀렉트), 일자(피커), 주소(다음 우편번호검색), 내용(최대500자), 사진추가(최대3개)-->
          <div class="category">
            <div class="c-item">
              <strong>키테고리</strong>
              <div class="select-wrap">
                <select name="" id="">
                  <option value="">음식</option>
                  <option value="">쇼핑</option>
                  <option value="">여행</option>
                  <option value="">전시</option>
                </select>
              </div>
            </div>
            <div class="c-item">
              <strong>일자</strong>
              <input type="date" name="" id="">
            </div>
            <div class="c-item">
              <strong>주소</strong>
              <input type="text" name="" id="">
            </div>
            <div class="c-item">
              <strong>내용</strong>
              <textarea name="" id=""></textarea>
            </div>
            <div class="c-item">
              사진추가영역
            </div>
          </div>

          <div class="btn-wrap">
            <button class="btn-delete">
              <i class="xi-trash"></i>
            </button>
            <button class="btn-save">등록하기</button>
          </div>
        </div>
      </div>
      <div class="dimmed"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemoryList",
  data() {
    return {
      modal: {
        editModalOpened: true,
      }
    }
  },
}
</script>

<style scoped>

</style>
