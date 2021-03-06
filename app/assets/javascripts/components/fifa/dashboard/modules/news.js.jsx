var News = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function () {
    return {scrollLoaded: false, news: [], activeFilter: "date", order: "DESC"};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({news: []});

    this.getData({
      start_date: moment(newProps.startDate).format('YYYY-MM-DD'),
      end_date: moment(newProps.endDate).format('YYYY-MM-DD')
    });
  },
  orderBy: function (name, customEvaluator) {
    var order = "DESC";
    var orderedItems = _.sortBy(this.state.news, function (item) {
      if (_.isFunction(customEvaluator)) {
        return customEvaluator(item) || 0;
      } else {
        return _.get(item, name) || 0;
      }
    });

    if (this.state.activeFilter === name && this.state.order === "DESC") {
      order = "ASC";
    }

    if (order === "DESC") {
      orderedItems = orderedItems.reverse();
    }

    this.setState({
      news: orderedItems,
      activeFilter: name,
      order: order
    }, function () {
      $(this.refs.scrollContainer).animate({ scrollTop: 0 });
    }.bind(this));
  },
  getData: function(params) {
    var self = this;

    Dispatcher.fifaGet(
      FIFAEndpoints.NEWS,
      params,
      function(data) {
        var news = $.map(data.reverse(), function (item) {
          item.id = uuid.v4();
          return item;
        });

        this.setState({news: news});

      }.bind(this)
    );
  },
  getFilterClasses: function (filterName) {
    var c = "filter";

    if (this.state.activeFilter === filterName) {
      c += " filter-active";
    }

    if (this.state.order === "ASC" && this.state.activeFilter === filterName) {
      c += " asc";
    }

    return c;
  },
  renderList: function () {
    var list = $.map(this.state.news, function (item, index) {
      return(
        <NewsItem key={item.id} item={item} />
      );
    });

    return (
      <div className="media-list-scrollable-tall" onScroll={this.toggleScrollActive} ref="scrollContainer">
        <ul id="top-news" className="media-list">
          {list}
        </ul>
      </div>
    );
  },
  render: function() {
    var orderByDateEvaluator = function (item) {
      return new Date(item.date)
    };

    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_news" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top News</div>
        </div>
        <div className="main">
          <div className="filters media-list-filters">
            <div className={this.getFilterClasses('date')} onClick={this.orderBy.bind(this, 'date', orderByDateEvaluator)}>Most Recent <span className="caret"></span></div>
            <div className={this.getFilterClasses('latest_shares.total_shares')} onClick={this.orderBy.bind(this, 'latest_shares.total_shares')}>Most Shared <span className="caret"></span></div>
            <div className={this.getFilterClasses('shares_since_last')} onClick={this.orderBy.bind(this, 'shares_since_last')}>Most Viral <span className="caret"></span></div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
