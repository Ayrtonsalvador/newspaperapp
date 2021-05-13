import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenArticlesBySource() {

  const [articleList, setArticleList] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [visible, setVisible] = useState(false)

  var { id } = useParams();

  useEffect(() => {
    
    const findArticles = async() => {
      const data = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=4c51d9f314cb4c3f8eba5f00fdb0e96f`)
      const body = await data.json()
      console.log(body)
      setArticleList(body.articles)
    }

    findArticles()

  }, []);

  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
        {  articleList.map((article,i) => (
              <div  style={{display:'flex',justifyContent:'center'}}>

                <Card
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)}/>,
                      <Icon type="like" key="ellipsis"/>
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>

                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>

              </div>


              ))   }

           </div> 

         
      
      </div>
  );
}

export default ScreenArticlesBySource;
