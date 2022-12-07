var curIndex = 0;
var language = "ko";

setInterval(function() {
    $.ajax(`http://localhost:3000/receive?from=${curIndex}`).done(function(data) {
        for (const message of data.messages) {
            console.log(message);
            console.log("여기4");
            $("#messages").append(
                message.sender + ": " + (language == "ko" ? message.ko : message.en)
            );
            $("#messages").append("<br />");
        }   
            curIndex = data.total;
        });
}, 1000);

$("#sendButton").click(function() {
    var message = {
        ko: "",
        en: "",
        sender: $("#senderId").val()
    };

    if (language == "ko") message.ko = $("#chatInput").val();
    else message.en = $("#chatInput").val();
    console.log("여기6");
    console.log(message);

    $.ajax({
        url: "http://localhost:3000/send",
        method: "POST",
        data: JSON.stringify(message),
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        console.log("POST done");
        $("#chatInput").val("");
    });
});

$("#selectBox").change(function() {
    language = $("#selectBox").val();
    console.log(language);
    console.log("여기7");
    $("#messages").html("");
    curIndex = 0;
});