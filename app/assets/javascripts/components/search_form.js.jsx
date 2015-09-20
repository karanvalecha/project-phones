var SearchForm = React.createClass({
render: function(){
  return(<div id="SearchForm">
  <h3>Find the SmartPhone you need!</h3>
  <form className="form-horizontal jumbotron carousel slide" id="myForm" action="/search" acceptCharset="UTF-8" method="get" data-ride='carousel' data-interval='5500'><input name="utf8" type="hidden" value="✓" />
  <div className='carousel-inner'>
    <fieldset className='item active'>
    <div className="form-group">
      <label className="col-xs-6 control-label">How much is a SmartPhone Camera important to you?</label>
      <div className="col-xs-6">
      <div className='radio'>
        <input type="radio" name="media_user" id="media_user_0" value="0" />
        <label htmlFor="media_user">I don&#39;t use a SmartPhone&#39;s camera!</label>
      </div>
      <div className='radio'>
        <input type="radio" name="media_user" id="media_user_1" value="1" />
        <label value="1" htmlFor="media_user">A decent camera is enough!</label>
      </div>
      <div className='radio'>
        <input type="radio" name="media_user" id="media_user_2" value="2" />
        <label htmlFor="media_user">I often use a SmartPhone camera and edit on the go.</label>
      </div>
      </div>
    </div>
    </fieldset>

    <fieldset className='item'>
    <div className="form-group">
      <label className="col-xs-6 control-label">You play games on your phone?</label>
      <div className="col-xs-6">
      <div className='radio'>
        <input type="radio" name="game_user" id="game_user_0" value="0" />
        <label htmlFor="game_user">Very rare</label>
      </div>
      <div className='radio'>
        <input type="radio" name="game_user" id="game_user_1" value="1" />
        <label value="1" htmlFor="game_user">Ocassionally</label>
      </div>
      <div className='radio'>
        <input type="radio" name="game_user" id="game_user_2" value="2" />
        <label htmlFor="game_user">I am a hardcore gamer.</label>
      </div>
      </div>
    </div>
    </fieldset>

    <fieldset className='item'>
    <div className="form-group">
      <label className="col-xs-6 control-label">How often you operate your phone?</label>
      <div className="col-xs-6">
      <div className='radio'>
        <input type="radio" name="multitask_user" id="multitask_user_0" value="0" />
        <label htmlFor="multitask_user">Just phone calls and texts</label>
      </div>
      <div className='radio'>
        <input type="radio" name="multitask_user" id="multitask_user_1" value="1" />
        <label value="1" htmlFor="multitask_user">Very often.</label>
      </div>
      <div className='radio'>
        <input type="radio" name="multitask_user" id="multitask_user_2" value="2" />
        <label htmlFor="multitask_user">24x7 online with my pone</label>
      </div>
      </div>
    </div>
    </fieldset>

    <center>
      <div className="form-group">
      <label className="col-xs-6 control-label">Special Features?</label>
        <span className="col-xs-4">
          <input className="form-control" placeholder="Amoled 4G Infrared Fingerprint Bravia BoomSound" type="text" name="feature" />
        </span>
        <label className="col-xs-6 control-label">Max price if any?</label>
        <span className="col-xs-4">
          <input className="form-control" placeholder="₹" type="number" step="500" name="price" />
        </span>
      </div>
      <input className="btn btn-lg btn-success" type="submit" value="search" />
    </center>
    </div>

    <a className="left carousel-control" href="#myForm" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myForm" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>

  </form>
  <center hidden id = 'x'><img src='http://preloaders.net/preloaders/499/Balls%20parade.gif' /></center>
  </div>);
}
});

var SearchModels = React.createClass({
  reset:function() {
    this.setProps({models: null});
  },
  formSearch: function(){
  $("#myForm input[type='radio']").on("click", function(){
    if($("#myForm input[type='radio']:checked").length < 3){
      $("#myForm").carousel("next");
    }else{
      $("#myForm input[type='number']").focus();
    }
  });

  $('html, body').animate({ scrollTop: $("#feed").offset().top });
  x = this;
  $("#myForm").on("submit", function(e){
  $("#myForm").hide();
  $("#x").show();
  e.preventDefault();
  var data = $('#myForm').serialize();
  var jqxhr = $.ajax({
    url: "/search",
    data: data,
    success: function(models){
      if(models.length){
        x.setProps({models: models});
      }else{
        $("#myForm").show();
        $("#x").hide();
        alert("The specified feature was not found with preferences selected.");
      }
    }.bind(this),
    error: function(){
      $("#myForm").slideDown();
    }
    });
  });
  },
  componentDidMount: function(){
    this.formSearch();
  },
  componentDidUpdate: function(){
    this.formSearch();
    // $( ".panel-success" ).mouseenter(function() {
    //   $("#clearResultsBtn").show();
    // })
    // .mouseleave(function() {
    //   $("#clearResultsBtn").hide();
    // });
  },
  render: function() {
    if(this.props.models == undefined || !this.props.models){
      return <SearchForm />;
    }
    return (
      <div id="SearchResults">
        <div className="panel panel-success">
        <center className="panel-heading"><h3>Look what I found!</h3></center>
          <div className="panel-body">
            <ol>
              {this.props.models.map(function(result) {
                 return <SearchListItemWrapper key={result.id} data={result}/>;
              })}
            </ol>
          </div>
        <button id="clearResultsBtn" hidden className="btn btn-danger" onClick={this.reset} > Clear these results </button>
        </div>
      </div>
    );
  }
});

var SearchListItemWrapper = React.createClass({

  render: function() {
    var model = this.props.data
    return (
      <li className="media panel">
      <img src={model.img} title={model.name} alt={model.name} className="media-object pull-left" />
      <div className="media-body">
        <h3 className="media-heading">{model.name}</h3>
        <p>{model.title}</p>
        <div className="row">
          <p className="col-sm-4">Priced about <u>&#8377; {model._price}</u></p>
          <span className="col-sm-4"><SwfButton src={model.swf} title="Rotate 360°" /> </span>
          <span className="col-sm-4"><SpecButton specs={model.spec_sheet} title="Specifications" /> </span>
        </div>
        <div className="features" dangerouslySetInnerHTML={{__html: "<h1>Features</h1>"+(model.features || "<h3>Unavailable</h3>")}} />
        <div className="disadvantages" dangerouslySetInnerHTML={{__html: "<h1>Disadvantages</h1>"+(model.disadvantages || "<h3>Unavailable</h3>")}} />
      </div>
      </li>);
  }
});
