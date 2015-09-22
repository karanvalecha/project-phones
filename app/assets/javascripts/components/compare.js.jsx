var Compare = React.createClass({
  getInitialState: function(){
    return {data: null, CompareData: [{}]};
  },
  componentDidUpdate: function () {
    $("#specs-list style, #specs-list p").remove();
    $("#specs-list a").removeAttr("href");
    $("table th").css("min-width", "70px").css("padding", "auto").css("border-top", "1px solid black").css("border-bottom", "1px solid black").css("background-color", "#eee");
    $("table td.ttl").css("min-width", "90px").css("padding-left", "3px").css("border-top", "1px solid black").css("border-bottom", "1px solid black");
    $("table td.nfo").css("width", "100%").css("padding", "auto").css("border-top", "1px solid black").css("border-bottom", "1px solid black").css("border-right", "1px solid black");
    // autocomplete assignment
    $("#searchCompare0").autocomplete({
      source: this.state.data,
      select: function(event, ui){
        this.updateData1(ui.item.id)
      }.bind(this)
    });
    $("#searchCompare1").autocomplete({
      source: this.state.data,
      select: function(event, ui){
        this.updateData2(ui.item.id)
      }.bind(this)
    });
  },
  updateSearchModel: function(id){
    $.ajax({
      url: "/compare_model/"+id,
      success: function(data){
         this.setState({SearchModel: data});
      }.bind(this)
    });
  },
  updateData1: function(id){
    $.ajax({
      url: "/compare_model/"+id,
      success: function(data){
        TempData = this.state.CompareData
        TempData[0] = data
        this.setState({CompareData: TempData});
      }.bind(this)
    });
  },
  updateData2: function(id){
    $.ajax({
      url: "/compare_model/"+id,
      success: function(data){
        TempData = this.state.CompareData
        TempData[1] = data
        this.setState({CompareData: TempData});
      }.bind(this)
    });
  },
  componentDidMount: function () {
    $.ajax({
      url: "/compare_data",
      success: function(data){
         this.setState({data: data});
      }.bind(this)
    });
  },
  compareBtn: function(e){
    TempData = [this.state.CompareData[0], {}];
    this.setState({CompareData: TempData});
  },
  searchBtn: function(e){
    TempData = this.state.CompareData;
    TempData.pop();
    this.setState({CompareData: TempData});
  },
  render: function () {
    _this = this;
    return(
      <div id="compare_models" className="row">
      <center>{_this.state.CompareData.length < 2 ? <span>Compare Mode is OFF<button className="btn btn-link" onClick={this.compareBtn}> Turn ON </button> </span> : <span>Compare Mode is ON<button className="btn btn-link" onClick={this.searchBtn}> Turn OFF </button> </span> }</center>
        {this.state.CompareData.map( function(model, index){
        return(
        <div key={index} id="compare_body" className={_this.state.CompareData.length < 2 ? "col-md-offset-2 col-md-8" : "col-md-6"}>
          <input placeholder={index == 1 ? "Compare With" : "Search"} className="form-control" id={'searchCompare' + index} type="text" /><br />
          { model.id != undefined ? <CompareItemWrapper data={model} />: <div></div>}
          { model.id != undefined ? <div height="90vh" className="col-md-12" dangerouslySetInnerHTML={{__html: model.spec_sheet}} /> : <div></div>}
        </div>);})}
      </div>
      );
  }
});

var CompareItemWrapper = React.createClass({

  render: function() {
    var model = this.props.data
    return (<div className="media">
      <img src={model.img} title={model.name} alt={model.name} className="media-object pull-left" />
      <div className="media-body">
        <p>{model.title}</p>
        <p>Priced about <u>&#8377; {model._price}</u></p>
        <div className="row">
          <span className="col-sm-4"><SwfButton src={model.swf} title="Rotate 360°" /> </span>
          <span className="col-sm-4"><MainFeaturesButton features={model.features} title="Key Features" /> </span>
          <span className="col-sm-4"><DisadvantagesButton disadvantages={model.disadvantages} title="Disadvantages" /></span>
        </div>
      </div>
      </div>);
  }
});
