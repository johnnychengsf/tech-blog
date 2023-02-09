document.getElementById("new-post").addEventListener('click', async (event) => {  
   event.preventDefault();

   document.getElementById("dashboard-list-post").style.display = "none";
   document.getElementById("dashboard-create-new-post").style.display = "block";
   document.getElementById("dashboard-edit-post").style.display = "none";

   const response = await fetch('/api/post', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to Create post.');
    }
});

document.querySelector('.dashboard-form').addEventListener('submit', async(event) => {
   event.preventDefault();
   
   const title = document.querySelector('#create-post-title').value.trim();
   const content = document.querySelector('#create-post-content').value.trim();
 
   if (title && content) {
     const response = await fetch('/api/post', {
       method: 'POST',
       body: JSON.stringify({ title, content }),
       headers: { 'Content-Type': 'application/json' },
     });
    if (response.ok) {
       document.location.replace('/dashboard');
     } else {
       alert('Failed to Create post.');
     }
   }
});
/*
document.querySelector('.dashboard-form-update').addEventListener('submit', async(event) => {
  event.preventDefault();
  const id = document.querySelector('#post-id').value.trim();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'PUT',
      body: JSON.stringify({ id, title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to Create post.');
    }
  }
});
*/
document.getElementById('post-update').addEventListener('click', async(event) => {
  event.preventDefault();
  const id = document.querySelector('#post-id').value.trim();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'PUT',
      body: JSON.stringify({ id, title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to Create post.');
    }
  }
});

document.getElementById('post-delete').addEventListener('click', async(event) => {
  event.preventDefault();
  const id = document.querySelector('#post-id').value.trim();

  const response = await fetch('/api/post', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert('Failed to Delete post.');
  }
});



async function editPost(id) {
  
  document.getElementById("dashboard-list-post").style.display = "none";
  document.getElementById("dashboard-create-new-post").style.display = "none";
  document.getElementById("dashboard-edit-post").style.display = "block";

  await fetch('/api/post/'+ id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(responseJson) {
    document.getElementById("post-id").value = responseJson.id;
    document.getElementById("post-title").value = responseJson.title;
    document.getElementById("post-content").value = responseJson.content;
  });
}