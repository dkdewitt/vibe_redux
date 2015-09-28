import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import  {GroupActions} from '../actions';
import { bindActionCreators } from 'redux';


@connect(state => ({
    groups: state.groups
}))
export default class GroupContainer extends Component {


  componentDidMount() {
    const { dispatch, GroupActions } = this.props;
 
  }

    render() {
        const { counter, dispatch } = this.props;
        return (

            <Groups groups={this.props.groups.groups}
                     {...bindActionCreators(GroupActions, dispatch)} />
        );
    }
}


class Groups extends Component {
    static PropTypes = {
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        counter: PropTypes.number.isRequired
    };

    componentDidMount(){
         this.props.fetchAllGroups();
         console.log(this.props);
    }

    getGroups(){
        this.props.fetchAllGroups();
    }

    addGroup(group){
        console.log(this);
        
    }

    render() {

        const { increment, decrement, counter } = this.props;
        
        let groups = _.map(this.props.groups, (group) => {
            return <Group title={group.title} />
        })

        return (
            <div>
            <div className="row">
                {groups}
                </div>
                <div className="row">
                <AddGroupForm addGroup={ this.addGroup} />
                
                </div>
            </div>
        );
    }
}

class Group extends Component {


    render(){
        return(
            <div className="large-6 columns">
                {this.props.title}
            </div>

        )
    }
}


class AddGroupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {title: "", description: ""};
        
        
    }


    onChange(event){
        //console.log(event.target.name);
        let group = this.state;
        group[event.target.name] = event.target.value;
        //console.log(this.state);
        this.setState(group);
    }

    addGroup(){
        console.log(this);
        this.props.addGroup(this.state);
    }

    render(){
        return(
        <div className="large-12 columns">
            <form>
                <div className="row">
                    <div className="large-6 columns">
                        <label>Title
                            <input type="text" name="title" onChange={this.onChange.bind(this)}  />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="large-6 columns">
                        <label>Description
                            <input type="text" name="description" onChange={this.onChange.bind(this)}  />
                        </label>
                    </div>
                </div>
                <a onClick={this.addGroup} >Add </a>
            </form>
        </div>

        )
    }
}






//export default GroupContainer;
