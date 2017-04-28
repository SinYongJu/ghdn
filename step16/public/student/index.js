//서버에서 data를 받아온다.

//현제 페이지 값

var pageNoTag = $('#page-no')
var currPageNo = parseInt(pageNoTag.text())
var tbody = $('#student-tbl > tbody')
var prevBtn = $('#prev-btn');
var nextBtn = $('#next-btn');
var pageSize = 3;



displayList(1)

function displayList(pageNo){
  $.get('list.json', {pageNo:pageNo, pageSize: pageSize}, function(result){
  var list = result.list;
  var totalCount = result.totalCount;
  var lastPageNo =parseInt(totalCount/pageSize) + (totalCount%pageSize > 0 ? 1:0)


  tbody.text("")
  for(var s of list){
      $('<tr>').append($('<td></td>').text(s.mno))
               .append($('<td>').append(
                                        $('<a>').attr('href','view.html?no='+s.mno)
                                        .attr('data-no', s.mno)
                                        .text(s.name=='' ? '(이름없음)': s.name))
                                      )
               .append($('<td>').text(s.tel))
               .append($('<td>').text(s.email))
               .append($('<td>').text(s.work))
               .appendTo(tbody)
    //tbody.appned(tr)
}//for

  currPageNo = pageNo
  pageNoTag.text(currPageNo) //출력하는 ui 객체


    if(currPageNo == 1){
      prevBtn.prop('disabled', true) //a tag는 주의
    } else{
      prevBtn.prop('disabled', false)
    }

    if(currPageNo== lastPageNo){
      nextBtn.prop('disabled', true)
    } else {
      nextBtn.prop('disabled', false)
    }


})//get
}//displayList


prevBtn.click(function(){
  displayList(currPageNo-1)

})//prev

nextBtn.click(function(){
  displayList(currPageNo+1)
})//next
