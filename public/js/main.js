
 document.querySelector('#home').addEventListener('click', () => {  
   document.location.replace('/');
 });

 document.querySelector('#dashboard').addEventListener('click', () => {  
   document.location.replace('/dashboard');
 });
 
 if (document.querySelector('#login') !== null) {
  document.querySelector('#login').addEventListener('click', () => {  
    document.location.replace('/login');
  });
}
/*
const posts = document.querySelectorAll(".main-card-post");

for (let i = 0; i < posts.length; i++) {
  posts[i].addEventListener("click", async (event) => {  
    event.preventDefault();
    let post_id = event.target.id;

    alert(post_id);
    document.location.replace('/api/comment/' + post_id);
  });
}
*/
const cardComments = document.querySelectorAll(".card-comment");

for (let i = 0; i < cardComments.length; i++) {
  cardComments[i].addEventListener("click", async (event) => {  
    event.preventDefault();
    let id = event.target.id;
    document.getElementById("comment-id").value = id;
    document.getElementById("comment-content").value = event.target.dataset.comment;
    document.getElementById("comment-new-content").style.display="none";
    document.getElementById("comment-update-content").style.display="block";
    document.getElementById("comment-delete-content").style.display="block";
  });
}

if (document.querySelector('#comment-new-content') !== null) {
  document.querySelector('#comment-new-content').addEventListener('click', async (event) => { 
    
    event.preventDefault();
    const post_id = document.querySelector('#comment-id').value.trim();
    const comment = document.querySelector('#comment-content').value.trim();
    //alert(comment);
    if (post_id && comment) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to Create comment.');
      }
    }
  });
}
if (document.querySelector('#comment-delete-content') !== null) {
  document.querySelector('#comment-delete-content').addEventListener('click', async (event) => {  

    event.preventDefault();
    const comment_id = document.querySelector('#comment-id').value.trim();
    const comment = document.querySelector('#comment-content').value.trim();
    
    if (comment_id && comment) {
      const response = await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({ comment_id, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
      
    }
    document.location.replace('/');
  });
}
if (document.querySelector('#comment-update-content') !== null) {
  document.querySelector('#comment-update-content').addEventListener('click', async (event) => {  
    
    event.preventDefault();
    const comment_id = document.querySelector('#comment-id').value.trim();
    const comment = document.querySelector('#comment-content').value.trim();
    
    if (comment_id && comment) {
      const response = await fetch('/api/comment', {
        method: 'PUT',
        body: JSON.stringify({ comment_id, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
    }
  });
}