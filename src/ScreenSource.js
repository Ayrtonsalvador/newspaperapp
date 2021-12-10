import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState(props.selectedLanguage)

  useEffect(() => {

    const APIResultsLoading = async() => {

      var langue = 'fr'
      var country = 'fr'
      if(selectedLanguage == 'en'){
        var langue = 'en'
        var country = 'us'
      }

      const data = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=${API_KEY}`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()

  }, [selectedLanguage]);


  return (
    <div>
        <Nav/>
       
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
          <img style={{width:'30px', margin:'10px',cursor:'pointer'}} src='/images/fr.png' onClick={() => setSelectedLanguage('fr')} />
          <img style={{width:'30px', margin:'10px',cursor:'pointer'}} src='/images/uk.png' onClick={() => setSelectedLanguage('en')} /> 
        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png` }/>}
                        title={<Link to={`/screenarticlesbysource/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {selectedLanguage: state.selectedLanguage}
}

function mapDispatchToProps(dispatch){
  return {
    changeLanguage: function(selectedLanguage){
      dispatch( {type: 'changeLanguage', selectedLanguage: selectedLanguage} )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenSource);
