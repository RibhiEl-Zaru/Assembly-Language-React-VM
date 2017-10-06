const React = require('react'),
    _ = require('lodash');

const Column = require('./column');

const Columns = React.createClass({

    propTypes: {
        columns: React.PropTypes.number.isRequired,
        columnSize: React.PropTypes.string,
        style: React.PropTypes.object
    },

    columnClass: function () {
        const colSize = this.props.columnSize || 'md';
        return 'col-' + colSize + '-' + (12 / this.props.columns);
    },

    render: function () {

        const className = this.columnClass(),
            colStyle = this.props.style || {},
            children = this.props.children || [],
            chunkSize = Math.ceil(children.length / this.props.columns);

        const columns = _.chunk(children, chunkSize);

        return (
            <div className="row">
            {columns.map(function (column, i) {
                return (
                    <div key={column.key + '-col-' + i}
                className={className}
                style={colStyle}>
                    <Column paras={column}/>
                    </div>
                );
            })}
        </div>
        );
    }
});

module.exports = Columns;