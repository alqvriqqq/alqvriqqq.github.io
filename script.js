function displayFileContent() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            const content = reader.result;
            displayRawContent(content);
        };
    }
}

function displayRawContent(content) {
    document.getElementById('rawText').textContent = content;
    document.getElementById('rawContent').style.display = 'block';
    document.getElementById('message').textContent = '';
    document.getElementById('downloadLink').style.display = 'none';
}

function prepareDownload() {
    const textInput = document.getElementById('textInput');
    const fileNameInput = document.getElementById('fileName');
    let content = textInput.value;
    let fileName = fileNameInput.value || 'fileguest';

    if (!content && document.getElementById('rawText').textContent) {
        content = document.getElementById('rawText').textContent;
    }

    if (!content) {
        document.getElementById('message').textContent = 'No content to prepare for download';
        return;
    }

    createDownloadLink(fileName, content);
    document.getElementById('message').textContent = 'Content ready for download';
}

function createDownloadLink(fileName, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('download');
    downloadLink.href = url;
    downloadLink.download = `${fileName}.txt`;
    downloadLink.style.display = 'block';
    document.getElementById('downloadLink').style.display = 'block';
}
