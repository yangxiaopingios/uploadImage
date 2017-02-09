(function() {
    var upimg = document.getElementById('file');
    var show = document.getElementById('showImage');

    if (!(window.FileReader && window.File && window.FileList && window.Blob)) {
        show.innerHTML = '您的浏览器不支持fileReader';
        upimg.setAttribute('disabled', 'disabled');
        return false;
    }

    upimg.addEventListener('change', function(e) {
        var files = this.files;
        if (files.length) {
            checkFile(this.files);
        }
    });

    function checkFile(files) {
        if (files.length != 0) {
            //获取文件并用FileReader进行读取
            var html = '';
            var i = 0,
                j = show.childElementCount;
            var funcs = function() {
                if (files[i]) {
                    var x = parseInt((i + j) / 4) * 250;
                    var y = ((i + j) % 4) * 250;
                    var reader = new FileReader();
                    if (!/image\/\w+/.test(files[i].type)) {
                        show.innerHTML = "请确保文件为图像类型";
                        return false;
                    }
                    uploadImage(files[i]);
                    reader.onload = function(e) {
                        html += '<img src="' + e.target.result + '" alt="img"></div>';
                        i++;
                        funcs(); // onload为异步调用
                    };
                    reader.readAsDataURL(files[i]);
                } else {
                    show.innerHTML += html;
                }
            }
            funcs();
        }
    }

    function uploadImage(imageFile) {
        var xhr = new XMLHttpRequest();
        //设置回调，当请求的状态发生变化时，就会被调用  
        xhr.onreadystatechange = function() {
            //等待上传结果,将背景图像设置为tx2.jpg 
            if (xhr.readyState == 1) {
                console.log('上传中...');
            }
            //上传成功，返回的文件名，设置到父节点的背景中  
            if (xhr.readyState == 4 && xhr.status == 200) {
                // var path = JSON.parse(xhr.responseText).path.split("\\");
                // filenode.parentNode.style.backgroundImage = "url('./uploads/" + path[path.length - 1] + "')";
                console.log('上传成功');
            }
        }

        //构造form数据 
        var data = new FormData();
        data.append("files", imageFile);

        //设置请求，true：表示异步  
        xhr.open("post", "/uploadImage", true);
        //不要缓存  
        //xhr.setRequestHeader("If-Modified-Since", "0");  
        //提交请求  
        xhr.send(data);
        // //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
        // filenode.value = null;
    }
})();