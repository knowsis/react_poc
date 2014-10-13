/** @jsx React.DOM */
var actions = Reflux.createActions(['update']);

setInterval(actions.update, 5000);

var commentStore = Reflux.createStore({
    init: function() {
        this.listenToMany(actions);
    },
    update: function(){
        $.ajax({
          url: '/data/',
          dataType: 'json',
          success: function(data) {
            this.trigger(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props, status, err.toString());
          }.bind(this)
        });
    },
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {commentData: []};
  },
  onUpdate: function(data) {
    this.setState({
        commentData: data
    });
  },
  componentDidMount: function() {
      this.unsubscribe = commentStore.listen(this.onUpdate);
      actions.update();
  },
  componentWillUnmount: function() {
      this.unsubscribe();
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.commentData} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment key={comment.id} author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

React.renderComponent(
  <CommentBox commentData={comment_data} />,
  document.getElementById('content')
);