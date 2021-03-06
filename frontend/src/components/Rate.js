import React from "react";
import { List, Icon, Button } from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';

const env = process.env.NODE_ENV || "development";
const serverUrl =
    env === "development"
        ? "http://127.0.0.1:8000"
        : "https://omatko-app-backend.herokuapp.com";


const Rates = props => {

const handleDelete = (id, event) => {
    const voteID = id;
    axios.defaults.headers = {
     "Content-Type": "application/json",
     Authorization: `Token ${localStorage.getItem('token')}`
   };
   console.log(env)
    axios.delete(`${serverUrl}/apiVote/${voteID}/delete/`)
    .then(res => {
      if (res.status === 204) {
        window.location.reload(false);
      }
    })
  };

const username = localStorage.getItem('username');

const filterData = () => {
    if(props.votes){
      var filtered = props.votes.filter(vote => vote.userName === username);
      return filtered;
    }
    return [];
  }

  const getEventName = (lecture) => {
    if(props.events){
      var filtered = props.events.filter(event => event.lecture_code === lecture);
      return filtered[0].title;
    }
    return lecture;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }}
      dataSource={filterData()}
      renderItem={item => (
        <List.Item>
        <List.Item.Meta
          avatar={
            <div>
            <Button><Link to={`/rate/${item.id}`}><Icon type="edit" style={{ color: 'rgba(0,0,0,F)' }} /></Link></Button>
            <Button type='danger' onClick={handleDelete.bind(this, item.id)}><Icon type="delete" style={{ color: 'rgba(0,0,0,F)' }} /></Button>
            </div>
          }
          title={<a href={`/rate/${item.id}`}><p>{getEventName(item.lecture)}</p></a>}
          description={<ul><li>Ocena merytoryczna: {item.content_vote}</li>
                        <li>Ocena sposoby prezentacji: {item.presentation_vote}</li></ul>}
        />

      </List.Item>
      )}
    />
  );
};



export default Rates;
