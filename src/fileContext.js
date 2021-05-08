
import React, { Component, createContext } from 'react';

export const FileContext = createContext();

class FileContextProvider extends Component {
  state = {
    pathe:{},
    move:false,
    togle:true
  }
  setPath=(pathe)=>{this.setState({pathe});}
  setMove=(move)=>{this.setState({move})}
  alterTogle=()=>{this.setState({togle:!this.state.togle})}
  render() { 
    return (
      <FileContext.Provider value={{...this.state,setPath:this.setPath,setMove:this.setMove,alterTogle:this.alterTogle}}>
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
 
export default FileContextProvider;