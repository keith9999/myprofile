/*$(document).ready(function(){
    console.log("Main.js is working!");
})
*/
//above and follow is the same
$(function(){
    console.log("Main.js is working!");
})

$(function(){
    $("ul.list1 li").filter(":odd").css("font-weight", "bold");
    $("ul.list1 li").each(function(index){
        $(this).append(" " + index);
    })
   /* $("ul.list1 li").click(function(){
        $(this).css("color", "red");
    })
    */
    
    $("ul").off("click","li", function(){
        $(this).css("color", "red");
    })
    $("ul.list1").append("<li>New Element</li>")
    $("<li>New Element</li>").appendTo("ul.list1");
    $("ul.list1 li").each(function(index){
        $(this).attr("title", index);
        $(this).addClass("coolClass", index);
    })
    $("ul").on("click","li", function(){
        $this = $(this);
        $this.css("color", "red");
        console.log($this.attr("title"));
    })
    $("ul.list1").wrap("<div class='wrap'></div>");//put ul.list1 inside div class wrap
})

