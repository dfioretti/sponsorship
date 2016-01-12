var Sidebar = React.createClass({
  showTooltip: function() {
    $('#sidebar-tooltip').show();
  },
  hideTooltip: function() {
    $('#sidebar-tooltip').hide();
  },
  renderToggles: function() {
    var toggles;
    switch (this.props.dashboardType) {
      case 'ews':
        toggles = ModuleToggles;
        break;
      case 'fifa':
        toggles = FifaModuleToggles;
        break;
    }
    var toggles = $.map(toggles, function(name){
      var cn = "icon " + name,
      title = name.replace(/_/g, ' '),
      state = this.props.dashboardState,
      toggleValue;

      if (state[name])
        toggleValue = state[name]["toggle"];

      return (
        <li key={name}>
          <Toggle toggleValue={toggleValue} module={name} handleToggle={this.props.handleToggle}/>
          <div className={cn}>{title}</div>
        </li>
      );
    }.bind(this));
    return (
      <ul className="toggle-list">
        {toggles}
      </ul>
    );
  },
  render: function() {
    var company = CompaniesStore.getState().current;
    var ratio = company.risk/1;
    var color = riskColor(ratio);
    var barStyle = {backgroundColor: color, width: 80 * ratio}
    var left = 113 + ratio * 80;
    var tooltipStyle = {left: left, backgroundColor: color}
    var arrowStyle = {borderTop: "20px solid " + color}
    var toggles;

    if (!this.props.minimal) {
      toggles = (
        <div>
          <div className="module-toggle-container">
            {this.renderToggles()}
          </div>
          <div className="print-report">
            <ul>
              <li>
                <div className="gear"></div>
                <div className="icon print-report">Print Report</div>
              </li>
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="sidebar">
        <div className="top light" onMouseLeave={this.hideTooltip}>
          <div className="top-title">Risk Overview</div>
          <div className="bkg-bar" onMouseOver={this.showTooltip}>
            <div className="fill-bar" style={barStyle}></div>
            <div id="sidebar-tooltip" className="custom-tooltip" style={tooltipStyle}>
              {riskLabel(company.risk)}
              <div className="custom-tooltip-arrow" style={arrowStyle}></div>
            </div>
          </div>
        </div>
        <div className="top" onMouseLeave={this.hideTooltip}>
          <div className="top-title">Social Media</div>
          <div className="bkg-bar" onMouseOver={this.showTooltip}>
            <div className="fill-bar" style={barStyle}></div>
            <div id="sidebar-tooltip" className="custom-tooltip" style={tooltipStyle}>
              2.7
              <div className="custom-tooltip-arrow" style={arrowStyle}></div>
            </div>
          </div>
        </div>
        {toggles}
      </div>
    );
  }
});