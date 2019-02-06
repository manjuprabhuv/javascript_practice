const createStore = (reducer)=>{

  let state;
  let listeners =[];
  
  
  const getState =()=>{
  
    return state
  }
  
  const setState =(s)=>{
    state = s;
    listeners.forEach((listener)=>{
      listener(state);
    })
  }
  
  const subscribe = (listner)=>{
  
    listeners.push(listner);
  
    return(()=>{
      listeners.filter((l)=>l!==listner)
    })
  
  }
  const dispatch = (action)=>{
    console.log("in dispatch",action);
      state= reducer(state,action); 
   listeners.forEach((listener)=>{
      listener(state);
   })
  }
  
  return{
    dispatch,
    setState,
    subscribe
  }
  }
  
  const ADD_TODO = 'ADD_TODO'
  const REMOVE_TODO = 'REMOVE_TODO'
  const TOGGLE_TODO = 'TOGGLE_TODO'
  const ADD_GOAL = 'ADD_GOAL'
  const REMOVE_GOAL = 'REMOVE_GOAL'
  
  const todoReducer = (state=[],action)=>{
  console.log(action)
  switch(action.type){
    case ADD_TODO : 
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo)=>action.id!==todo.id);
    case TOGGLE_TODO:
      console.log("state>>>",state)
      return state.map((todo)=>{
        todo.id!==action.id?todo :Object.assign({}, todo, { complete: !todo.complete })
      });
    default:
      return state;
  }
  
  }
  
  const goalReducer = (state=[],action)=>{
  
  switch(action.type){
    case ADD_GOAL : 
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal)=>action.id!==todo.id);
    default:
      return state;
  }
  
  }
  
  const reducer =(state={},action)=>{
  console.log("root reducer ",action);
  return{
   todos: todoReducer(state.todos,action),
   goals: goalReducer(state.goals,action)
  }
  }
  
  
  
  let store = createStore(reducer);
  let unsubscribe = store.subscribe((state)=>console.log("The new state is =>",state));
  
  store.dispatch({type:ADD_TODO,todo:{id:1,name:"learn  React",complete:false}});
  