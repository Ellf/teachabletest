console.log('loaded beta quiz completion script');

var atLeastOneCorrect = ["254766", "820482", "820484", "820499", "820488", "948520", "948522" ];

var lectures ={};
lectures['254766'] = {};
lectures['254766'][0] = {'summary':'Affärsmannaskap innebär att skapa affärer som är lönsamma för båda parter genom en god förståelse för kundens behov och kunskap om sin egen förmåga', 'hint':'<ul><li>Att tjäna pengar kan vara ett kortsiktigt mål, medan lönsamhet kan skapa långsiktigt värde.</li><li>Det är affärsmässigt att leverera rätt kvalitet enligt kundens förväntningar.<li>Affärsmannaskap handlar inte bara om att sälja, det handlar om att uppfylla kundbehov.</li></ul>'};

var checkNav = function(){

    console.log("disable next");
    $(".nav-btn.complete").addClass("ng-hide");

    if(!$.isEmptyObject($(".quiz.ng-scope").scope())){
        if($(".quiz.ng-scope").scope().substate.answered){
            console.log("enable next");
            $(".nav-btn.complete").removeClass("ng-hide");
        }
        else{
            
        }
    
    }
    else{
    
        setTimeout(function(){
            if($.isEmptyObject($(".quiz.ng-scope").scope())){
                if( $("video").length > 0){
                    $("video").on("ended", function(){
                        console.log("video ended");
                        $(".nav-btn.complete").removeClass("ng-hide");
                    });
                }
                else{
                    console.log("enable next for no reason");
                    $(".nav-btn.complete").removeClass("ng-hide");
                }
            }
            
        }, 1000);
    }

}


var init = function(){

    $('li[data-lecture-id="824877"]').closest("ul").removeClass("finish");
    var notComplete = $.cookie($.cookie("ajs_user_id")+"_NC");
    if( jQuery.type(notComplete) != "undefined"){
        notComplete = notComplete.split(',');
    }
    else{
        notComplete = [];
    }
    
    var complete = $.cookie($.cookie("ajs_user_id")+"_C");
    if( jQuery.type(complete) != "undefined"){
        complete = complete.split(',');
    }
    else{
        var all = ['3956746'];
        var complete = [];
        for(var x=0; x<all.length; x++){
            if(jQuery.inArray(all[x], notComplete) <0){
                complete.push(all[x]);
            }
        }
        $.cookie($.cookie("ajs_user_id")+"_C", complete, {expires:1, path:'/'});
    }
    
    $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    
    
    if(getLectureId() == "824877"){

        finishPage();
        $('li[data-lecture-id="824877"]').closest("ul").addClass("finish");
        
    }
    
    
    timeout = 800;
    //getImgs();
    
    
    
    questionContainer = $("body");//$(".quiz-wrapper.ng-scope");
    $("button:contains('Svara'), button:contains('Check')").removeAttr("ng-click");
    $("button:contains('Svara'), button:contains('Check')").addClass("disabled").prop("disabled",true);
    $(".quiz-controls").append("<button id='resetButton' class='btn btn-danger ng-hide center-block responsive-width'><span class='phone-hidden'>"+resetText+" </span><i class='glyphicon glyphicon-repeat'></i> </button>");
    if (lectures[getLectureId()] != undefined){
        
        $(".quiz-controls").append('<a id="hint" href="#" class="pull-right ng-hide" data-toggle="modal" data-target="#myModal">Tips <span class="glyphicon glyphicon-question-sign"></span></a>');
        $(".quiz-controls").append('<div id="myModal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Tips</h4></div><div class="modal-body"><p>'+lectures[getLectureId()][currentQ()-1].hint+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

        $(".quiz-question.ng-binding").after("<div id='summary1' class='alert alert-success ng-hide'>"+lectures[getLectureId()][currentQ()-1].summary+"</div");
        $(".quiz-controls").before("<div id='summary2' class='alert alert-success ng-hide'>"+lectures[getLectureId()][currentQ()-1].summrary+"</div");
    }
    
    checkNav();
    
    for( var x=0; x<notComplete.length; x++){
        $("#sidebar_link_"+notComplete[x]).addClass("notCompleteQ");
    }
    
    for( var x=0; x<complete.length; x++){
        $("#sidebar_link_"+complete[x]).addClass("completeQ");
    }
    
    
    
}

setTimeout(function(){
    init();
}, 30);


$(window).on('hashchange', function(e){
      
   if($(".quiz.ng-scope.single.answered").length > 0){
       
       var answers = $(".quiz-answer-container");
        answers.each(function(){
            if($(this).hasClass("selected incorrect")){
                $("button:contains('Continue')").addClass('ng-hide');
                addResetButton();
                applyHint();
            }
            
            if($(this).hasClass("selected correct")){
                applySummary();
            }
        });
       
   }
   
});

function applySummary() {
    console.log("applySummary");
}