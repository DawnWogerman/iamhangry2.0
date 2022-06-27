async function newFormHandler(event) {
    event.preventDefault();
  
    const location = document.querySelector('input[name="post-location"]').value;
    const num_of_drinks = document.querySelector('input[name="post-num_of_drinks"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        location,
        num_of_drinks
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);