const notionAPIKey = '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'; // Thay bằng token của bạn
const databaseId = '13143eb58ab9806eb53be4f52d1a6018'; // Thay bằng ID của Database bạn đã tạo

const getNotionContent = async () => {
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${notionAPIKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        const results = data.results;

        const blogContentDiv = document.getElementById('blog-content');
        results.forEach(page => {
            const title = page.properties.Name.title[0].text.content;
            const content = page.properties.Content.rich_text[0].text.content; // Thay đổi theo cấu trúc của bạn

            const postDiv = document.createElement('div');
            postDiv.classList.add('p-4', 'bg-white', 'rounded', 'shadow-md');
            postDiv.innerHTML = `<h2 class="text-2xl font-semibold">${title}</h2><p>${content}</p>`;
            blogContentDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ Notion:', error);
    }
};

getNotionContent();