import { useReducer } from "react";


const reducer = (state, action) => {
    if (action.type === 'ALL-CLEAR'){
      return {...state, previousOperand:'', currentOperand:'', operator:'', isOverWrite:false};
    }
    if(action.type === 'ADD-DIGIT'){
      if(state.isOverWrite){
        return {...state, previousOperand:'', currentOperand: action.payload, isOverWrite: false};
      }
      if(state.currentOperand === '0' && action.payload === '0'){
        return {...state, currentOperand:'0'};
      }
      if(state.currentOperand.includes('.') && action.payload === '.'){
        return state;
      }
      return {...state, currentOperand:`${state.currentOperand}${action.payload}`};
    }
    if(action.type === 'DELETE'){
      if(state.isOverWrite){
        return {...state, previousOperand:'', currentOperand:'', operator:'', isOverWrite:false};
      }
      return {...state, currentOperand:state.currentOperand.slice(0, -1)};
    }
    if(action.type === 'OPERATOR'){
      if(state.operator){
        if(state.previousOperand === '' || state.currentOperand === ''){
          return state;
        }
        return {...state, previousOperand:evaluate(state), currentOperand:'', operator:action.payload};
      }
      return {...state, previousOperand:state.currentOperand, currentOperand:'', operator:action.payload, isOverWrite: false};
    }
    if(action.type === 'EQUAL'){
      if(state.currentOperand === '' || state.previousOperand === ''){
        return state
      }
      return {...state, currentOperand:evaluate(state), previousOperand:'', operator:'', isOverWrite:true};
    }

};

const defaultState = {
  previousOperand:'',
  currentOperand:'',
  operator:'',
  isOverWrite:false
};

const evaluate = ({currentOperand, previousOperand, operator}) => {
  const a = parseFloat(previousOperand);
  const b = parseFloat(currentOperand);
  switch(operator){
    case '+':
      return ((a+b).toString());
    case '-':
      return ((a-b).toString());
    case '*':
      return ((a*b).toString());
    case '÷':
      return ((a/b).toString());
    default:
      return;
  }
}


function App() {

  

  const SingleButton = ({value, className, action}) => {
    return(
      <button className={className} onClick={()=> dispatch({type:action, payload:value})}>{value}</button>
    );
  };

  const [state,dispatch] = useReducer(reducer, defaultState);

  return (
    <>
    <h1 className="heading">Calculator</h1>
    <div className="container">
    <div className="grid">
      <div className="display">
        <div className="previousOperand">{state.previousOperand}{state.operator}</div>
        <div className="currentOperand">{state.currentOperand}</div>
      </div>
        <SingleButton value='AC' className='allclear' action='ALL-CLEAR'/>
        <SingleButton value='DEL' className='delete' action='DELETE'/>
        <SingleButton value='÷' className='operator' action='OPERATOR'/>
        <SingleButton value='1' action='ADD-DIGIT'/>
        <SingleButton value='2' action='ADD-DIGIT'/>
        <SingleButton value='3' action='ADD-DIGIT'/>
        <SingleButton value='*' className='operator' action='OPERATOR'/>
        <SingleButton value='4' action='ADD-DIGIT'/>
        <SingleButton value='5' action='ADD-DIGIT'/>
        <SingleButton value='6' action='ADD-DIGIT'/>
        <SingleButton value='+' className='operator' action='OPERATOR'/>
        <SingleButton value='7' action='ADD-DIGIT'/>
        <SingleButton value='8' action='ADD-DIGIT'/>
        <SingleButton value='9' action='ADD-DIGIT'/>
        <SingleButton value='-' className='operator' action='OPERATOR'/>
        <SingleButton value='.' className='point' action='ADD-DIGIT'/>
        <SingleButton value='0' action='ADD-DIGIT'/>
        <SingleButton value='=' className='equals' action='EQUAL'/>
    </div>
    </div>
    </>
  );
};

export default App;
