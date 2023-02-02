{
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        typo: "post",
        url: "/post/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  createPost();
}
