function upload() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var textInput = document.getElementById('textInput');
    var formData = new FormData();

    if (file) {
        formData.append('file', file);
    } else {
        var textBlob = new Blob([textInput.value], { type: 'text/plain' });
        formData.append('file', textBlob, 'text.txt');
    }

    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              document.getElementById('message').textContent = 'File uploaded successfully!';
              document.getElementById('rawText').textContent = data.content;
              document.getElementById('rawContent').style.display = 'block';
          } else {
              document.getElementById('message').textContent = 'Error uploading file';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('message').textContent = 'Error uploading file';
      });
}
