const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteSpan = document.createElement("span");
  deleteSpan.innerText = "❌";
  deleteSpan.className = "video__delete-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  if (event.target.className !== "video__delete-comment") {
    return;
  }
  const li = event.target.closest("li");
  const commentId = li.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    li.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (videoComments) {
  videoComments.addEventListener("click", handleDelete);
}
