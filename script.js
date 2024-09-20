document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const notes = document.getElementById('notes').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p><strong>Anotações:</strong> ${notes}</p>
        <p><strong>Prioridade:</strong> ${priority}</p>
        <p><strong>Data de Vencimento:</strong> ${dueDate}</p>
        <button class="complete-btn">Marcar como Concluída</button>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
    `;

    document.getElementById('tasks').appendChild(task);

    task.querySelector('.complete-btn').addEventListener('click', function() {
        task.classList.toggle('completed');
    });

    task.querySelector('.edit-btn').addEventListener('click', function() {
        document.getElementById('title').value = title;
        document.getElementById('description').value = description;
        document.getElementById('notes').value = notes;
        document.getElementById('priority').value = priority;
        document.getElementById('due-date').value = dueDate;
        task.remove();
    });

    task.querySelector('.delete-btn').addEventListener('click', function() {
        task.remove();
    });

    document.getElementById('task-form').reset();
});

// Função para gerar relatório das tarefas concluídas
document.getElementById('generate-report').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const completedTasks = document.querySelectorAll('.task.completed');
    let report = 'Relatório de Tarefas Concluídas:\n\n';

    completedTasks.forEach(task => {
        const title = task.querySelector('h3').innerText;
        const description = task.querySelector('p:nth-of-type(1)').innerText;
        const notes = task.querySelector('p:nth-of-type(2)').innerText;
        const priority = task.querySelector('p:nth-of-type(3)').innerText;
        const dueDate = task.querySelector('p:nth-of-type(4)').innerText;

        report += `Título: ${title}\nDescrição: ${description}\n${notes}\n${priority}\n${dueDate}\n\n`;
    });

    doc.text(report, 10, 10);
    doc.save('relatorio_tarefas_concluidas.pdf');
});


