const createStore = (reducer)=>{

  let state;
  let listeners =[];
  
  
  const getState =()=>{
  
    return state
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
    getState,
    subscribe
  }
  }
  