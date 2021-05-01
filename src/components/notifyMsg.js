
const notifyMsg=(msg)=>{
    var options = {
        body: msg
    }
    
    // 데스크탑 알림 요청
    var notification = new Notification("UserObj", options);
    
    // 3초뒤 알람 닫기
    setTimeout(function(){
        notification.close();
    }, 3000);
}

export default notifyMsg;