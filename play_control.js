// var vid_skel = videojs('vid_skel');
var id_vid_real 		= ["vid_real_1", "vid_real_2", "vid_real_3", "vid_real_4"];
var id_vid_sim 			= ["vid_sim_1", "vid_sim_2", "vid_sim_3", "vid_sim_4"];
var id_panel_video 		= ["panel_video_1", "panel_video_2", "panel_video_3", "panel_video_4"];
var id_panel_question 	= ["panel_question_1", "panel_question_2", "panel_question_3", "panel_question_4"];
var id_btn_sim 			= ["btn_sim_1", "btn_sim_2", "btn_sim_3", "btn_sim_4"];
var id_btn_fin 			= ["btn_fin_1", "btn_fin_2", "btn_fin_3", "btn_fin_4"];

var vid_real 		= [];
var vid_sim 		= [];
var panel_video 	= [];
var panel_question 	= [];
var btn_sim 		= [];
var btn_fin 		= [];

var n_clicks        = [];

var uncertaintyTable = Array(10).fill(Array(10).fill(0))

for (var i = 0; i < id_vid_real.length; i++) {
	vid_real.push(videojs(id_vid_real[i]));
	vid_sim.push(videojs(id_vid_sim[i]));

	panel_video.push(document.getElementById(id_panel_video[i]));
	panel_question.push(document.getElementById(id_panel_question[i]));
	btn_sim.push(document.getElementById(id_btn_sim[i]));
	btn_fin.push(document.getElementById(id_btn_fin[i]));

	n_clicks.push(0);
}

var temp_i = 0;
var temp_timer
var trajectory = ["c35", "c45", "c46", "c36", "c37", "c38", "c28", "c00"]; // The last one can be any cell id.

function tableDemo() {
    temp_timer = setInterval(function() {
        temp_i ++;
        var pre_cell = document.getElementById(trajectory[temp_i - 1]);
        var cur_cell = document.getElementById(trajectory[temp_i]);
        pre_cell.style.backgroundColor = "rosybrown";
        cur_cell.style.backgroundColor = "black";
        if (temp_i == trajectory.length - 1) {
            clearInterval(temp_timer)
            temp_i = 0;
            cur_cell.style.backgroundColor = "rosybrown";
            if (trajectory[trajectory.length - 2] == "c28"){
                document.getElementById(trajectory[trajectory.length - 2]).style.backgroundColor = "red";
            }
            document.getElementById(trajectory[0]).style.backgroundColor = "black";
            return 0
        }

    },500) ;
}

function clickUncentainty(elem) {
    // The final results are stored in uncertaintyTable. Also note that sometimes it needs to double click the cell...
    var cellID = elem.id;  // e.g. cellID = c12
    var row = cellID[1]
    var col = cellID[2]
    if (uncertaintyTable[row][col] == 0) {
        elem.style.backgroundColor = "yellow";
        uncertaintyTable[row][col] = 1;
    }
    else {
        elem.style.backgroundColor = "rosybrown";
        uncertaintyTable[row][col] = 0;
    }

}

function checkFormInfo(objData){
	for (var i = 0; i < objData.length; i++) {
		if (objData[i].value == ""){
			alert("Please input value: " + objData[i].name);
			return false;
		}
	}
	return true;
}

function checkFormSportType(objData){
	if (objData.length == 0) {
		alert("Please pick the sport type in Step 1");
		return false;
	}
	for (var i = 0; i < objData.length; i++) {
		if (objData[i].value == ""){
			alert("Please pick the sport type in Step 1");
			return false;
		}
	}

	return true;
}

function checkQuestionRating(objData){
	if (objData.length == 0) {
		alert("Please rate the robot learning performances in Step 2");
		return false;
	}

	var items = ["attention", "mimic", "engagement", "master", "why", "acceptable", "intelligence", "demonstration", "comments"];
	if (objData.length != 9){
		var num = objData.length+1;
		for (var i = 0; i < objData.length; i++) {
			if (objData[i].name != items[i]){
				num = i;
				break;
			}
		}
		if (num < 4){
			alert("Please answer Q" + (i+1) + " in Step 2");
			return false;
		}
		if (num == 4){
			alert("Please answer why question for Q4 in Step 2");
			return false;
		}
		if (num == 8){
			return true;
		}
		if (num > 4){
			alert("Please answer Q" + i + " in Step 2");
			return false;
		}
	}
	for (var i = 0; i < objData.length; i++) {
		if (objData[i].value == ""){
			if (i < 4){
				alert("Please answer Q" + (i+1) + " in Step 2");
				return false;
			}
			if (i == 4){
				alert("Please answer why question for Q4 in Step 2");
				return false;
			}
			if (i == 8){
				return true;
			}
			if (i > 4){
				alert("Please answer Q" + i + " in Step 2");
				return false;
			}
		}
	}

	return true;
}

/*
function checkQuestionOverall(objData){
	if (objData.length == 0) {
		alert("Please rate the robot learning outcome in Step 3");
		return false;
	}

	var items = ["outcome", "expectation", "why"];
	if (objData.length != 3){
		var num = objData.length + 1;
		for (var i = 0; i < objData.length; i++) {
			if (objData[i].name != items[i]){
				num = i+1;
				break;
			}
		}
		alert("Please answer Q" + (num+4) + " in Step 3");
		return false;
	}

	for (var i = 0; i < objData.length; i++) {
		if (objData[i].value == ""){
			alert("Please answer Q" + (i+5) + " in Step 3");
			return false;
		}
	}


	return true;
}
*/

var data_info = null;

