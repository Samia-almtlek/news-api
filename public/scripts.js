// References
const newsContainer = document.getElementById('news-container');

// Fetch and display all news
function fetchAllNews() {
    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = '';
            data.forEach(news => {
                const newsDiv = document.createElement('div');
                newsDiv.classList.add('news');
                newsDiv.innerHTML = `
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                    <small>Author: ${news.author}</small>
                    <small>Category: ${news.category || 'Uncategorized'}</small>
                    <div class="actions">
                        <button onclick="deleteNews('${news._id}')">Delete</button>
                        <button onclick="showEditForm('${news._id}', '${news.title}', '${news.description}', '${news.author}')">Edit</button>
                    </div>
                    <form class="edit-form" id="edit-form-${news._id}" onsubmit="submitEditForm(event, '${news._id}')">
                        <input type="text" id="edit-title-${news._id}" value="${news.title}" required>
                        <textarea id="edit-description-${news._id}" required>${news.description}</textarea>
                        <input type="text" id="edit-author-${news._id}" value="${news.author}" required>
                         <select id="edit-category-${news._id}" required>
                         <option value="Politics" ${news.category === 'Politics' ? 'selected' : ''}>Politics</option>
            <option value="Sports" ${news.category === 'Sports' ? 'selected' : ''}>Sports</option>
            <option value="Technology" ${news.category === 'Technology' ? 'selected' : ''}>Technology</option>
            <option value="Health" ${news.category === 'Health' ? 'selected' : ''}>Health</option>
            <option value="Entertainment" ${news.category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
        </select>
                        <button type="submit">Save Changes</button>
                        <button type="button" onclick="hideEditForm('${news._id}')">Cancel</button>
                    </form>
                `;
                newsContainer.appendChild(newsDiv);
            });
        })
        .catch(err => console.error(err));
}

// Show edit form
function showEditForm(id, title, description, author) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = 'block';
}

// Hide edit form
function hideEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = 'none';
}

// Submit edit form
function submitEditForm(event, id) {
    event.preventDefault();
    const title = document.getElementById(`edit-title-${id}`).value;
    const description = document.getElementById(`edit-description-${id}`).value;
    const author = document.getElementById(`edit-author-${id}`).value;
    const category = document.getElementById(`edit-category-${id}`).value;


    fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, author,category }),
    })
    .then(response => {
        if (!response.ok) {
            // إذا كان هناك خطأ في السيرفر، نحصل على الرسالة
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then(data => {
        alert('News added successfully!');
        fetchAllNews(); // إعادة تحميل قائمة الأخبار
    })
    .catch(err => {
        // عرض رسالة الخطأ
        alert(`Error: ${err.message}`);
    });
    }

// Add new news
document.getElementById('news-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;


    fetch('/api/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, author ,category, start_date, end_date}),
    })
    .then(response => {
        if (!response.ok) {
            // إذا كان هناك خطأ في السيرفر، نحصل على الرسالة
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then(data => {
        alert('News added successfully!');
        fetchAllNews(); // إعادة تحميل قائمة الأخبار
    })
    .catch(err => {
        // عرض رسالة الخطأ
        alert(`Error: ${err.message}`);
    });
})
// Search news
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('search-title').value;
    const author = document.getElementById('search-author').value;

    let query = '/api/news/search?';
    if (title) query += `title=${title}&`;
    if (author) query += `author=${author}`;

    fetch(query)
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = ''; // Clear existing news
            data.forEach(news => {
                const newsDiv = document.createElement('div');
                newsDiv.classList.add('news');
                newsDiv.innerHTML = `
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                    <small>Author: ${news.author}</small>
                    <div class="actions">
                        <button onclick="deleteNews('${news._id}')">Delete</button>
                        <button onclick="showEditForm('${news._id}', '${news.title}', '${news.description}', '${news.author}')">Edit</button>
                    </div>
                `;
                newsContainer.appendChild(newsDiv);
            });
        })
        .catch(err => console.error(err));
});

// Delete news
function deleteNews(id) {
    fetch(`/api/news/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAllNews();
        })
        .catch(err => console.error(err));
}

// Load all news on page load
fetchAllNews();
