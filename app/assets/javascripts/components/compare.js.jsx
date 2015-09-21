var Compare = React.createClass({
  getInitialState: function(){
    return {data: null, data1: {}, data2: {}};
  },
  updateData1: function(id){
    $.ajax({
      url: "/compare_model/"+id,
      success: function(data){
         this.setState({data1: data});
      }.bind(this)
    });
  },
  updateData2: function(id){
    $.ajax({
      url: "/compare_model/"+id,
      success: function(data){
         this.setState({data2: data});
      }.bind(this)
    });
  },
  afterMount: function(){
    $("#searchCompare1").autocomplete({
      source: this.state.data,
      select: function(event, ui){
        this.updateData1(ui.item.id)
      }.bind(this)
    });
    $("#searchCompare2").autocomplete({
      source: this.state.data,
      select: function(event, ui){
        this.updateData2(ui.item.id)
      }.bind(this)
    });
  },
  componentDidMount: function () {
    $.ajax({
      url: "/compare_data",
      success: function(data){
         this.setState({data: data});
         this.afterMount();
      }.bind(this)
    });
  },
  render: function () {
    return(
      <div className="row">
      <h3 className="text-center">Compare Phones</h3>
        <div className="col-md-6">
          <input className="form-control" id='searchCompare1' type="text" />
          <SearchListItemWrapper data={this.state.data1}/>
        </div>
        <div className="col-md-6">
          <input className="form-control" id='searchCompare2' type="text" />
          <SearchListItemWrapper data={this.state.data2}/>
        </div>
      </div>
      );
  }
});

var Model = React.createClass({
  render: function(){
    return(
        <div className="row" >
          <div className="col-xs-6"><img src={this.props.data.img} /></div>
          <div className="col-xs-6">
            <SwfButton title="Spin" src={this.props.data.swf} />
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.data.features}} />
          <div dangerouslySetInnerHTML={{__html: this.props.data.disadvantages}}/ >
        </div>
      );
  }
});
