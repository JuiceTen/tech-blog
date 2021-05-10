const commentPost = async (e) => {
    e.preventDefault();
    debugger
    const text = document.querySelector('#comment-text').value.trim();
    const blog_id = e.target.getAttribute('data-id')

    // console.log(blog_id)
    if (text) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                text, 
                blog_id,
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentPost);