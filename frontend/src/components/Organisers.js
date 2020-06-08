import React from "react";
import { List, Typography, Card } from "antd";

const { Meta } = Card;
const { Title, Paragraph, Avatar } = Typography;

const Organisers = props => {
  return (
    <Typography>
      <Title>Nad konferencją czuwają...</Title>
      <Paragraph>...dzielni organizatorzy:</Paragraph>
    <List
      dataSource={props.data}
      renderItem={item => (
        <Card
          key={item.surname}
        >
          <Meta
            title={<a href={`/organisers/${item.id}`}> {item.surname + " " + item.first_name} </a>}
            avatar={<Avatar src={item.image} />}
            description={item.email}
          />
          {item.content}
        </Card>
      )}
    />
    </Typography>
  );
};

export default Organisers;
