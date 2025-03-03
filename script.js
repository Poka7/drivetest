document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the backend
    const response = await fetch('https://<raspberry-pi-tunnel-url>/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('fileManager').style.display = 'block';
        fetchFiles(); // Fetch and display files
    } else {
        alert('Login failed. Please check your credentials.');
    }
});

async function fetchFiles() {
    const response = await fetch('https://<raspberry-pi-tunnel-url>/files');
    const files = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = files.map(file => `
        <li>
            <a href="https://<raspberry-pi-tunnel-url>/download/${file}" target="_blank">${file}</a>
        </li>
    `).join('');
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://<raspberry-pi-tunnel-url>/upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('File uploaded successfully!');
        fetchFiles(); // Refresh the file list
    } else {
        alert('File upload failed.');
    }
}
