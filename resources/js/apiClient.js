export function createTask (taskTitle, taskDescription,taskDeadline) {
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
        throw error;
    });
}

export function updateTaskStatus(taskId, status) {
    fetch(`/update/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        window.location.reload();
    });
}

export function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        window.location.reload();
    });
}

