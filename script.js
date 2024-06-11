function upload() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var textInput = document.getElementById('textInput');
    var content = '';

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            content = reader.result;
            displayRawContent(content);
        };
    } else {
        content = textInput.value;
        displayRawContent(content);
    }
}

function displayRawContent(content) {
    document.getElementById('rawText').textContent = content;
    document.getElementById('message').textContent = 'Raw content displayed below:';
    document.getElementById('rawContent').style.display = 'block';
}
