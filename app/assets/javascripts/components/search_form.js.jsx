var SearchForm = React.createClass({
render: function(){
  return(<div id="SearchForm">
  <form hidden className="form-horizontal jumbotron" id="myForm" action="/search" acceptCharset="UTF-8" method="get"><input name="utf8" type="hidden" value="&#x2713;" />
  <fieldset>
  <div className="form-group">
    <label className="col-xs-4 control-label">How much is a SmartPhone Camera important to you?</label>
    <div className="col-xs-8">
    <div className='radio'>
      <input required type="radio" name="media_user" id="media_user_0" value="0" />
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
    <fieldset>
    <div className="form-group">
    <label className="col-xs-4 control-label">You play games on your phone?</label>
    <div className="col-xs-8">
    <div className='radio'>
      <input required type="radio" name="game_user" id="game_user_0" value="0" />
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

    <fieldset>
    <div className="form-group">
    <label className="col-xs-4 control-label">How often you operate your phone?</label>
    <div className="col-xs-8">
    <div className='radio'>
      <input required type="radio" name="multitask_user" id="multitask_user_0" value="0" />
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

    <fieldset>
    <div className="form-group">
    <label className="col-xs-4 control-label">Anything specific required?</label>
    <span className="col-xs-8">
    <input className="form-control" placeholder="Amoled 4G Infrared Fingerprint Bravia BoomSound" type="text" name="feature" />
    </span>
    </div>
    </fieldset>
    <fieldset>
    <div className="form-group">
    <label className="col-xs-4 control-label">Max price if any?(&#8377;)</label>
    <span className="col-xs-8">
    <input className="form-control" placeholder="Rs." type="number" name="price" />
    </span>
    </div>
    </fieldset>

    <input className="btn btn-primary" type="submit" value="search" />
    <input type="button" onClick={function(){$("#myForm, #findButton").toggle();}} className="btn" value="Cancel" />
  </form>
  <h3 className="text-center">< hr /><button className="label label-warning" id="findButton" onClick={function(){$("#myForm, #findButton").toggle();}}>Suggest me a phone!</button><hr/></h3>
  </div>);
}
});

var SearchModels = React.createClass({
  reset:function() {
    this.setProps({models: null});
  },
  componentDidMount:function(){
  x = this;
  $("#myForm").on("submit", function(e){
  e.preventDefault();
  var data = $('#myForm').serialize();
  var jqxhr = $.ajax({
    url: "/search",
    data: data,
    success: function(models){
    if(models.length)
      x.setProps({models: models});
    else
      alert("The specified feature was not found with preferences selected.");
    }.bind(this)
    });
  });
  },
  componentDidUpdate: function(){
  $('html, body').animate({ scrollTop: $("#feed").offset().top });
  x = this;
  $("#myForm").on("submit", function(e){
  e.preventDefault();
  var data = $('#myForm').serialize();
  var jqxhr = $.ajax({
    url: "/search",
    data: data,
    success: function(models){
    if(models.length)
      x.setProps({models: models});
    else
      alert("The specified feature was not found with preferences selected.");
    }.bind(this)
    });
  });
  },
  render: function() {
    if(this.props.models == undefined || !this.props.models){
      return <SearchForm />;
    }
    return (
      <div>
      <div className="panel panel-success">
      <center className="panel-heading"><h3>Look what I found!</h3><button className="btn btn-link btn-block" onClick={this.reset} > Clear these results </button></center>
      <div className="panel-body">
      <ol>
        {this.props.models.map(function(result) {
           return <SearchListItemWrapper key={result.id} data={result}/>;
        })}
      </ol>
      </div>
      <center><button className="btn btn-danger" onClick={this.reset} > Clear these results </button></center>
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
