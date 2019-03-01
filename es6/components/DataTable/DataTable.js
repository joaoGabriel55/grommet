function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { buildState } from './buildState';
import { StyledDataTable } from './StyledDataTable';

var DataTable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DataTable, _Component);

  function DataTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onFiltering", function (property) {
      _this.setState({
        filtering: property
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFilter", function (property, value) {
      /* eslint-disable-next-line react/prop-types */
      var onSearch = _this.props.onSearch;
      var filters = _this.state.filters;

      var nextFilters = _extends({}, filters);

      nextFilters[property] = value;

      _this.setState({
        filters: nextFilters
      }); // Let caller know about search, if interested


      if (onSearch) {
        onSearch(nextFilters);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (property) {
      return function () {
        var sort = _this.state.sort;
        var ascending = sort && property === sort.property ? !sort.ascending : true;

        _this.setState({
          sort: {
            property: property,
            ascending: ascending
          }
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleGroup", function (groupValue) {
      return function () {
        var groupState = _this.state.groupState;

        var nextGroupState = _extends({}, groupState);

        nextGroupState[groupValue] = _extends({}, nextGroupState[groupValue], {
          expanded: !nextGroupState[groupValue].expanded
        });

        _this.setState({
          groupState: nextGroupState
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleGroups", function () {
      var groupState = _this.state.groupState;
      var expanded = Object.keys(groupState).filter(function (k) {
        return !groupState[k].expanded;
      }).length === 0;
      var nextGroupState = {};
      Object.keys(groupState).forEach(function (k) {
        nextGroupState[k] = _extends({}, groupState[k], {
          expanded: !expanded
        });
      });

      _this.setState({
        groupState: nextGroupState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (property) {
      return function (width) {
        var widths = _this.state.widths;

        var nextWidths = _extends({}, widths || {});

        nextWidths[property] = width;

        _this.setState({
          widths: nextWidths
        });
      };
    });

    return _this;
  }

  DataTable.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    return buildState(nextProps, prevState);
  };

  var _proto = DataTable.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        columns = _this$props.columns,
        propsData = _this$props.data,
        groupBy = _this$props.groupBy,
        onMore = _this$props.onMore,
        resizeable = _this$props.resizeable,
        size = _this$props.size,
        sortable = _this$props.sortable,
        onSearch = _this$props.onSearch,
        rest = _objectWithoutPropertiesLoose(_this$props, ["columns", "data", "groupBy", "onMore", "resizeable", "size", "sortable", "onSearch"]);

    var _this$state = this.state,
        data = _this$state.data,
        filtering = _this$state.filtering,
        filters = _this$state.filters,
        footerValues = _this$state.footerValues,
        groups = _this$state.groups,
        groupState = _this$state.groupState,
        primaryProperty = _this$state.primaryProperty,
        showFooter = _this$state.showFooter,
        sort = _this$state.sort,
        widths = _this$state.widths;

    if (size && resizeable) {
      console.warn('DataTable cannot combine "size" and "resizeble".');
    }

    return React.createElement(StyledDataTable, rest, React.createElement(Header, {
      columns: columns,
      filtering: filtering,
      filters: filters,
      groups: groups,
      groupState: groupState,
      size: size,
      sort: sort,
      widths: widths,
      onFiltering: this.onFiltering,
      onFilter: this.onFilter,
      onResize: resizeable ? this.onResize : undefined,
      onSort: sortable ? this.onSort : undefined,
      onToggle: this.onToggleGroups
    }), groups ? React.createElement(GroupedBody, {
      columns: columns,
      groupBy: groupBy,
      groups: groups,
      groupState: groupState,
      primaryProperty: primaryProperty,
      onToggle: this.onToggleGroup
    }) : React.createElement(Body, {
      columns: columns,
      data: data,
      onMore: onMore,
      primaryProperty: primaryProperty,
      size: size
    }), showFooter && React.createElement(Footer, {
      columns: columns,
      footerValues: footerValues,
      groups: groups,
      primaryProperty: primaryProperty,
      size: size
    }));
  };

  return DataTable;
}(Component);

_defineProperty(DataTable, "defaultProps", {
  columns: [],
  data: []
});

var DataTableDoc;

if (process.env.NODE_ENV !== 'production') {
  DataTableDoc = require('./doc').doc(DataTable); // eslint-disable-line global-require
}

var DataTableWrapper = DataTableDoc || DataTable;
export { DataTableWrapper as DataTable };