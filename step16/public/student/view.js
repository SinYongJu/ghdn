var viewTags = $('.bit-view')
var newTags = $('.bit-new')
var fiEmail=$('#fi-email'),
    fiNo = $('#fi-no'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiSchoolName = $('#fi-school-name'),
    fiWorking = $('#fi-working')

var no = 0;
try {

 no =  location.href.split('?')[1].split('=')[1]
} catch(err){}

if(no == 0){ //새학생 등록행!
//console.log(location.href.split('?')[1].split('=')[1])
viewTags.css('display', 'none')

$('#add-btn').click(function(){
  $.post('add.json', {
    email: fiEmail.val(),
    name: fiName.val(),
    tel:fiTel.val(),
    schoolName:fiSchoolName.val(),
    working: (fiWorking.prop('checked') ? 'Y': 'N')
  }, function(result){
//    console.log(result)
    location.href = 'index.html'

  }, 'json')
})//add

} else { //학생 정보 조회
  newTags.css('display', 'none')
  $.getJSON('detail.json', {no:no}, function(result){
    fiNo.text(result.mno)
    fiName.val(result.name)
    fiEmail.val(result.email)
    fiTel.val(result.tel)
    fiSchoolName.val(result.schl_nm)
    fiWorking.prop('checked', (result.work == 'Y' ? true : false))
  })//getjson

  $('#upd-btn').click(function(){
    $.post('update.json', {
      no:fiNo.text(),
      email: fiEmail.val(),
      name: fiName.val(),
      tel:fiTel.val(),
      schoolName:fiSchoolName.val(),
      working: (fiWorking.prop('checked') ? 'Y': 'N')
    }, function(result){
  //    console.log(result)
      location.href = 'index.html'

    }, 'json')
  })//update

  $('#del-btn').click(function(){
    $.getJSON('delete.json', {no:no}, function(result){
  //    console.log(result)
      location.href = 'index.html'

    }, 'json')
  })//delete

}//else
