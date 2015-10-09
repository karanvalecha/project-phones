function createMarkup(param) { return {__html: param}; };

var SwfButton = React.createClass({
  click: function(){
    $(".modal-title").html(this.props.title);
    $(".modal-body").html("<center><embed src='"+this.props.src+"'></embed></center>");
    $("#myModal").modal();
  },
  render: function(){
    var x = null
    if(this.props.src){
      x = <button onClick={this.click} className="btn btn-md btn-success" title={this.props.title}>{this.props.title}</button>;
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
    $(".modal-body ul").attr("class", "list-group");
    $(".modal-body ul > li").attr("class", "list-group-item");
  },
  render: function(){
    var x = null
    if(this.props.features){
      x = <button onClick={this.click} className="btn btn-md btn-info" title={this.props.title}>{this.props.title}</button>;
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
          <span className="col-sm-3"><SwfButton src={model.swf} title="Drag the image to spin 360°" /> </span>
          <span className="col-sm-3"><SpecButton specs={model.spec_sheet} title="Specifications" /> </span>
          <span className="col-sm-3"><MainFeaturesButton features={model.features} title="Key Features" /> </span>
          <span className="col-sm-3"><DisadvantagesButton disadvantages={model.disadvantages} title="Disadvantages" /></span>
        </div>
      </div>
      </li>);
  }
});
var Models = React.createClass({

  getInitialState: function(){
    return {count_model: 5};
  },
  getDefaultProps: function(){
    return {models: []};
  },
  componentDidMount: function(){
    var _this = this;
    $.ajax({
      url: "all_json",
      success: function(models){
        _this.setProps({models: models});
        $(window).on("scroll",function(){
      if($(window).scrollTop() > $("#load").offset().top - $(window).height()*1.8){
        if(_this.state.count_model < _this.props.models.length){
          _this.setState({count_model: _this.state.count_model+3});
        }else{
          $(window).off("scroll")
          $("#img").html("--FINISH--");
        }
      }
    });
      }.bind(this)
    });
  },
  render: function() {
    if(this.props.models == undefined || !this.props.models){
      return <center><img src='http://preloaders.net/preloaders/499/Balls%20parade.gif' /></center>
    }
    return (
      <div>
        <Modal />
        <h2><span className="label label-info" >Top Trending SmartPhones this week&#8628;</span></h2>
          <div className="panel panel-info">
            <div className="panel-body" id="models_body">
              <ol>
                {this.props.models.slice(0, this.state.count_model).map(function(result) {
                   return <ListItemWrapper key={result.id} data={result}/>;
                })}
              </ol>
            </div>
            <center id="img"><img src='http://preloaders.net/preloaders/499/Balls%20parade.gif' /></center>
          </div>
        <hr id="load" />
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
              <div className="modal-header">
                <button type="button" className="clo btn btn-danger pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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


