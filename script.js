document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var rawCheckbox = document.getElementById('rawCheckbox');
    var addRaw = rawCheckbox.checked;
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            var content = reader.result;
            var filename = file.name;
            var branch = 'main'; // Change this to your branch
            var token = 'YOUR_GITHUB_ACCESS_TOKEN'; // Replace with your GitHub access token

            var url = 'https://api.github.com/repos/alqvriqqq/alqvriqqq.github.io/contents/uploads/' + filename;
            var headers = new Headers();
            headers.append('Authorization', 'token ' + token);

            var body = {
                "message": "Upload " + filename,
                "content": btoa(content),
                "branch": branch
            };
            if (addRaw) {
                body["content"] += "\n\n[View Raw](https://raw.githubusercontent.com/alqvriqqq/alqvriqqq.github.io/" + branch + "/uploads/" + filename + ")";
            }

            fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                var fileLink = document.getElementById('fileLink');
                fileLink.value = data.content.download_url;
                document.getElementById('message').textContent = 'File uploaded successfully!';
                document.getElementById('linkContainer').style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('message').textContent = 'Error uploading file';
            });
        };
    } else {
        document.getElementById('message').textContent = 'Please select a file';
    }
});

document.getElementById('copyButton').addEventListener('click', function() {
    var fileLink = document.getElementById('fileLink');
    fileLink.select();
    document.execCommand('copy');
});
