jQuery(function ($) {

    $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});
});

$(document).ready(function(){
  ajaxGetEmployeeID();
});
const addCity = (inf) => {
 
const cityName=$(inf).parent().children("#addCityInput").val();
 const csrf=$(inf).parent().children("[name*='_csrf']").val();
console.log(csrf);
  fetch('/orghead/addCity',{
    method : 'POST',
    body: JSON.stringify({
     cityName : cityName
    }),
    headers: {
     "Content-Type": "application/json",
      'csrf-token' : csrf
    },
  })
  .then(result => {
  return result.json();
  })
  .then(data =>{
    if(data.msg){
      alert('New city Added');
    }
  })
  .catch(err =>{
 console.log(err);
  })
};


const updateCity = (inf) => {
  const id= $(inf).parent().children("[name*='_id']").val();
  const csrf=$(inf).parent().children("[name*='_csrf']").val();
  const cityName=$(inf).parent().children("#updateCityInput").val();
 console.log(cityName);
   fetch('/orghead/updateCity',{
     method : 'POST',
     body: JSON.stringify({
      city : cityName,
      id : id
     }),
     headers: {
      "Content-Type": "application/json",
       'csrf-token' : csrf
     },
   })
   .then(result => {
   return result.json();
   })
   .then(data =>{
  //console.log(data);
   })
   .catch(err =>{
  console.log(err);
   })
 };

const filterRecords = () => {
//   const id= $(inf).parent().children("[name*='_id']").val();
//   const csrf=$(inf).parent().children("[name*='_csrf']").val();
//   const cityName=$(inf).parent().children("#updateCityInput").val();
//  console.log(cityName);
var  activityArray = [];
var  loactionArray = [];
var  dateArray = [];
    $('#filterActivity').find("input[type=checkbox]:checked").each(function(){
      activityArray.push($(this).val());
});
$('#filterLocation').find("input[type=checkbox]:checked").each(function(){
  loactionArray.push($(this).val());
});
$('#filterDate').find("input[type=date]").each(function(){
  dateArray.push($(this).val());
});

var data = {activities:activityArray,locations:loactionArray,date : dateArray};
  console.log(data);
const csrf = $('#csrfToken').val();
   fetch('/orghead/applyFilter',{
     method : 'POST',
     body: JSON.stringify(data),
     headers: {
      "Content-Type": "application/json",
       'csrf-token' : csrf
     },
   })
   .then(result => {
    return result.json();
  })
  .then(data =>{
    $('#productivityRecords').empty();
      data.forEach(element => {
  date =  new Date(element.time);
  console.log(date.getDate());
    
      $('#productivityRecords').append('<tr><td>'+element.activityType.activityName+'</td><td>'+element.manpower+'</td><td>'+element.productsMade+'</td><td>'+element.location.city+'</td><td>'+element.submittedBy.name+'</td><td>'+element.time+'</td></tr>');
     });
   })
   .catch(err =>{
  console.log(err);
   })
}
const ajaxAddEmployee = (inf) => {
  var userId = $('#employeeId').val();
  var userName =  $('#employeeName').val();
  var userPhone = $('#phone').val();
  const csrf = $('#csrfToken').val();
 var data = {employeeid: userId, employeename: userName , employeephone : userPhone};
 console.log(data);
   fetch('/dephead/ajaxAddEmployee',{
     method : 'POST',
     body: JSON.stringify(data),
     headers: {
      "Content-Type": "application/json",
       'csrf-token' : csrf
     },
   })
   .then(result => {
    return result.json();
  })
  .then(data =>{
    alert("New Worker Added:")
 //console.log(data);
   })
   .catch(err =>{
  console.log(err);
   })
}
const ajaxGetEmployeeID = () =>{
//   const csrf = $('#csrfToken').val();
//   fetch('/dephead/ajaxGetEmployeeID',{
//     method : 'POST',
//     headers: {
//      "Content-Type": "application/json",
//       'csrf-token' : csrf
//     },
//   })
//   .then(result => {
//    return result.json();
//  })
//  .then(data =>{
//   var id = data.substr(data.length -1);
// //console.log(id);
//   })
//   .catch(err =>{
//  console.log(err);
//   })
}
//  const deleteCity = (inf) => {
//   const id= $(inf).parent().children("[name*='_id']").val();
//   const csrf=$(inf).parent().children("[name*='_csrf']").val();
//  console.log(id);
//    fetch('/orghead/deleteCity/'+id,{
//      method : 'DELETE',
//      headers: {
//       "Content-Type": "application/json",
//        'csrf-token' : csrf
//      }
//    })
//    .then(result => {
//    return result.json();
//    })
//    .then(data =>{
//      $(inf).parent().parent().remove();
//     // alert(data.msg);
//    })
//    .catch(err =>{
//   console.log(err);
//    })
//  };