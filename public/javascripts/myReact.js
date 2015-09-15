/**
 * Created by ASUA on 2015/9/13.
 */
var myData = [
    {
        "pub_id":1022,
        "title":"On Counting and Approximation.",
        "pub_year":"1989",
        "journal":"Acta Inf.",
        "url":"db/journals/acta/acta26.html#KoblerST89",
        "pages":"363-379",
        "volume":"26",
        "pub_number":"4",
        "ee":"http://dx.doi.org/10.1007/BF00276023",
        "note":null
    },
    {
        "pub_id":1022,
        "title":"On Counting and Approximation.",
        "pub_year":"1989",
        "journal":"Acta Inf.",
        "url":"db/journals/acta/acta26.html#KoblerST89",
        "pages":"363-379",
        "volume":"26",
        "pub_number":"4",
        "ee":"http://dx.doi.org/10.1007/BF00276023",
        "note":null
    }
];

var QueryData = React.createClass({
    render: function () {
        return (
                <span>{this.props.data}</span>
        );
    }
});

var QueryDataList = React.createClass({
    render: function () {
        var QueryNodes = this.props.data.map(function(query) {
            return (
                <tr><td>
                    <QueryData data={query} />
                </td></tr>
            );
        });
        return (
            <tbody>
                {QueryNodes}
            </tbody>
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
                this.props.onQueryResult(data);
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
        return {data: []};
    },
    onQueryResult: function(data) {
        this.setState({
            data: data
        });
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
            <div>
                <QueryForm onQueryResult={this.onQueryResult} />
                <table>
                    <tr>
                        <th>
                             dddd
                        </th>
                    </tr>
                    <QueryDataList data={this.state.data}/>
                </table>
            </div>
        );
    }
});
React.render(
    <QueryResult />,
    document.getElementById('content')
);