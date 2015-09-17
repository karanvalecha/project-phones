# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
google.load("feeds", "1")
entries = []
initialize = ->
  # $('#feed').html(
  #   '<div id="myCarousel" class="carousel slide" data-interval="3000" data-ride="carousel">

  #   <center class="carousel-inner"></center></div>')
  feed = new google.feeds.Feed("http://www.gsmarena.com/rss-news-reviews.php3")
  feed.setNumEntries(21)
  feed.load (result) ->
    entries = shuffle(result.feed.entries)
    car_inner = $(".carousel-inner")
    for res in [0..9]
      if res == 1 #raandom number
        car_inner.append("<a class='item active' href='#{entries[res].link}'>#{entries[res].title}</a>")
      else
        car_inner.append("<a class='item' href='#{entries[res].link}' >#{entries[res].title}</a>")
    $("#myCarousel").carousel()
    $("#loading").remove();
  setInterval(animateBtn, 10000)
google.setOnLoadCallback(initialize)

animateBtn = ->
  $(".animated").toggleClass("flash");

setInterval(initialize, 20000)

# Shuffle function
shuffle = (array) ->
  currentIndex = array.length
  temporaryValue = undefined
  randomIndex = undefined
  # While there remain elements to shuffle...
  while 0 != currentIndex
    # Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    # And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  array
