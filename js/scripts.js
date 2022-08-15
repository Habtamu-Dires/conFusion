//jQuery code to play and pause the carousel -->
   
$(document).ready(function(){
    $("#mycarousel").carousel({ interval: 2000 });
    $('#carouselButton').click(function(){
        if($('#carouselButton').children('span').hasClass('fa-pause')){
            $('#mycarousel').carousel('pause');
            $('#carouselButton').children('span').removeClass('fa-pause');
            $('#carouselButton').children('span').addClass('fa-play');
        } else if($('#carouselButton').children('span').hasClass('fa-play')){
            $('#mycarousel').carousel('cycle');
            $('#carouselButton').children('span').removeClass('fa-play');
            $('#carouselButton').children('span').addClass('fa-pause');
        }
        
    });
});
    
//jQuery to control login modal-->
    
$('#loginIcon').click(function(){
    $("#loginModal").modal('toggle');
});
$('#cancelLoginModal').click(function(){
    $('#loginModal').modal('hide');
});
$('#cancelLoginButton').click(function() {
    $('#loginModal').modal('hide');
});
    
//jQuery to control reserve table modal-->

$('#reserveTableButton').click(function(){
    $('#reserveTableModal').modal('toggle');
});
$('#cancelReserveTableModal').click(function(){
    $('#reserveTableModal').modal('hide');
});
$('#cancelRTModalButton').click(function(){
    $('#reserveTableModal').modal('hide');
});
