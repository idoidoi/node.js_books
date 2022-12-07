var todos = {};

// $("#addButton").click(function(){
//     var text = $("#inputbox").val();
//     todos[text] = false;
//     $("#inputBox").val("");
//     console.log(todos);
// })

// var students = [
//     { name:'김군오', id: '219xxx'},
//     { name:'홍길동', id: '210xxx'}
// ]
// var ul = $('ul');
// for (let student of students){
//     var li = $('<li>' + student.name + '</li>');
//     li.data('id', student.id);
//     li.click(function(event){
//         var el = $(event.target);
//         alert(el.data('id'));
//     });
//     ul.append(li);
// }

$.ajax("http://localhost:3000/todos").done(function(result){
    console.log(result);

    todos = resilt;
    for (const todo of Object.keys(todos)){
        $(".contents ul").append(liTemplate(todo, todos[todo]));
    }
})

function inputTemplate(text){
    var inputTag = $('<input type="checkbox" id="checkBox">');
    inputTag.data("value", text);
    return inputTag;
}

function buttonTemplate(text){
    var buttonTag = $('<button id="deleteButton">X</button>');
    return buttonTag;
}

function liTemplate(text){
    var li = $("<li></li>");

    li.attr("value",text);
    li.append(inputTemplate(text.cheched));
    li.append(text);
    li.append(buttonTemplate(text));

    li.click(function(event){
        var el = $(event.target);
        console.log(el.data("vlaue"));

        if(el.is("button")){
            delete todos[text];
            $(`li[value='${text}']`).remove();
            console.log(todos);
        } else if (el.is("input[type='checkbox']")){
            var isChecked = el.is(":checked");
            if(isChecked){
                $(`li[value='${text}']`).addClass("checked");
                todos[text] = true;
            } else {
                $(`li[value='${text}']`).removeClass("checked");
                todos[text] = false;
            }
        }
    })
    saveTodos();
    return li;
}

$("#addButton").click(function(){
    var text = $("#inputBox").val();
    todos[text] = false;
    $("#inputBox").val("");
    console.log(todos);

    $(".contents ul").append(liTemplate(text, false));
    saveTodos();
});

function saveTodos(){
    $.ajax({
        url: "http://localhost:3000/todos",
        method: "POST",
        data: JSON.stringify({ todos: todos}),
        dataType: "json",
        contentType: "application/json"
    }).done(function(){
        console.log("POST done");
    })
}

function inputTemplate(text, cheched){
    var inputTag = $('<input type="checkbox" id="checkBox">' );
    inputTag.data("value", text);
    inputTag.attr("checked", checked);
    return inputTag;
}
