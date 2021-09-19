var get_link; 

function reportInfo(vars, showType = false) {
    if (showType === true) console.log(typeof vars);
    console.log(vars);
}

function addImg(ele, content) {
    // var myDIV = document.querySelector(ele);
    // var newContent = document.createElement('div');
    // newContent.innerHTML = content;

    // while (newContent.firstChild) {
    //     myDIV.appendChild(newContent.firstChild);
    // }
}

var feedback = function(res) {
    reportInfo(res, true);
    if (res.success === true) {
        get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        var content =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' 
             + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
        document.getElementById("imgLink").innerHTML = get_link; 
        //console.log(document.getElementById("imgLink").innerHTML)
        addImg('.status', content);
    }
};

new Imgur({
    clientid: 'b7b0e2a920f06da', //You can change this ClientID
    callback: feedback
});
