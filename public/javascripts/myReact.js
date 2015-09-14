/**
 * Created by ASUA on 2015/9/13.
 */
var myData = "666666";
var QueryData = React.createClass({
    render: function () {
        return (
            <tbody>
                <tr><td>{this.props.data}</td></tr>
            </tbody>
        );
    }
});
var QueryResult = React.createClass({
    render: function () {

        return (
            <table>
                <tr>
                    <th>
                       dddd
                    </th>
                </tr>
                <QueryData data={myData}/>
            </table>
        );
    }
});
React.render(
    <QueryResult />,
    document.getElementById('content')
);