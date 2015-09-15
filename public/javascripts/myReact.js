/**
 * Created by ASUA on 2015/9/13.
 */

var QueryDataList = React.createClass({
    render: function () {
        var QueryNodes = this.props.data.map(function(query) {
            var key;
            var cols = [];
            for (key in query) {
                cols.push(
                    <td>
                        {query[key]}
                    </td>
                );
            }
            return (
                <tr>
                    {cols}
                </tr>
            );
        });
        return (
            <tbody>
                {QueryNodes}
            </tbody>
        );
    }
});

var QueryHeader = React.createClass({
    render: function () {
        var QueryNodes = this.props.header.map(function(field) {
            return (
                <th>
                    <span>{field}</span>
                </th>
            );
        });
        return (
            <tr>
                {QueryNodes}
            </tr>
        );
    }
});

var QueryForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var query = this.refs.query.getDOMNode().value.trim();
        if (!query) {
            return;
        }
        $.ajax({
            url: "/query",
            method: "POST",
            dataType: 'json',
            data: {query: query},
            success: function(data) {
                if (data.length == 0)
                    return;
                var key,
                    header = [];
                for (key in data[0]) {
                    header.push(key);
                }
                this.props.onQueryResult(data, header);
                this.refs.query.getDOMNode().value = '';
            }.bind(this)
        });
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your Query" ref="query" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var QueryResult = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            header: []
        };
    },
    onQueryResult: function(data, header) {
        this.setState({
            data: data,
            header: header
        });
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <div>
                <QueryForm onQueryResult={this.onQueryResult} />
                <table class="table">
                    <QueryHeader header={this.state.header} />
                    <QueryDataList data={this.state.data} />
                </table>
            </div>
        );
    }
});
React.render(
    <QueryResult />,
    document.getElementById('content')
);