var data_man_1 = null;
var data_man_2 = null;
var data_man_3 = null;
var data_man_4 = null;

var data_question_1_rating = null;
var data_question_2_rating = null;
var data_question_3_rating = null;
var data_question_4_rating = null;

/*
var data_question_1_overall = null;
var data_question_2_overall = null;
var data_question_3_overall = null;
var data_question_4_overall = null;
*/


$("#pager-0").click(function(){
	var objData = $("#form_info").serializeArray();
	if(!checkFormInfo(objData)){
		return;
	}
	else{
		data_info = objData;
	}
    $(".nav-tabs a[href='#demo1']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('#popupPage-1').modal('show');
	setTimeout(function() {
	    $('#popupPage-1').modal('hide');
	}, 2000);
});

$("#pager-1").click(function(){
	var objDataMan = $("#panel_man_1").serializeArray();
	if (!checkFormSportType(objDataMan)) {
		return;
	}
	else{
		data_man_1 = objDataMan;
	}

	var objDataQRating = $("#panel_question_1_1").serializeArray();
	if (!checkQuestionRating(objDataQRating)){
		return;
	}
	else{
		data_question_1_rating = objDataQRating;
	}

	/*
	var objDataQOverall = $("#panel_question_1_2").serializeArray();
	if (!checkQuestionOverall(objDataQOverall)){
		return;
	}
	else{
		data_question_1_overall = objDataQOverall;
	}
	*/

    $(".nav-tabs a[href='#demo2']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");

	$('#popupPage-2').modal('show');
	setTimeout(function() {
	    $('#popupPage-2').modal('hide');
	}, 2000);
});

$("#pager-2").click(function(){
	var objDataMan = $("#panel_man_2").serializeArray();
	if (!checkFormSportType(objDataMan)) {
		return;
	}
	else{
		data_man_2 = objDataMan;
	}

	var objDataQRating = $("#panel_question_2_1").serializeArray();
	if (!checkQuestionRating(objDataQRating)){
		return;
	}
	else{
		data_question_2_rating = objDataQRating;
	}

	/*
	var objDataQOverall = $("#panel_question_2_2").serializeArray();
	if (!checkQuestionOverall(objDataQOverall)){
		return;
	}
	else{
		data_question_2_overall = objDataQOverall;
	}
	*/

    $(".nav-tabs a[href='#demo3']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
	
	$('#popupPage-3').modal('show');
	setTimeout(function() {
	    $('#popupPage-3').modal('hide');
	}, 2000);
});

$("#pager-3").click(function(){
	var objDataMan = $("#panel_man_3").serializeArray();
	if (!checkFormSportType(objDataMan)) {
		return;
	}
	else{
		data_man_3 = objDataMan;
	}

	var objDataQRating = $("#panel_question_3_1").serializeArray();
	if (!checkQuestionRating(objDataQRating)){
		return;
	}
	else{
		data_question_3_rating = objDataQRating;
	}

	/*
	var objDataQOverall = $("#panel_question_3_2").serializeArray();
	if (!checkQuestionOverall(objDataQOverall)){
		return;
	}
	else{
		data_question_3_overall = objDataQOverall;
	}
	*/

    $(".nav-tabs a[href='#demo4']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
	
	$('#popupPage-4').modal('show');
	setTimeout(function() {
	    $('#popupPage-4').modal('hide');
	}, 2000);
});

$("#pager-4").click(function(){
	var objDataMan = $("#panel_man_4").serializeArray();
	if (!checkFormSportType(objDataMan)) {
		return;
	}
	else{
		data_man_4 = objDataMan;
	}

	var objDataQRating = $("#panel_question_4_1").serializeArray();
	if (!checkQuestionRating(objDataQRating)){
		return;
	}
	else{
		data_question_4_rating = objDataQRating;
	}

	/*
	var objDataQOverall = $("#panel_question_4_2").serializeArray();
	if (!checkQuestionOverall(objDataQOverall)){
		return;
	}
	else{
		data_question_4_overall = objDataQOverall;
	}
	*/

    // $(".nav-tabs a[href='#demo4']").tab('show');
	// $("html, body").animate({ scrollTop: 0 }, "slow");
	submitData();

	$("#finishModal").modal('show');
});

function submitData(){
	var xhr = new XMLHttpRequest();
	var url = "http://165.227.108.67/mingfei/submit.php"
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			document.getElementById('user_id').innerHTML = xhr.responseText;
	        // console.log(xhr.responseText);
	    }
	};
	data = {"uid": user_id,
			"info": data_info,
			"mode": currMode,
			"sport": currSport,
			"man_1": data_man_1, 
			"man_2": data_man_2, 
			"man_3": data_man_3, 
			"man_4": data_man_4, 
			"q1_rating": data_question_1_rating,
			"q2_rating": data_question_2_rating,
			"q3_rating": data_question_3_rating,
			"q4_rating": data_question_4_rating
			/*
			"q1_overall": data_question_1_overall,
			"q2_overall": data_question_2_overall,
			"q3_overall": data_question_3_overall,
			"q4_overall": data_question_4_overall
			*/
		}
	var dataJson = JSON.stringify(data);
	xhr.send(dataJson);
}

$("#pager-1-prev").click(function(){
    $(".nav-tabs a[href='#home']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

$("#pager-2-prev").click(function(){
    $(".nav-tabs a[href='#demo1']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

$("#pager-3-prev").click(function(){
    $(".nav-tabs a[href='#demo2']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

$("#pager-4-prev").click(function(){
    $(".nav-tabs a[href='#demo3']").tab('show');
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

