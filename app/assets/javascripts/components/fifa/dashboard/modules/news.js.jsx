var News = React.createClass({
  getInitialState: function () {
    return { scrollLoaded: false, news: [] };
  },
  componentDidMount: function() {
    this.getData();
  },
  getData: function(props) {
    var self = this;

    Dispatcher.fifaGet(
      FIFAEndpoints.NEWS,
      {},
      function(data) {
        this.setState({
          news: data.reverse()
        }, function () {
          if (!self.state.scrollLoaded) {
            $('#top-news').jScrollPane({contentWidth: '0px'});
            self.setState({scrollLoaded: true});
          } else if (self.state.wait) {
            if (typeof($('#top-news').data('jsp')) == "undefined") {
              $('#top-news').jScrollPane({contentWidth: '0px'});
              self.setState({scrollLoaded: true});
            }
            self.setState({wait: false});
          } else {
            $('#top-news').data('jsp').destroy();
            $('#top-news').jScrollPane({contentWidth: '0px'});
            $('#top-news').data('jsp').addHoverFunc();
          }
        });

      }.bind(this)
    );
  },
  renderList: function () {
    var list = $.map(this.state.news, function (item, index) {
      return(
        <NewsItem key={index} item={item} />
      );
    });

    return (
      <ul id="top-news" className="media-list text-list media-list-scrollable-tall">
        {list}
      </ul>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_news" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top News</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
        <div className="dashboard-module-footer">
          <h5 className="pull-left">View More Top News Articles</h5>
          <a className='pull-right btn btn-sm btn-primary img-round'>View <span className="glyphicon glyphicon-play"></span></a>
        </div>
      </div>
    );
  }
});
