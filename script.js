$(document).ready(function(){

	$(document).keydown(function(key){
		console.log("hoho");
		if(key.keyCode==27)
			{$('#dock').toggle(400);}
	});

$('#dock form').submit(function(data){
	add=$('#wth').val();
	console.log(add);
	codeAddress(add);
});

$("#nb").click(function(){nearby();})
$("#details").click(function(){details();})
$('body').on('click','#showcase .navigation div',function()
												{
                                                  if($(this).attr('class')=='next'){
                                                  k++;if(place[k]== undefined)k=0;} 
                                                  else {k--;if(place[k]== undefined)k=count;}
                                                  showOptions(place);});
$('body').on('click','#showcase .info',function(){details(place[k])});;


});