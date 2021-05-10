const update = async (e) => {
    e.preventDefault()

    const title = document.querySelector('#blog-title').value.trim()
    const content = document.querySelector('#blog-content').value.trim()
    const id = e.target.getAttribute('data-id')
    
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert(response.statusText);
        }
    
}

const delButton = async (event) => {
  event.preventDefault();
  
  if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
   
      const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert('Failed to delete blog')
      }
  }
}
document.querySelector('#delete').addEventListener('click', delButton)
document.querySelector('.edit-blog-form').addEventListener('submit', update)