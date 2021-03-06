//this will be what loads the sample stories to the index page
$(document).ready(function() {
  $(`button.full`).click(function(e){
    e.preventDefault();
    let contributionId = $(this).attr("id")
    let storyContent = $(`div.story${contributionId}`).text();
    let $string = `contributionId=${contributionId}&storyContent=${storyContent}`;

    $.ajax({
      url: `/accepted/contribution`,
      method: "POST",
      data: $string,
    })
    .done(() => {
      //location.reload();
      res.render("view")//view/${db.query(`insert then return new id`)}
    })
    .fail(error => console.log(error));
  });

  $(`button.markCompleted`).click(function(e){
    e.preventDefault();
    let storyId = $(this).attr("id")
    let $string = `storyId=${storyId}`;

    $.ajax({
      url: `/markCompleted/completed`,
      method: "POST",
      data: $string,
    })
  });

  const createStoryElement = function(story) {
    const $story = `
    <article class="card part" id=${story.story_id}>
    <div class="card-header"><span>${story.story_title}</span><span>By: ${story.username}</span></div>
    <div class="thumbnails"><img src="styles/blue.jpg"></div>
    <div class="story">${story.story_beginning} ${story.contribution}</div>
    <footer class="upvotes"><button>Contribute</button><button>Upvotes: +4</button></footer>
    </article>
    `;
    return $story;
  };

  $.ajax({
    method: "GET",
    url: "/api/view"
  }).done((stories) => {
    //check there's content in contribution field
    //query db to write the contribution in, return the inserted row
    //AJAX to re-render the page, clear form and display contributions again
    $("form").on("submit", function(event) {
      event.preventDefault();
      let $string = $(this).serialize();
      let storyId = $("article.full").attr("id")
      $string += `&storyId=${storyId}`;
      console.log($string)
      //errors are not currently working, were before I changed post to get?
      if ($(this.children[2]).length < 1) {
        throw new Error("Please enter text for contributing to a story.");
      } else {
        $.ajax({
          url: `/contribution/contribution`,
          method: "POST",
          data: $string,
        })
      };
    });
  });
});
