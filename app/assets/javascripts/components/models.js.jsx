// jQuery ->
//   # React.render((React.createElement(HelloMessage, {name: 'John'})), $('#feed'))
//   feed = new google.feeds.Feed("http://www.gsmarena.com/rss-news-reviews.php3")
//   feed.load (result) ->
//     @entries = result.feed.entries
//     # for res in result.feed.entries
//     React.render(React.createElement(HelloMessage, {name: @entries}), document.getElementById("feed"))
//     alert(res.content)
// DOM = React.DOM
// @Models = React.createClass
//   models: ->
//    m = @props.models
//   getInitialState: ->
//     name: @props.models || "Error"
//   displayName: 'Models'
//   render: ->
//     models = @props.models
//     DOM.div
//       className: "jumbotron"
//     for model in models
//       DOM.div
//         className: 'media'
//         DOM.img
//           className: 'media-object pull-left'
//           alt: "img"
//           src: model.img
//         DOM.div
//           className: "media-body"
//           DOM.h2
//             className: 'media-heading'
//             model.name
//           DOM.p
//             className: 'jumbotron'
//             model.title
// @HelloMessage = React.createClass
//   displayName: 'HelloMessage'
//   render: ->
//     React.createElement('div', null, 'Hello ', @props.name)
function createMarkup(param) { return {__html: param}; };

var SwfButton = React.createClass({
  click: function(){
    $("#myModal").modal();
    $(".modal-title").html(this.props.title);
    $(".modal-body").html("<center><embed src='"+this.props.src+"'></embed></center>");
  },
  render: function(){
    var x = null
    if(this.props.src){
      x = <button onClick={this.click} className="btn btn-md btn-info" title={this.props.title}>{this.props.title}</button>;
    }
    else{
      x = <button className="btn btn-md btn-disabled" title="Unavailable">{this.props.title}</button>;
    }
      return(x);
  }
});

var MainFeaturesButton = React.createClass({
  click: function(){
    $("#myModal").modal();
    $(".modal-title").html(this.props.title);
    $(".modal-body").html(this.props.features);
        $(".modal-body > ul").attr("class", "list-group");
    $(".modal-body > ul > li").attr("class", "list-group-item");
  },
  render: function(){
    var x = null
    if(this.props.features){
      x = <button onClick={this.click} className="btn btn-md btn-success" title={this.props.title}>{this.props.title}</button>;
    }else{
      x = <button className="btn btn-md btn-disabled" title="Unavailable">Key Features</button>;
    }
      return(x);
  }
});

var DisadvantagesButton = React.createClass({
  click: function(){
    $("#myModal").modal();
    $(".modal-title").html(this.props.title);
    $(".modal-body").html(this.props.disadvantages);
    $(".modal-body > ul").attr("class", "list-group");
    $(".modal-body > ul > li").attr("class", "list-group-item");
  },
  render: function(){
    var x = null
    if(this.props.disadvantages){
      x = <button onClick={this.click} className="btn btn-md btn-danger" title={this.props.title}>{this.props.title}</button>;
    }else{
      x = <button className="btn btn-md btn-disabled" title="Unavailable" >{this.props.title}</button>;
    }
      return(x);
  }
});


var SpecButton = React.createClass({
  click: function(){
    $("#myModal").modal();
    $(".modal-title").html(this.props.title);
    $(".modal-body").html(this.props.specs);
    $(".modal-body table").addClass("table table-striped").removeAttr("cellspacing style");
    $(".modal-body #specs-list style").remove();
    $("#specs-list a").removeAttr("href");
    $(".table > tbody > tr > th").css("padding","0").css("width", "50px");
  },
  render: function(){
    var x = null
    if(this.props.specs){
      x = <button onClick={this.click} className="btn btn-md btn-warning" title={this.props.title}>{this.props.title}</button>;
    }else{
      x = <button className="btn btn-md btn-disabled" title="Unavailable" >{this.props.title}</button>;
    }
      return(x);
  }
});

var ListItemWrapper = React.createClass({

  render: function() {
    var model = this.props.data
    return (<li className="media">
      <img src={model.img} title={model.name} alt={model.name} className="media-object pull-left" />
      <div className="media-body">
        <h3 className="media-heading">{model.name}</h3>
        <p>{model.title}</p>
        <p>Priced about <u>&#8377; {model._price}</u></p>
        <div className="row">
          <span className="col-sm-3"><SwfButton src={model.swf} title="Rotate 360°" /> </span>
          <span className="col-sm-3"><SpecButton specs={model.spec_sheet} title="Specifications" /> </span>
          <span className="col-sm-3"><MainFeaturesButton features={model.features} title="Key Features" /> </span>
          <span className="col-sm-3"><DisadvantagesButton disadvantages={model.disadvantages} title="Disadvantages" /></span>
        </div>
      </div>
      </li>);
  }
});
var Models = React.createClass({
  reset:function(){
    $('html, body').animate({ scrollTop: $("#img").offset().top });
    this.setProps({models: this.props.models.slice(0,3)});
    $("#showLess").toggle();
    $("#hmm").toggle();
    $("#img").toggle();
  },
  componentDidUpdate: function(){
    $('html, body').animate({ scrollTop: $("#findButton").offset().top }, 1000);
  },
  fullLoad: function(e){
    // $("#hmm").hide();
  // $('#myModal').modal();
  $("#showLess").toggle();
  $("#hmm").toggle();
  $("#img").toggle();
  var jqxhr = $.ajax({
    url: "all_json",
    dataType: 'json',
    cache: true,
    success: function(models){
      this.setProps({models: models})
      // $("#myModalLabel").html("All Phones")
      // React.render(<Models models={models} />, document.getElementsByClassName("modal-body")[0]);
    }.bind(this)
  });
  },
  render: function() {
    return (
      <div>
        <Modal />
        <div className="panel panel-info">
        <center className="panel-heading">Popular Phones<input className="badge" type="button" hidden id="showLess" onClick={this.reset} value="Undo" /></center>
        <div className="panel-body">
      <ol>
        {this.props.models.map(function(result) {
           return <ListItemWrapper key={result.id} data={result}/>;
        })}
      </ol>
      </div>
      <center id="img" hidden><img src='http://preloaders.net/preloaders/499/Balls%20parade.gif' /></center>
      <center id="hmm"><button className="badge" onClick={this.fullLoad}>Show All Phones</button></center>
      </div>
      </div>
    );
  }
});

var Modal = React.createClass({
  render: function(){
    return(
      <div>
        <div className="modal fade modal-fullscreen modal-transparent" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header info">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <center className="modal-title" id="myModalLabel">...</center>
              </div>
              <div className="modal-body">
                <center> <img src='http://preloaders.net/preloaders/294/Balls%20line.gif' /></center>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
});


