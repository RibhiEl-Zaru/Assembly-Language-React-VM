const React = require('react');

const Column = React.createClass({

    propTypes: {
        paras: React.PropTypes.array.isRequired
    },

    paras: function () {
        return this.props.paras
            .map(function (para, i) {
                return (
                    <p key={para.key + '-' + i}>
                        {para.props.children}
                    </p>
                );
            });
    },

    render: function () {
        return (
            <span>
                {this.paras()}
            </span>
        );
    }
});

module.exports = Column;