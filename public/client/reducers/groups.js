import { List, Map, Record } from 'immutable';
import camelCase from 'camel-case';
import _ from "lodash";

const Group = Record({
    id: 0,
    title: "Admin Group",
    description: "Test Group 1",
    is_active: false,
});

const initialState =  {groups: []};

const ACTIONS_MAP = {
  addGroup(state, payload){
    const { group } = payload;

    return state.update('groupList', groupList => {
      return groupList.push(Group({ index: group.id, ...group }));
    })
  },

  deleteGroup(state, payload) {
    return state.update('groupList', groupList => {
      return groupList.filter(group => group.get('id') !== payload.id);
    });
  },

  editGroup(state, payload) {
    const {id, label } = payload;
    
    return state.update('groupList', groupList => {
      return groupList.map(group => {
        return (group.get('id') === id)
          ? group.set('label', label)
          : group;
      });
    });
  },

  fetchAllGroups(state, payload){
    const  groups  = payload.groups;
     console.log(state);
     console.log(JSON.stringify(groups));

    return Object.assign({}, state, {groups:[...state.groups, ...groups]})
    
  },
  




  test(state, payload){
    const  group  = payload.groups;
     console.log(state.groups);

    return Object.assign({}, state, state.groups.concat( group))
    
  }
};


export function groups(state = initialState, action) {
  
  const {type, payload} = action;
  //console.log(action);
  const reducer = ACTIONS_MAP[camelCase(type)];


  /**
   * If the action corresponds to a handler in ACTIONS_MAP, return a reduction
   * of the state. If no corresponding action is found, simply pass the state
   * through.
   */
  
  return (reducer) ? reducer(state, payload) : state;

}


