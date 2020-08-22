
// https://simsumi.herokuapp.com/api?text=[messages]&lang=[language]

var message;
const root = document.documentElement;
const infoBtn = document.querySelector('.credit'); 
const infoWrap = document.querySelector('.info-wrap');
const delNoti = document.querySelector('.delNoti');
const modeBtn = document.querySelector('#theme-mode');
const particles = document.querySelector('#particles-js');
const msgList = document.querySelector('.msg-list');
const newUserMsg = document.querySelector('.user-msg-item');

var api = 'https://simsumi.herokuapp.com/api?text=';
var lang = '&lang=';
var proxyurl = "https://cors-anywhere.herokuapp.com/";

const msgLoading = document.createElement("div");
msgLoading.classList.add("ticontainer");
const dotBox = document.createElement("div");
dotBox.classList.add("tiblock");
const dot = document.createElement("div");
dot.classList.add("tidot");
dotBox.innerHTML = dot.outerHTML + dot.outerHTML + dot.outerHTML;
msgLoading.appendChild(dotBox);


const msgDivload = document.createElement("div");
msgDivload.classList.add("load", "msg");
//Create LI
const newMsgLoad = document.createElement("div");
newMsgLoad.innerText = "Simsimi : ";
newMsgLoad.classList.add('load', 'msg-item');

document.addEventListener('DOMContentLoaded', loadLang);

const delMsgbtn = document.querySelector('#delMsg');
delMsgbtn.addEventListener('click', deleteAllMessages);

const button = document.querySelector('#submit');
button.addEventListener('click', sendData);

infoBtn.addEventListener('click', () => {
	infoWrap.classList.toggle("show");
	if(infoWrap.classList.contains("show")){
		document.addEventListener("dblclick", () => {
			infoWrap.classList.remove("show");
		});
	}
});
function closePop(){
	infoWrap.classList.remove("show");
}
var hr = (new Date()).getHours();
if(hr >= 00 && hr <= 12){
	const msgDiv = document.createElement("div");
	msgDiv.classList.add("msg")
	//Create LI
	const newMsg = document.createElement("li");
	newMsg.innerText = 'Simsimi : Chào buổi sáng bro !';
	newMsg.classList.add('msg-item');
	msgDiv.appendChild(newMsg);
	//APPEND TO LIST
	msgList.appendChild(msgDiv);
	msgDiv.scrollIntoView(true);
}else if(hr >= 12 && hr <= 18){
	const msgDiv = document.createElement("div");
	msgDiv.classList.add("msg")
	//Create LI
	const newMsg = document.createElement("li");
	newMsg.innerText = 'Simsimi : Chào buổi chiều bro !';
	newMsg.classList.add('msg-item');
	msgDiv.appendChild(newMsg);
	//APPEND TO LIST
	msgList.appendChild(msgDiv);
	msgDiv.scrollIntoView(true);
}else{
	const msgDiv = document.createElement("div");
	msgDiv.classList.add("msg")
	//Create LI
	const newMsg = document.createElement("li");
	newMsg.innerText = 'Simsimi : Chào buổi tối bro !';
	newMsg.classList.add('msg-item');
	msgDiv.appendChild(newMsg);
	//APPEND TO LIST
	msgList.appendChild(msgDiv);
	msgDiv.scrollIntoView(true);
}

var hr = (new Date()).getHours();
modeBtn.addEventListener('change', function(){
	if(this.checked){
		root.style.setProperty("--background-color", "#111");
		root.style.setProperty("--text-color", "#fff");
		root.style.setProperty("--after-color", "#d4cdcb");
		root.style.setProperty("--object-color", "#fff");
		root.style.setProperty("--input-color", "#fff");
		root.style.setProperty("--ghost-eyes-color", "rgba(255, 255, 255, 0.6)");
	}else{
		root.style.setProperty("--background-color", "#f0f0f0");
		root.style.setProperty("--text-color", "#111");
		root.style.setProperty("--after-color", "rgb(39, 39, 39)");
		root.style.setProperty("--object-color", "#333");
		root.style.setProperty("--input-color", "#808080");
		root.style.setProperty("--ghost-eyes-color", "rgb(155, 155, 155)");
	}
});
function loadLang(){
	$('input[type="text"]').focus();
	var langSave = localStorage.getItem("langSave");
	$('#lanParam').val(langSave);
}
document.addEventListener('keyup', function(){
	if(event.keyCode == 13){
		sendData();
	}
})

function deleteAllMessages(){
	if( document.querySelector('.msg-list').getElementsByTagName('li').length >= 1 ){
		$(".user-msg-item").remove();
		$(".msg-item").remove();
		$(".load.msg").remove();
		$('input[type="text"]').prop("disabled", false);
		$('input[type="text"]').css({"cursor": "auto"});
		$('#submit').prop("disabled", false);
		$('#submit').css({"cursor": "auto"});
		$('#send-span').css({"cursor": "auto"});
	Swal.fire({
		title: 'Done !',  
		html: 'All Messages Are Deleted!',  
		icon: 'success',
		showConfirmButton: false,
		timer: 1500
	})
	}else{
		Swal.fire({
			title: 'Error !',  
			html: 'No Message To Delete!',  
			icon: 'error',
			showConfirmButton: false,
			timer: 1500
	
		})
	}
}	

