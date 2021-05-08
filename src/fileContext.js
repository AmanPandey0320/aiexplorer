import React, { Component, createContext } from 'react';

export const FileContext = createContext();

class FileContextProvider extends Component {
  state = {
    pathe:"",
    togle:true
  }
  setPath=(pathe)=>{this.setState({pathe});}
  render() { 
    return (
      <FileContext.Provider value={{...this.state,setPath:this.setPath}}>
        {this.props.children}
      </FileContext.Provider>
    );
  }
}
 
export default FileContextProvider;