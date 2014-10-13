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

var CommentBox = React.createClass({displayName: 'CommentBox',
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
      React.DOM.div({className: "commentBox"}, 
        React.DOM.h1(null, "Comments"), 
        CommentList({data: this.state.commentData})
      )
    );
  }
});

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        Comment({key: comment.id, author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.DOM.div({className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    return (
      React.DOM.div({className: "comment"}, 
        React.DOM.h2({className: "commentAuthor"}, 
          this.props.author
        ), 
        this.props.children
      )
    );
  }
});

React.renderComponent(
  CommentBox({commentData: comment_data}),
  document.getElementById('content')
);