function sendData() {
	if ($('#ghost-input').val() != "") {
		var url = proxyurl + api + $('#ghost-input').val() + lang + $('select option').filter(':selected').val();
		localStorage.setItem("langSave", $('select option').filter(':selected').val());
		//Human
		const userMsgDiv = document.createElement("div");
		userMsgDiv.classList.add("user-msg");
		//Create LI
		const newUserMsg = document.createElement("li");
		newUserMsg.innerText = 'You : ' + $('#ghost-input').val();
		$('#ghost-input').val('');
		newUserMsg.classList.add('user-msg-item');
		userMsgDiv.appendChild(newUserMsg);
		//APPEND TO LIST
		msgList.appendChild(userMsgDiv);
		userMsgDiv.scrollIntoView(true);
		// console.log(url);
		msgDivload.classList.remove("hide");
		msgDivload.appendChild(newMsgLoad);
		msgDivload.appendChild(msgLoading);
		$('input[type="text"]').prop("disabled", true);
		$('input[type="text"]').css({"cursor": "not-allowed"});
		$('#submit').prop("disabled", true);
		$('#submit').css({"cursor": "not-allowed"});
		$('#send-span').css({"cursor": "not-allowed"});
		// /APPEND TO LIST
		msgList.appendChild(msgDivload);

		msgDivload.scrollIntoView(true);
		try {
			fetch(url)
			.then(
				function(response) {
					if (response.status !== 200) {
					// console.log('Lỗi, mã lỗi ' + response.status);
					document.querySelector(".load.msg").classList.add("hide");
					const msgDiv = document.createElement("div");
					msgDiv.classList.add("msg")
					//Create LI
					const newMsg = document.createElement("div");
					newMsg.innerText = "Simsimi : Hệ thống đang lỗi, mã " + response.status + " thằng anh tôi đang fix, bác vui lòng thử lại sau ạ 😓🤦‍♂️";
					newMsg.classList.add('msg-item');
					msgDiv.appendChild(newMsg);
					// /APPEND TO LIST
					msgList.appendChild(msgDiv);
					msgDiv.scrollIntoView(true);
					$('input[type="text"]').prop("disabled", true);
					$('input[type="text"]').css({"cursor": "not-allowed"});
					$('#submit').prop("disabled", true);
					$('#submit').css({"cursor": "not-allowed"});
					return;
					}
					// parse response data
					response.json().then(data => {
					gotData(data);
				})
    		}
  		)
		} catch (err) {
			console.error("Error CMNR")
		}
		// loadJSON(url, gotData);
}else{
		var errMsg = [
		'Simsimi : Em hỏng hỉu gì hớt :<',
		'Simsimi : Không nói gì mà bắt người ta trả lời ><',
		'Simsimi : Chưa nhập tin nhắn kìa man :v 🤦‍♂️',
		'Simsimi : ? ngáo hay gì ? chưa nhập tin nhắn mà lại bắt người ta trả lời 😒',
		'Simsimi : Thiếu gì kìa 😣😣😣'
		]
		var randomErrMsg = Math.floor(Math.random() * (errMsg.length));
		const msgDiv = document.createElement("div");
		msgDiv.classList.add("msg")
		//Create LI
		const newMsg = document.createElement("div");
		newMsg.innerText = errMsg[randomErrMsg];
		newMsg.classList.add('msg-item');
		msgDiv.appendChild(newMsg);
		// /APPEND TO LIST
		msgList.appendChild(msgDiv);
		msgDiv.scrollIntoView(true);
		// alert('please fill the field..')
		setTimeout(function(){
			msgDiv.classList.toggle("hide");
			msgDiv.addEventListener('transitionend', function(){
				msgDiv.style.display = "none";
			});
	}, 3000);
	}
}

function gotData(data) {
	message = data;
	var response = message.success;
	$('input[type="text"]').prop("disabled", false);
	$('input[type="text"]').focus();
	$('input[type="text"]').css({"cursor": "auto"});
	$('#submit').prop("disabled", false);
	$('#submit').css({"cursor": "pointer"});
	// document.querySelector(".load.msg").classList.add("hide");
	if (response != "") {
		document.querySelector(".load.msg").classList.add("hide");
		//Simsimi
		const msgDiv = document.createElement("div");
		msgDiv.classList.add("msg")
		//Create LI
		const newMsg = document.createElement("li");
		newMsg.innerText = 'Simsimi : ' + response;
		newMsg.classList.add('msg-item');
		msgDiv.appendChild(newMsg);
		//APPEND TO LIST
		msgList.appendChild(msgDiv);
		msgDiv.scrollIntoView(true);
	// console.log(response);
	}else{
		const msgDiv = document.createElement("div");
		msgDiv.classList.add("msg")
		//Create LI
		const newMsg = document.createElement("li");
		newMsg.innerText = 'Simsimi : Em hỏng hỉu gì hớt :<';
		newMsg.classList.add('msg-item');
		document.querySelector(".load.msg").classList.add("hide");
		msgDiv.appendChild(newMsg);
		//APPEND TO LIST
		msgList.appendChild(msgDiv);
		msgDiv.scrollIntoView(true);
	}
}



//NotiShow


const notifications = [
	// "Simsimi has just messaged you !!",
	// "You have a new message from Simsimi !"
];

function addNoti(notification){
	notifications.push(notification);
	showNotiCount(notifications.length);
}

function removeRecentNoti(){
	notifications.shift();
	showNotiCount(notifications.length);
}
function showNotiCount(count){
	//look for (n)
	const pattern = /^\(\d+\)/;

	if (count === 0 || pattern.test(document.title)){
		document.title = document.title.replace(pattern, count === 0 ? "" : "(" + count + ")");
	}else{
		document.title = "(" + count + ") " + document.title;

	}

}
showNotiCount(notifications.length);


document.addEventListener("mouseleave", addNoti);
document.addEventListener("mouseenter", removeRecentNoti);
