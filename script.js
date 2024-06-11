function displayFileContent() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            var content = reader.result;
            displayRawContent(content);
        };
    }
}

function upload() {
    var textInput = document.getElementById('textInput');
    var content = textInput.value;
    if (!content && document.getElementById('rawText').textContent) {
        content = document.getElementById('rawText').textContent;
    }

    if (!content) {
        document.getElementById('message').textContent = 'No content to upload';
        return;
    }

    createDownloadLink(content);
    document.getElementById('message').textContent = 'Content ready for download';
}

function displayRawContent(content) {
    document.getElementById('rawText').textContent = content;
    document.getElementById('rawContent').style.display = 'block';
    document.getElementById('message').textContent = '';
    document.getElementById('downloadLink').style.display = 'none';
}

function createDownloadLink(content) {
    var blob = new Blob([content], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var downloadLink = document.getElementById('download');
    downloadLink.href = url;
    downloadLink.style.display = 'block';
    document.getElementById('downloadLink').style.display = 'block';
}
