const newBlog = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#blog-title').value.trim()
    const content = document.querySelector('#blog-content').value.trim()
   
    if (title && content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create blog')
        }
    }

};

// const delButton = async (event) => {
//     event.preventDefault();

//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');
     
//         const response = await fetch(`/api/blogs/${id}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete blog')
//         }
//     }
// }


document.querySelector('.new-blog-form').addEventListener('submit', newBlog);
// document.querySelector('.blog-list').addEventListener('click', delButton);

