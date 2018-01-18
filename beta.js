console.log('loaded beta quiz completion script');

var atLeastOneCorrect = ["254766", "820482", "820484", "820499", "820488", "948520", "948522" ];

var lectures ={};
lectures['254766'] = {};
lectures['254766'][0] = {'summary':'Affärsmannaskap innebär att skapa affärer som är lönsamma för båda parter genom en god förståelse för kundens behov och kunskap om sin egen förmåga', 'hint':'<ul><li>Att tjäna pengar kan vara ett kortsiktigt mål, medan lönsamhet kan skapa långsiktigt värde.</li><li>Det är affärsmässigt att leverera rätt kvalitet enligt kundens förväntningar.<li>Affärsmannaskap handlar inte bara om att sälja, det handlar om att uppfylla kundbehov.</li></ul>'};

var questionContainer;
var timeout;

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

function get_current_date() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var two_d_month = month < 10 ? '0' + month : '' + month;
    return ""+year+two_d_month; // ('' + month) for string result
}

function congrats(){

    $('.section-title[data-lecture-id="824877"]').find("i").replaceWith('<i class="fa fa-youtube-play"></i>');

    if($("#congrats").length == 0){
        
        $(".lecture-text-container:first").append("<h2 id='congrats' class='text-center'>Lägg till ditt certifikat på LinkedIn</h2>");
    }
    if($("#linkedin_cer").length == 0){
        $(".lecture-text-container:first").append("<p></p>");
        $(".lecture-text-container:first").append('<div id="linkedin_cer" class="col-xs-6 col-xs-offset-3 btn" style="padding-bottom:2%;"><div><a href="https://www.linkedin.com/profile/add?_ed=0_9bQ5tEZuyNHviVjPHm-PWz5VdS-ikMJJul8XPBIVMUvMeAoLjJpH8Ykd_Z1UPuplaSgvthvZk7wTBMS3S-m0L6A6mLjErM6PJiwMkk6nYZylU7__75hCVwJdOTZCAkdv&pfCertificationName=Aff%C3%A4rsmannaskap&pfCertStartDate=&trk=onsite_html" rel="nofollow" target="_blank"><img class="linkedIn" src="https://download.linkedin.com/desktop/add2profile/buttons/en_US.png" alt="LinkedIn Add to Profile button"></a></div>');
        if($("#linkedin_cer a").length > 0){
            var link = $("#linkedin_cer a").attr("href");
            link = link.replace("pfCertStartDate=", "pfCertStartDate="+get_current_date());
            $("#linkedin_cer a").attr("href",link);
        }
    }
}

function finishPage(){
    
    
    var notComplete = $.cookie($.cookie("ajs_user_id")+"_NC");
    if( jQuery.type(notComplete) != "undefined"){
        if(notComplete.length == 0){
            notComplete = [];
        }
        else{
            notComplete = notComplete.split(',');
        }
    }
    else{
        //notComplete = [];
    }
    
    if(notComplete.length == 0){
        $("#lecture_complete_button").removeClass("ng-hide");
        $("#lecture_complete_button").attr("target","_blank");
    
        $(".wistia_responsive_padding").removeClass("ng-hide");
        //$(".progressbar-fill").css("min-width", "100%");
        //$(".percentage").text("100%");
        congrats();
        
    }
    else{
        $(".wistia_responsive_padding").addClass("ng-hide");
        if( $("#toComplete").length == 0){
            $(".lecture-text-container:first").append('<p id="toComplete">Please complete the following qestions:</p><ul id="RedoList" class="list-group col-xs-12" style="font:Merriweather; font-size:20px;">');
            for(var x=0; x<notComplete.length; x++){
                var section = $("*[data-lecture-id='"+notComplete[x]+"']").closest("ul").siblings().text();
                var lectureName = $("*[data-lecture-id='"+notComplete[x]+"']").text();
                $("#RedoList").append('<li id="listItem-'+notComplete[x]+'" class="list-group-item clearfix responsive-font"><div class="col-xs-10"> '+section+'-'+lectureName+' </div></li>');//id="redoQuestions"
                $('#listItem-'+notComplete[x]).append("<button class='btn btn-danger pull-right' id='redoQuestions' data-id='"+notComplete[x]+"'><span class='phone-hidden'>redo</span> <i class='glyphicon glyphicon-repeat'></i></button>");
            }
        }
        
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
    
    
    if(getLectureId() == "254766"){

        finishPage();
        $('li[data-lecture-id="254766"]').closest("ul").addClass("finish");
        
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

var fixScore = function(){

    for( var x=0; x<$(".quiz.ng-scope").scope().answers.length; x++){
        if( $(".quiz.ng-scope").scope().answers[x].correct){
            $(".quiz.ng-scope").scope().answers[x].selected = true;
        }
        
    }
    
}

var getLectureId = function(){
    console.log('getLectureID');
    var path = window.location.pathname.split( '/' );
    return path[path.length -1];
}


//this function returns the number at the top of the qestion 1, 2, ...
var currentQ = function(){
  return parseInt($(".quiz-progress.ng-binding").text().charAt(0));
}

var examLength = function(){
    var text = $(".quiz-progress.ng-binding").text();
    return parseInt(text.charAt(text.length-1));
    
}


//this method search for any answers with .jpg or .gif and replace it with the image with it's name in the public folder that holds the images

var getImgs = function(){



    var options = $(".quiz-answer, .tempStyle");
    options.each(function(){
    child = $(this).find('span');
    ext = child.text().substr(child.text().length-4);
        if( ext == ".png" || ext == ".jpg" ){
        var op = $(this);
        console.log("this-->", op);
        var img = child.text();
    var imgRef = storageRef.child('images/'+img);

    imgRef.getDownloadURL().then(function(url) {

    op.append('<img src="'+url+child.text()+'" class="imageAnswer">');
    }).catch(function(error,e) {
    console.log('error',error,"e",e)
    // Handle any errors
    });
      
            child.remove();
        }
    });
}

//this function appends a hint next to the question
var applyHint = function(){
    $("#hint").removeClass('ng-hide');
}

//this function appends a summary when answered correctly
var applySummary = function(){
    $("#summary1").removeClass("ng-hide");
    $("#summary2").removeClass("ng-hide");
    $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").removeClass("hidden");
    $("div:contains('Fortsätt')").removeClass("ng-hide");
    $("#nextLec").removeClass("ng-hide");
    
    if(currentQ() == examLength()){
        checkNav();
    }
    
}

//this method show the reset button if the answer was wrong
var addResetButton = function(){
    
    $("#resetButton").removeClass("ng-hide");
    
}

var fixAnswers = function(){
        var answers = $(".quiz-answer-container");
        answers.each(function(){
            if(!$(this).hasClass("selected")){
                $(this).removeClass();
                $(this).addClass('quiz-answer-container ng-scope incorrect');
            }
        });
}

var freezeAnswers = function(){
    
    var answers = $(".quiz-answer-container.ng-scope:not(.selected)");
    answers.each(function(){
        if(!$(this).hasClass("selected")){
            $(this).removeClass();
            $(this).addClass("tempStyle");
            $(this).find(".quiz-answer-icon").addClass("ng-hide");
            
        }
    });
    
}

var retrieveAnswers = function(){
    var answers = $(".tempStyle");
    answers.each(function(){
        
        $(this).removeClass();
        $(this).addClass('quiz-answer-container ng-scope incorrect');
        $(this).find(".quiz-answer-icon").removeClass("ng-hide");      
    });
}

var doneQuestion = function(){
    
    var notComplete = $.cookie($.cookie("ajs_user_id")+"_NC");
    if( jQuery.type(notComplete) != "undefined"){
        notComplete = notComplete.split(',');
    }
    else{
        //notComplete = [];
    }
    
    var complete = $.cookie($.cookie("ajs_user_id")+"_C");
    if( jQuery.type(complete) != "undefined"){
        complete = complete.split(',');
    }
    
    
    if (currentQ() == examLength()){
        var index = jQuery.inArray(getLectureId(), notComplete);
        notComplete.splice(index, 1);
        complete.push(getLectureId());
        //localStorage.notComplete ="";
        //localStorage.complete ="";
        $("#sidebar_link_"+getLectureId()).removeClass("notCompleteQ");
        $("#sidebar_link_"+getLectureId()).addClass("completeQ");
        
        $.cookie($.cookie("ajs_user_id")+"_NC", notComplete, {expires:1, path:'/'});
        $.cookie($.cookie("ajs_user_id")+"_C", complete, {expires:1, path:'/'});
        //localStorage.complete = complete;
    
    }
}


var applyAssetsAllCorrect = function(){
                
    if($('.quiz-answer-container.ng-scope.selected').hasClass("incorrect")){
        addResetButton();
        applyHint();
        return 0;      
    }
    
    if($('.quiz-answer-container.ng-scope.selected').hasClass("correct")){
        if($('.correct').length != $('.selected.correct').length ){
            addResetButton();
            applyHint();
            $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").addClass("ng-hide");
        }else{
            applySummary();
            doneQuestion();
            
        }
    }
}

var applyAssetsAtLeastOneCorrect = function(){
                
    if($('.quiz-answer-container.ng-scope.selected').hasClass("incorrect")){
        addResetButton();
        applyHint();
        $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").addClass("ng-hide");
        return 0;      
    }
    
    if($('.quiz-answer-container.ng-scope.selected').hasClass("correct")){
        applySummary();
        doneQuestion();
        //$(".nav-btn.complete").removeClass("ng-hide");
    }
}

var checkAnswer = function(){

        if($(".quiz-answer-container.ng-scope.selected").length > 0){
            
            freezeAnswers();
            
            $("button:contains('Svara'), button:contains('Check')").scope().checkAnswer();
            return false;
        }
}


setTimeout(function(){

    init();
    
}, 30);


$(window).on('hashchange', function(e){
      
   if($(".quiz.ng-scope.single.answered").length >0){
       
       var answers = $(".quiz-answer-container");
        answers.each(function(){
            if($(this).hasClass("selected incorrect")){
                $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").addClass('ng-hide');
                addResetButton();
                applyHint();
            }
            
            if($(this).hasClass("selected correct")){
                applySummary();
            }
        });
       
   }
   
});



setTimeout(function triggers(){

  
    
    questionContainer.on('mousedown', "button:contains('Tillbaka'), button:contains('Back')", function(){
        console.log('back');
        //init();
        setTimeout(function(){
            init();
            
            if( jQuery.inArray(getLectureId(), atLeastOneCorrect) >= 0){
                applyAssetsAtLeastOneCorrect();
            }
            else{
                applyAssetsAllCorrect();
            }
            
            $("a.nav-btn.complete").addClass("ng-hide");
            if($(".quiz.ng-scope").scope().substate.answered){
                fixAnswers();
                applyAssets();
            }
            $(document).ajaxStop(function(){
                getImgs();
            });
       
      },100);
      
    });
    
    questionContainer.on('mousedown', "button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')", function(){
        if (currentQ() < examLength()){
            setTimeout(function(){
            init();   
            if($(".quiz.ng-scope").scope().substate.answered){
                fixAnswers();
                if( jQuery.inArray(getLectureId(), atLeastOneCorrect) >= 0){
                    applyAssetsAtLeastOneCorrect();
                }
                else{
                    applyAssetsAllCorrect();
                }
            }
            $(document).ajaxStop(function(){
                getImgs();
            });
            $(".nav-btn.complete").addClass("ng-hide");
          },200);
        }
        else{
            $(".quiz-wrapper.attachment-block-wrapper.ng-scope").remove();
            setTimeout(function(){
                //$(".quiz-finished.ng-scope").parent().parent().addClass("ng-hide");
                checkNav();
                $(".quiz-finished.ng-scope").on('mousedown', "button:contains('Försök igen'), button:contains('Try again'), button:contains('Retake')", function(){
                    $(".course-mainbar.lecture-content").addClass("hidden");
                    setTimeout(function(){
                        $(".course-mainbar.lecture-content").addClass("hidden");
                        location.reload();
                    },800);
                });
            },200);
        }
    
    });
    
    questionContainer.on('click', "#resetButton", function(){
        $("#resetButton").addClass("ng-hide");
        $("#hint").addClass("ng-hide");
        $("button:contains('Svara'), button:contains('Check')").removeClass('ng-hide');
        retrieveAnswers();
        $("button:contains('Svara'), button:contains('Check')").addClass("disabled").prop("disabled", true);
        var answers = $(".quiz-answer-container");
        answers.each(function(){
                if($(this).hasClass("selected") && $(this).hasClass("correct")){
                    $(this).removeClass();
                    $(this).addClass('quiz-answer-container ng-scope incorrect');
                }
                else{
                    $(this).removeClass();
                    $(this).addClass('quiz-answer-container ng-scope incorrect');
                }
                $(".quiz.ng-scope.single").removeClass('answered');
                $("#resetButton").addClass('ng-hide');
                $(".quiz.ng-scope").scope().substate.answered = false;
                for(x in $(".quiz.ng-scope").scope().answers){
                    $(".quiz.ng-scope").scope().answers[x].correct = false;
                    $(".quiz.ng-scope").scope().answers[x].selected = false;
                }
        });
        
        questionContainer.on("click", ".quiz-answer-container.ng-scope", function(){
            if (!$(".quiz-answer-container.ng-scope").hasClass('selected')){
                $(this).addClass('selected');      
            }

        });    
    });
    
    
    questionContainer.on("click", "button:contains('Svara'), button:contains('Check')", function(){
    
    
        $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").addClass("hidden");
        checkAnswer();
        if( jQuery.inArray(getLectureId(), atLeastOneCorrect) >= 0){
            window.setTimeout(function(){
                var i =0;
                var refreshIntervalId = setInterval(function(){
                    i++;
                    applyAssetsAtLeastOneCorrect();
                    if( i<=20){
                        clearInterval(refreshIntervalId);
                    }
                }, 30);}, timeout);
        }
        else{
            window.setTimeout(function(){
                var i =0;
                var refreshIntervalId = setInterval(function(){
                    i++;
                    applyAssetsAllCorrect();
                    if( i<=20){
                        clearInterval(refreshIntervalId);
                    }
                }, 30);}, timeout);
        }
        
        if( currentQ() == examLength()){
            $("button:contains('Fortsätt'), button:contains('Continue'), button:contains('Nästa')").replaceWith("<div id='nextLec' class='btn btn-primary pull-right ng-hide'>Nästa >></div>");
            questionContainer.one("click", "#nextLec", function(e){
                console.log("go next lecture");
                $(".nav-btn.complete.pull-right")[0].click();
                e.stopPropagation();
                $(document).ajaxStop(function(){
                    getImgs();
                });
            });
        }
        
    });
    
    $(".course-sidebar.lecture-page.collapse.navbar-collapse.navbar-sidebar-collapse").on('click', '[id^=sidebar_link]', function(){
        setTimeout(function(){
            init();
        },1000);
    });
    
    $("body").on("mousedown", ".nav-btn", function(){
        setTimeout(function(){
            init();
        },1200);
    });
    
    questionContainer.on('click', ".quiz-answer-container.ng-scope", function(){
    
        $("button:contains('Svara'), button:contains('Check')").removeClass("disabled").prop("disabled",false);
        
    });
    
    questionContainer.on("click", "#redoQuestions", function(){
        console.log("redo");
        //$(".sidebar_link_"+$(this).data("id"))[0].click();
        $("#sidebar_link_"+$(this).data("id"))[0].click()
       
    });
    questionContainer.on("click", "#sidebar_link_824877", function(){
        $( document ).ajaxStop(function() {
            $(".course-mainbar.lecture-content").addClass("ng-hide");
            console.log("hide");
            setTimeout(function(){
                $(".course-mainbar.lecture-content").removeClass("ng-hide");
                console.log("show");
            }, 800);
        });
        
    
    });    
    
    questionContainer.on("click", "a.nav-btn.complete", function(){
        $(document).ajaxComplete(function(){
            checkNav();
            console.log("next lecture get images");
            getImgs();
        });
    });

}, 100);

